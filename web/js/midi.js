document.addEventListener("DOMContentLoaded", initMidiDevice)

let midi_in
let midi_out
let shouldEvalMidiInput = false

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
            midi_in = device
            midi_in.addEventListener("midimessage", onMIDIMessage)
        } else {
            //TODO: This should only be displayed if really no input is found.
            //not on every input that is not the desired input
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
        if (device.name.includes(sessionStorage.getItem("MidiDevice"))) {
            midi_out = device
        }
    })
}

function errorHandler(error) {
    console.log("Es gab einen Fehler. Nachfolgend mehr dazu:")
    console.log(error)
}

function onMIDIMessage(event) {
    if (!shouldEvalMidiInput) return

    onOff = event.data[0]

    if (onOff === 144) {
        // Note on
        let note = event.data[1]
        evalMidiInput(note)
        playSound(note)
    }
}

function sendMidi(event, key, velocity) {
    shouldEvalMidiInput = true
    midi_out.send([event, key, velocity])
}
