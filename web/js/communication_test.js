document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    document
        .querySelector("#inputButton")
        .addEventListener("click", (event) => triggerHighscore(event))
}
function triggerHighscore(event) {
    event.preventDefault()

    let user = document.querySelector("#nameInput").value
    let score = document.querySelector("#scoreInput").value

    sendHighscore(user, score)
}
