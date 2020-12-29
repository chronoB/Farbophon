let context = new AudioContext()

let soundName = ""

let bpm = 100

initMidiDevice()

function initBPM() {
    bpm = parseInt(document.querySelector("#bpm").value)
    playNoteperBPM()
}
function playNoteperBPM() {
    playDrum()
    window.setTimeout(playNoteperBPM, (1000 / bpm) * 60)
}

function onMIDIMessage(event) {
    let string = ""
    for (byte of event.data) {
        string += byte.toString(8) + " "

        // Darstellung der MIDI-Strings im Textfeld
        document.getElementById("label").innerHTML = string
        document.getElementById("midiNote").innerHTML = event.data[1]
    }
    let note = parseInt(event.data[1])
    if (note === 1) {
        document.getElementById("label").innerHTML = "red"
        soundName = "1"
    } else if (note === 2) {
        document.getElementById("label").innerHTML = "green"
        soundName = "2"
    } else if (note === 3) {
        document.getElementById("label").innerHTML = "blue"
        soundName = "3"
    } else if (note === 4) {
        document.getElementById("label").innerHTML = "cyan"
        soundName = "4"
    } else if (note === 5) {
        document.getElementById("label").innerHTML = "magenta"
        soundName = "5"
    } else if (note === 6) {
        document.getElementById("label").innerHTML = "yellow"
        soundName = "6"
    } else {
        document.getElementById("label").innerHTML = "off"
        soundName = "7"
    }

    // switch (event.data[0]) {
    // case 144:
    // 	// your function startNote(note, velocity)
    // 	startNote(event.data[1]);
    // 	document.getElementById("midiNote").innerHTML = event.data[1] + " ";               // Hier einsetzen mit innerHTML, sodass die Midi-Note angezeigt wird?
    // 	console.log(event.data[1]) + "erkannt";
    // 	break;

    // case 128:
    // 	// your function stopNote(note, velocity)
    // 	stopNote(event.data[1]);
    // 	document.getElementById("midiNote").innerHTML = " Midi Note";
    // 	console.log(event.data[1]);
    // 	//console.log(stopNote);
    // 	break;
    //
}

function playDrum() {
    if (soundName.includes("6") || soundName === "") {
        return
    }

    fetch("soundfiles/" + soundName + ".wav")
        // Antwort in Array parsen
        .then((response) => response.arrayBuffer())
        // Array in Buffer Wandeln
        .then((undecodedAudio) => context.decodeAudioData(undecodedAudio))
        // Buffer in SourceBufferNode wandeln und abspielen
        .then((audioBuffer) => {
            let sourceBufferNode = context.createBufferSource()
            sourceBufferNode.buffer = audioBuffer
            sourceBufferNode.connect(context.destination)
            sourceBufferNode.start(context.currentTime)
        })
}
