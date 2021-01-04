document.addEventListener("DOMContentLoaded", initMidiDevice)

let midiDevice

function initMidiDevice() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(connectMidiDevice, errorHandler)
    } else {
        console.log(
            "Es gibt einen Fehler beim Zugriff auf MIDI. Bist du etwa nicht in einer secure environment (https)? Versuche es bitte in Chrome"
        )
    }
}

function connectMidiDevice(midi) {
    // lese alle MIDI Inputs
    midi.inputs.forEach(function (device) {
        // wenn Name von einem Input mit dem aus der config übereinstimmt
        if (device.name.includes(sessionStorage.getItem("MidiDevice"))) {
            // eventlistener für MIDI Noten hinzufügen
            midiDevice = device
            midiDevice.addEventListener("midimessage", onMIDIMessage)
        } else {
            console.error(
                "Configured device not found in possible midi inputs:"
            )
            console.error("Name of the internal device: " + device.name)
            console.error(
                "Device in the config file: " +
                    sessionStorage.getItem("MidiDevice")
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

function onMIDIMessage(event) {
    console.log(event.data)
    onOff = event.data[0]

    if (onOff === 144) {
        // Note on
        let note = event.data[1]
        evalMidiInput(note)
        playSound(note)
    } else if (onOff === 128) {
        // Note off
        let note = event.data[1]
        //remove sound
    }
}
