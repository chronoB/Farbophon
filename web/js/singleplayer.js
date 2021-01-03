let song = []
let wh = 0
let startTime = 0
let counter = 0
let preTime = 5000

let score = 0

document.addEventListener("DOMContentLoaded", initSingleplayer)

function initSingleplayer() {
    wH = window.outerHeight
    startTime = new Date().getTime()

    readMelodyfile()
}

function evalMidiInput(note) {
    // Maybe variable that is set to true or false that will be used to get the input or ignore it
    // TODO: implement! Scale corresponding div
    // Check if Midi.Input is correct
}

function startGameAnimation() {
    ret = setInterval(function () {
        let time = Math.ceil(new Date().getTime())
        let curNote = song[counter]
        if (curNote.note === -1) {
            clearInterval(ret)
            setHighscore()
            return
        }
        if (time - startTime >= curNote.time + preTime) {
            console.log(curNote)
            console.log(song)
            let strCurNote = document.querySelector(".string_" + curNote.note)
            let id = Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 5)
            let button = document.createElement("button")
            button.setAttribute("id", id)
            strCurNote.appendChild(button)
            strCurNote
                .querySelector("#" + id)
                .animate([{ top: 0 }, { top: 96 + "%" }], {
                    duration: preTime,
                })
            window.setTimeout(() => deleteButton(id), preTime)
            counter += 1
        }
    }, 100)
}

function deleteButton(id) {
    document.querySelector("#" + id).remove()
}

function setHighscore() {
    //TODO: Get score and set it with the communication.js functions
    //the score will be tracked in the evalMidiInput function
}
