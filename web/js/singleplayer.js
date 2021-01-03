let song = []
let wh = 0
let startTime = 0
let counter = 0
let preTime = 5000

document.addEventListener("DOMContentLoaded", initSingleplayer)

function initSingleplayer() {
    wH = window.outerHeight
    startTime = new Date().getTime()

    readMelodyfile()
}

function evalMidiInput(note) {
    //TODO: implement! Scale corresponding div
}

function startGameAnimation() {
    ret = setInterval(function () {
        if (counter >= song.length) {
            clearInterval(ret)
            return
        }
        let time = Math.ceil(new Date().getTime())
        let curNote = song[counter]
        console.log(curNote)
        console.log(song)
        if (time - startTime >= curNote.time + preTime) {
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
