let song = []
let startTime = 0
let counter = 0
let preTime = 5000

let score = 0

let curMidiNote
let strMidiNote

document.addEventListener("DOMContentLoaded", initSingleplayer)

function initSingleplayer() {
    wH = window.outerHeight
    readMelodyfile()
}

function evalMidiInput(note) {
    // Maybe variable that is set to true or false that will be used to get the input or ignore it
    // TODO: implement! Scale corresponding div
    // Check if Midi.Input is correct
    curMidiNote = note
    scaleMidiNote()
}

function gameAnimation(ret) {
    let time = new Date().getTime()
    let curNote = song[counter]
    if (curNote.note === -1) {
        clearInterval(ret)
        window.setTimeout(activateHighscoreOverlay, 6000)
        return
    }
    if (time - startTime >= curNote.time - preTime) {
        window.setTimeout(() => {
            updateScore(curNote)
        }, preTime)
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
}

function startGameAnimation() {
    startTime = new Date().getTime()
    gameAnimation()
    let ret = setInterval(() => {
        gameAnimation(ret)
    }, 100)
}

function deleteButton(id) {
    document.querySelector("#" + id).remove()
}

function scaleMidiNote() {
    if (strMidiNote !== undefined) strMidiNote.style.transform = "scale(1.0)"
    if (curMidiNote === 7) return
    strMidiNote = document.querySelector("#note_" + curMidiNote)
    strMidiNote.style.transform = "scale(1.2)"
}

function updateScore(curNote) {
    if (curMidiNote === curNote.note) score++
    else score--
    displayScore()
}

function displayScore() {
    let scoreEl = document.querySelector("#score")
    scoreEl.innerText = score
}

/*highscore*/

function activateHighscoreOverlay() {
    midi_in.removeEventListener("midimessage", onMIDIMessage)
    document.querySelector("#highscore-screen").style.display = "flex"
    if (score > 0)
        document.querySelector("#userscore").innerText =
            "Glückwunsch, du hast " + score + " Punkte erreicht."
    else
        document.querySelector("#userscore").innerText =
            "Schade, du hast " +
            score +
            " Punkte erreicht. Versuche es nochmal!"
    updateHighscore()
}

function _sendHighscore() {
    if (sessionStorage.getItem("API-Key")) {
        sendHighscore(
            document.querySelector("#username-input").value,
            score,
            sessionStorage.getItem("melodyFile")
        ).then((data) => {
            if (data.status !== "success") {
                _apiError("wrong")
                return
            }
            updateHighscore()
            document.querySelector("#login-button").setAttribute("disabled", "")
            document.querySelector("#login-button").style.opacity = 0.2
        })
    } else {
        _apiError("missing")
    }
}

function updateHighscore() {
    getHighscore(sessionStorage.getItem("melodyFile")).then((data) => {
        document.querySelector("#highscores").innerHTML = ""

        let div = document.createElement("div")
        let pName = document.createElement("p")
        let pScore = document.createElement("p")
        pName.innerText = "Name"
        pScore.innerText = "Punktzahl"
        div.appendChild(pName)
        div.appendChild(pScore)
        document.querySelector("#highscores").appendChild(div)

        data.highscore.forEach((el) => {
            div = document.createElement("div")
            pName = document.createElement("span")
            pScore = document.createElement("span")

            pName.innerText = el.name
            pScore.innerText = el.score

            div.appendChild(pName)
            div.appendChild(pScore)
            document.querySelector("#highscores").appendChild(div)
        })
    })
}

const API_ERROR_TEXT = {
    missing:
        "Du hast keinen API-Key. Setz dich mit dem Admin des Servers in Kontakt, um einen API-Key zu bekommen.",
    wrong:
        "Du hast einen falschen API-Key. Versuchst du dich zum richtigen Server zu verbinden?",
}
function _apiError(infoText) {
    document.querySelector("#login").style.borderColor = "red"
    document.querySelector("#login").style.borderStyle = "dashed"
    document.querySelector("#info-text").innerText = API_ERROR_TEXT[infoText]
    document.querySelector("#login-button").setAttribute("disabled", "")
    document.querySelector("#login-button").style.opacity = 0.2
}
