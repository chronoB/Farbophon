import time

import cv2
import numpy as np
import rtmidi as midi

config = {}
try:
    # bei MAC: open("config",... // WIN: open("../config",... (?)
    configFile = open("../config", "rt", encoding="utf-8")
    lines = configFile.readlines()
    for line in lines:
        line = line.strip().split("=")
        config[line[0]] = line[1]
except Exception as e:
    print(f"Fehler beim Lesen der Konfigurationsdatei.\n{e}")
    exit(1)

try:
    cap = cv2.VideoCapture(int(config["CamDevice"]))
except Exception:
    print(
        "Fehler beim Öffnen des Video-Gerätes. Ist das (",
        config["CamDevice"], ") die richtige device-number?",
    )
    exit(1)

# MIDI io initialisieren
midiOut = midi.MidiOut()
midiOutPorts = midiOut.get_ports()
midiIn = midi.MidiIn()
midiInPorts = midiIn.get_ports()

for mip in midiInPorts:
    if mip.startswith(str(config["MidiDevice"])):
        midiIn.open_port(midiInPorts.index(mip))

for mop in midiOutPorts:
    if mop.startswith(str(config["MidiDevice"])):
        midiOut.open_port(midiOutPorts.index(mop))

lastNote = 0


def playNote(note):
    global lastNote
    if lastNote != note:
        print("Note Off:", lastNote)
        midiOut.send_message([0x80, note, 0])
        print("Note On:", note)
        print("")
        midiOut.send_message([0x90, note, 127])
        time.sleep(.10)

        lastNote = note


threshold = int(config["Threshold"])
devMode = bool(int(config["DevMode"]))

if devMode:
    print("## DevMode aktiviert! ##")

count = 0
colorDict = {
    "red": {
        "hue": 0,
        "threshold": 10,
        "mask": 0,
        "count": 0,
        "cal": 0,
        "note": 1,
    },
    "green": {
        "hue": 120,
        "threshold": 20,
        "mask": 0,
        "count": 0,
        "cal": 0,
        "note": 2,
    },
    "blue": {
        "hue": 230,
        "threshold": 10,
        "mask": 0,
        "count": 0,
        "cal": 0,
        "note": 3,
    },
    "cyan": {
        "hue": 190,
        "threshold": 10,
        "mask": 0,
        "count": 0,
        "cal": 0,
        "note": 4,
    },
    "magenta": {
        "hue": 290,
        "threshold": 20,
        "mask": 0,
        "count": 0,
        "cal": 0,
        "note": 5,
    },
    "yellow": {
        "hue": 50,
        "threshold": 5,
        "mask": 0,
        "count": 0,
        "cal": 0,
        "note": 6,
    },

}


def calibrateNow():
    for k, v in colorDict.items():
        colorDict[k]["cal"] = colorDict[k]["count"]
    print("Kalibriere jetzt!")


while cap.isOpened():
    colorCountMax = 0
    colorCountWinner = ""
    ret, frame = cap.read()
    if not ret:
        print("Fehler beim Lesen der Webcam!")
        exit(1)
    currentFrameHsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    frameH, frameS, frameV = cv2.split(currentFrameHsv)

    for key, value in colorDict.items():
        currentColor = key
        hue = (value["hue"] / 360) * 180
        hueThreshold = value["threshold"]

        if (hue - hueThreshold) < 0:
            maskHue1 = cv2.inRange(frameH, 180 - abs(hue - hueThreshold), 180)
            maskHue2 = cv2.inRange(frameH, 0, hue + hueThreshold)
            maskHue = cv2.bitwise_or(maskHue1, maskHue2)
        else:
            maskHue = cv2.inRange(
                frameH, hue - hueThreshold, hue + hueThreshold,
            )

        maskSat = cv2.inRange(frameS, 100, 255)
        mask = cv2.bitwise_and(maskHue, maskSat)

        if devMode:
            cv2.imshow(currentColor, mask)

        colorDict[currentColor]["mask"] = np.int64(mask)
        colorDict[currentColor]["count"] = \
            np.int64(colorDict[currentColor]["mask"].sum())

        # wenn colorCount nach Abzug von Kalibrierung
        # größer ist als der aktuelle colorCountMax
        #
        # Es wird also immer nur der aktuell größte Farbwert
        # gespeichert und dann auch ausgegeben (winner takes all)
        if (
            colorDict[currentColor]["count"] -
            colorDict[currentColor]["cal"] > colorCountMax
        ):
            # dann neuen colorCountMax setzen
            colorCountMax = colorDict[currentColor]["count"]
            # und die aktuelle Farbe in Winner-Variable speichern
            colorCountWinner = currentColor

    # Wenn colorCount größer als threshold aus config
    if colorCountMax > threshold:
        playNote(colorDict[colorCountWinner]["note"])
        # und Farbname ausgeben
    else:
        # Keine Farbe erkannt, Note 7 senden
        playNote(7)

    if count == 50 and devMode and False:
        print("-------------------")
        for key in colorDict:
            print(
                key, "\t\t\t", colorDict[key]["count"] -
                colorDict[key]["cal"],
            )
        print("-------------------")
        count = 0

    count += 1
    cv2.imshow("Input Video", frame)

    # Midi Input in var schreiben
    midiMessage = midiIn.get_message()
    if midiMessage:
        # wenn eine Message anliegt
        if midiMessage[0][0] == 0x91:
            # note on auf Kanal 2
            calibrateNow()

    key = cv2.waitKey(10)
    if key == 27:
        break
    elif key != -1:
        calibrateNow()

cap.release()
cv2.destroyAllWindows()
