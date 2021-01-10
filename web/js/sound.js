document.addEventListener("DOMContentLoaded", initSound)

let context, sourceBufferNode, playBackBufferNode, playBackGainNode

function initSound() {
    context = new AudioContext()
    playBackGainNode = context.createGain()
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

function playBackTrack(playBack, soundName) {
    if (!playBack) {
        fetch("/web/soundfiles/BackTrack" + soundName + ".mp3")
            // Antwort in Array parsen
            .then((response) => response.arrayBuffer())
            // Array in Buffer Wandeln
            .then((undecodedAudio) => context.decodeAudioData(undecodedAudio))
            // Buffer in SourceBufferNode wandeln und abspielen
            .then((audioBuffer) => {
                playBackBufferNode = context.createBufferSource()
                playBackBufferNode.buffer = audioBuffer
                playBackBufferNode.connect(playBackGainNode)
                playBackGainNode.connect(context.destination)
                playBackBufferNode.start(context.currentTime)
            })
    } else {
        playBackBufferNode.stop()
    }
}

function updateBackTrackVol(e) {
    let gain = e.target.value / 100
    playBackGainNode.gain.value = gain
}
