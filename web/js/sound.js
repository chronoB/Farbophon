let context = new AudioContext()
let bpm = 100

let playBackBufferNode
let playBackGainNode = context.createGain()
let playBack = false

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

function playBackTrack(e) {
    if (!playBack) {
        fetch("/web/soundfiles/FS_bg_metronom.mp3")
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
                playBack = true
            })
        e.target.innerText = "Stop it!"
    } else {
        playBackBufferNode.stop()
        playBack = false
        e.target.innerText = "PlayAlong!"
    }
}

function updateBackTrackVol(e) {
    let gain = e.target.value / 100
    playBackGainNode.gain.value = gain
}
