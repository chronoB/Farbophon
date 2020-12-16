document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    if (!sessionStorage.getItem("API-Key")) {
        getConfiguration()
    }
}

function sendHighscore(user, score) {
    payload = {
        name: user,
        score: score,
    }

    let options = {
        method: "post",
        headers: {
            "x-access-tokens": sessionStorage.getItem("API-Key"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }
    fetch(sessionStorage.getItem("Server-URI") + "/farbophon/addScore", options)
        .then((request) => request.json())
        .then((data) => {
            //console.log(data)
        })
}

function getHighscore() {
    let options = {
        method: "get",
    }
    fetch(sessionStorage.getItem("Server-URI") + "/farbophon/addScore", options)
        .then((request) => request.json())
        .then((data) => {
            //console.log(data)
        })
}
