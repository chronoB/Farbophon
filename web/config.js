function getConfiguration() {
    let identifierIndex = 0
    let valueIndex = 1

    fetch("/config")
        .then((response) => response.text())
        .then((data) => {
            //split every line into a new object.
            //every line of the config file is a new config object
            let lines = data.split("\r\n")
            lines.forEach((line) => {
                //split the configuration in two parts
                //identifier=value
                let parts = line.split("=")

                //save the configuration in the sessionStorage
                sessionStorage.setItem(
                    parts[identifierIndex],
                    parts[valueIndex]
                )
            })

            const DEV_MODE = parseInt(sessionStorage.getItem("DevMode"))
        })
}

function initMidiDevice() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(connectMidiDevice, errorHandler)
    } else {
        console.log(
            "Es gibt einen Fehler beim Zugriff auf MIDI. Bist du etwa nicht in einer secure environment (https)?"
        )
    }
}

function connectMidiDevice(midi) {
    // lese alle MIDI Inputs
    midi.inputs.forEach(function (device) {
        // wenn Name von einem Input mit dem aus der config übereinstimmt
        if (device.name == sessionStorage.getItem("MidiDevice")) {
            console.log(device.name, "wird geöffnet..")
            // eventlistener für MIDI Noten hinzufügen
            device.addEventListener("midimessage", onMIDIMessage)
            console.log(
                device.name,
                "EventListener *onMidiMessage* angebamselt"
            )
        }
    })
}

function errorHandler(error) {
    console.log("Es gab einen Fehler. Nachfolgend mehr dazu:")
    console.log(error)
}
