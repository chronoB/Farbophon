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

    midi.outputs.forEach(function (device) {
        if (device.name == sessionStorage.getItem("MidiDevice")) {
            const MIDI_OUT = device
        }
    })
}

function errorHandler(error) {
    console.log("Es gab einen Fehler. Nachfolgend mehr dazu:")
    console.log(error)
}
