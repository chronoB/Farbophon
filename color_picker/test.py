import cv2
import mido
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
        "hsv": [0, 100, 255],
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "green": {
        "hsv": [120, 100, 0],
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "blue": {
        "hsv": [240, 100, 0],
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "cyan": {
        "hsv": [196, 76, 0],
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "magenta": {
        "hsv": [300, 100, 0],
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
    "yellow": {
        "hsv": [53, 57, 0],
        "mask": 0,
        "count": 0,
        "cal": 0,
    },
}

colors = ["blue", "green", "red", "yellow", "turquoise", "purple"]
calibrateValues = {
    "blue": 0, "green": 0, "red": 0,
    "yellow": 0, "turquoise": 0, "purple": 0,
}
colorValues = {}
colorMasks = {}


def calibrateNow():
    print("ISCH KALIBRIERE JEZZ!!")
    for k, v in colorDict.items():
        colorDict[k]["cal"] = colorDict[k]["count"]


while cap.isOpened():
    ret, frame = cap.read()
    currentFrameHsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    frameH, frameS, frameV = cv2.split(currentFrameHsv)

    for key, value in colorDict.items():
        currentColor = key
        hue = value["hsv"][0]
        sat = value["hsv"][1]

        th = 10
        maskHue = cv2.inRange(frameH, hue - th, hue + th)
        maskSat = cv2.inRange(frameS, sat - th, sat + th)
        maskHueSat = maskHue ** maskSat
        colorDict[currentColor]["mask"] = maskHueSat
        colorDict[currentColor]["count"] = \
            colorDict[currentColor]["mask"].sum()

        cv2.imshow(currentColor, maskHue)

        if (
            colorDict[currentColor]["count"] -
            colorDict[currentColor]["cal"]
        ) > threshold:
            print(currentColor)

    #
    # if count == 50:
    #     print("-------------------")
    #     for c in colors:
    #         print(c, ":", colorValues[c])
    #
    #     count = 0
    #     print("-------------------")

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
