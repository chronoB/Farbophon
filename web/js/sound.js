document.addEventListener("DOMContentLoaded", initSound)

let context, sourceBufferNode

function initSound() {
    context = new AudioContext()
}

function playSound(note) {
    strNote = String(note)
    //stop current sound
    if (sourceBufferNode !== undefined)
        sourceBufferNode.stop(context.currentTime)
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
            sourceBufferNode = context.createBufferSource()
            sourceBufferNode.buffer = audioBuffer
            sourceBufferNode.connect(context.destination)
            sourceBufferNode.start(context.currentTime)
        })
}
