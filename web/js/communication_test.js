document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    document
        .querySelector("#registerButton")
        .addEventListener("click", (event) => registerUser(event))
    document
        .querySelector("#loginButton")
        .addEventListener("click", (event) => loginUser(event))
    document
        .querySelector("#inputButton")
        .addEventListener("click", (event) => triggerHighscore(event))
    document
        .querySelector("#showButton")
        .addEventListener("click", (event) => showHighscore(event))
}

function registerUser(event) {
    event.preventDefault()

    let user = document.querySelector("#registerNameInput").value
    let pw = document.querySelector("#registerPasswordInput").value
    register(user, pw).then((data) => {
        document.querySelector("#outputText").innerHTML = JSON.stringify(data)
    })
}

function loginUser(event) {
    event.preventDefault()

    let user = document.querySelector("#loginNameInput").value
    let pw = document.querySelector("#loginPasswordInput").value

    login(user, pw).then((data) => {
        document.querySelector("#outputText").innerHTML =
            JSON.stringify(data) + "\ntoken saved in sessionstorage."
    })
}

function triggerHighscore(event) {
    event.preventDefault()

    let user = document.querySelector("#nameInput").value
    let score = document.querySelector("#scoreInput").value
    let song = document.querySelector("#songInput").value

    sendHighscore(user, score, song).then((data) => {
        document.querySelector("#outputText").innerHTML = JSON.stringify(data)
    })
}

function showHighscore(event) {
    event.preventDefault()
    let song = document.querySelector("#songInput").value
    getHighscore(song).then((data) => {
        document.querySelector("#outputText").innerHTML = JSON.stringify(data)
    })
}
