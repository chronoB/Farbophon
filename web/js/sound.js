let context = new AudioContext()
let bpm = 100
playNoteperBPM()

function playNoteperBPM() {
    playDrum()
    window.setTimeout(playNoteperBPM, (1000 / bpm) * 60)
}

function playDrum() {
    if (soundName.includes("7") || soundName === "") {
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
