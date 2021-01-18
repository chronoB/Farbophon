# Farbophon

Gamingproject as part of the module "Audio-Video-Programmierung".
Based on the game Guitar Hero notes should be played to the beat of the music. The notes will be triggered by holding colored items into the camera.

With the help of python/opencv the cameracapture is analyzed. If a color is detected, a midi-note is sent to the js server. The js server is checking if the note and the timing is correct.

## Installation

-   Clone the repository.
-   create virtual environment(recommended)

    ```bash
    #unix
    python3 -m venv venv
    source ./venv/bin/activate
    #windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

-   Install python dependencies
    ```bash
    pip3 install -r requirements.txt
    ```
-   Install Live Server Extension for VS Code (or use any other Server for the js code)
-   Copy and rename the config.SAMPLE
    ```bash
    cp config.SAMPLE config
    ```
-   edit the config file parameters "API-Key" and "SERVER-URI" with the parameters used for the Farbophon Server (different repository/private). These are necessary if you want to compete against others
-   also edit the MIDI-Device and camera device to fit your needs. The midi device will be picked up by both of the scripts (python/JS)
-   If you experience bad detection of colors while playing, you can try and tweak your threshold
-   start the python script
    ```bash
    python3 python/farbophon.py
    ```
-   start the js server
-   open 127.0.0.1:5500 on Chrome
