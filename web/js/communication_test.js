document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    document
        .querySelector("#inputButton")
        .addEventListener("click", (event) => triggerHighscore(event))
    document
        .querySelector("#showButton")
        .addEventListener("click", (event) => showHighscore(event))
}
function triggerHighscore(event) {
    event.preventDefault()

    let user = document.querySelector("#nameInput").value
    let score = document.querySelector("#scoreInput").value

    sendHighscore(user, score).then((data) => {
        document.querySelector("#highscoreText").innerHTML = JSON.stringify(
            data
        )
    })
}

function showHighscore(event) {
    event.preventDefault()
    getHighscore().then((data) => {
        document.querySelector("#highscoreText").innerHTML = JSON.stringify(
            data
        )
    })
}
