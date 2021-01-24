document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    if (!sessionStorage.getItem("Server-URI")) {
        getConfiguration()
    }
}

function sendHighscore(user, score, song) {
    payload = {
        name: user,
        score: score,
        song: song,
    }

    let options = {
        method: "post",
        headers: {
            "x-access-tokens": sessionStorage.getItem("API-Key"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }
    return fetch(
        sessionStorage.getItem("Server-URI") + "/farbophon/addScore",
        options
    ).then((request) => {
        return request.json().then((data) => {
            return data
        })
    })
}

function getHighscore(song) {
    let options = {
        method: "get",
    }
    return fetch(
        sessionStorage.getItem("Server-URI") +
            "/farbophon/getHighscore?song=" +
            song,
        options
    ).then((request) => {
        return request.json().then((data) => {
            return data
        })
    })
}
