let song = [
    { time: 5000, note: 1 },
    { time: 6000, note: 2 },
    { time: 7000, note: 3 },
    { time: 8000, note: 4 },
    { time: 9000, note: 5 },
    { time: 10000, note: 5 },
    { time: 11000, note: 4 },
    { time: 12000, note: 3 },
    { time: 13000, note: 2 },
    { time: 14000, note: 1 },
]
let wh = 0
let startTime = 0
let counter = 0
let preTime = 5000

document.addEventListener("DOMContentLoaded", initSingleplayer)

function initSingleplayer() {
    wH = window.outerHeight
    startTime = new Date().getTime()
    startGameAnimation()
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
