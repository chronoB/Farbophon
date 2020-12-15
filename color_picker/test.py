import cv2
import mido
import numpy as np
import rtmidi as midi

config = {}
try:
    configFile = open("config", "rt", encoding="utf-8")
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

midiOut = midi.MidiOut()
midiOutput = mido.open_output(config["MidiDevice"])

threshold = int(config["Threshold"])

count = 0
cv2.namedWindow("all", 0)


# MIDI Note spielen Funktion


def playNote(note):
    # Nehme CenterPosX vom Gesicht und
    # normiere auf 1, dann auf bereich 0-127 erweitern
    message = mido.Message("note_on", note=note, velocity=127)
    midiOutput.send(message)  # MIDI Senden


colorDict = {
    "red": {
        "hue": 0,
        "threshold": 10,
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "green": {
        "hue": 120,
        "threshold": 20,
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "blue": {
        "hue": 230,
        "threshold": 10,
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "cyan": {
        "hue": 190,
        "threshold": 10,
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "magenta": {
        "hue": 290,
        "threshold": 20,
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "yellow": {
        "hue": 50,
        "threshold": 5,
        "mask": 0,
        "count": 0,
        "cal": 0,
    },

}


def calibrateNow():
    print("ISCH KALIBRIERE JEZZ!!")
    for k, v in colorDict.items():
        colorDict[k]["cal"] = colorDict[k]["count"]
        print(colorDict[k]["cal"])


while cap.isOpened():
    ret, frame = cap.read()
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

        cv2.imshow(currentColor, mask)

        colorDict[currentColor]["mask"] = np.int64(mask)

        colorDict[currentColor]["count"] = \
            np.int64(colorDict[currentColor]["mask"].sum())

        if (
                colorDict[currentColor]["count"] -
                colorDict[currentColor]["cal"]
        ) > threshold:
            print(currentColor)

    if count == 50:
        print("-------------------")
        for key in colorDict:
            print(
                key, "\t\t\t", colorDict[key]["count"] -
                colorDict[key]["cal"],
            )
        print("-------------------")
        count = 0

    # frame = cv2.bitwise_and(frame, frame, mask=v["mask"])
    # numMax = np.max(numArray)
    # if numMax > threshold:
    #     for i in range(len(numArray)):
    #         if numArray[i] == numMax:
    #             frame = cv2.bitwise_and(frame, frame, mask=masks[i])
    #             #playNote(i)
    #
    # else:
    #     playNote(6)

    count += 1
    cv2.imshow("all", frame)

    key = cv2.waitKey(25)
    if key == 27:
        break
    elif key != -1:
        calibrateNow()

cap.release()
cv2.destroyAllWindows()
