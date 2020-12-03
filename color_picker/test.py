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


cap = cv2.VideoCapture(config["CamDevice"])

midiOut = midi.MidiOut()
midiOutput = mido.open_output(config["MidiDevice"])

# define range of blue color in HSV
lower_blue = np.array([110, 50, 50])
upper_blue = np.array([130, 255, 255])
# define range of green color in HSV
lower_green = np.array([60, 50, 50])
upper_green = np.array([80, 255, 255])
# define range of red color in HSV
lower_red = np.array([160, 100, 100])
upper_red = np.array([200, 255, 255])
# define range of yellow color in HSV
lower_yellow = np.array([20, 100, 100])
upper_yellow = np.array([40, 255, 255])
# define range of turquoise color in HSV
lower_turquoise = np.array([80, 100, 100])
upper_turquoise = np.array([100, 255, 255])
# define range of purple color in HSV
lower_purple = np.array([140, 100, 100])
upper_purple = np.array([160, 255, 255])

count = 0
cv2.namedWindow("all", 0)

threshold = 2000000


# MIDI Note spielen Funktion


def playNote(note):
    # Nehme CenterPosX vom Gesicht und
    # normiere auf 1, dann auf bereich 0-127 erweitern
    message = mido.Message("note_on", note=note, velocity=127)
    midiOutput.send(message)  # MIDI Senden


while cap.isOpened():
    ret, frame = cap.read()

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Threshold the HSV image to get only blue colors
    mask_blue = cv2.inRange(hsv, lower_blue, upper_blue)
    # Threshold the HSV image to get only gree colors
    mask_green = cv2.inRange(hsv, lower_green, upper_green)
    # Threshold the HSV image to get only red colors
    mask_red = cv2.inRange(hsv, lower_red, upper_red)
    # Threshold the HSV image to get only blue colors
    mask_yellow = cv2.inRange(hsv, lower_yellow, upper_yellow)
    # Threshold the HSV image to get only gree colors
    mask_turquoise = cv2.inRange(hsv, lower_turquoise, upper_turquoise)
    # Threshold the HSV image to get only red colors
    mask_purple = cv2.inRange(hsv, lower_purple, upper_purple)

    masks = [
        mask_blue, mask_green, mask_red,
        mask_yellow, mask_purple, mask_turquoise,
    ]

    numBlue = mask_blue.sum()
    numGreen = mask_green.sum()
    numRed = mask_red.sum()
    numYellow = mask_yellow.sum()
    numTurquoise = mask_turquoise.sum()
    numPurple = mask_purple.sum()

    if count == 100:
        print("-----------------")
        print("Blue: {}".format(numBlue))
        print("Green: {}".format(numGreen))
        print("Red: {}".format(numRed))
        print("Yellow: {}".format(numYellow))
        print("Purple: {}".format(numPurple))
        print("turquoise: {}".format(numTurquoise))
        print("-----------------")
        count = 0

    numArray = [numBlue, numGreen, numRed, numYellow, numPurple, numTurquoise]
    numMax = np.max(numArray)
    if numMax > threshold:
        for i in range(len(numArray)):
            if numArray[i] == numMax:
                frame = cv2.bitwise_and(frame, frame, mask=masks[i])
                playNote(i)

    else:
        playNote(6)

    count += 1
    cv2.imshow("all", frame)

    if cv2.waitKey(25) != -1:
        break

cap.release()
cv2.destroyAllWindows()
