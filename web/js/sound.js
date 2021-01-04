let context = new AudioContext()
let bpm = 100

function playNoteperBPM() {
    playSound(soundname)
    window.setTimeout(playNoteperBPM, (1000 / bpm) * 60)
}

function playSound(note) {
    strNote = String(note)
    if (strNote.includes("7") || strNote === "") {
        return
    }

    fetch("/web/soundfiles/" + strNote + ".wav")
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
