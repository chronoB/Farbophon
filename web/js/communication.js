document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    if (!sessionStorage.getItem("Server-URI")) {
        getConfiguration()
    }
}

function register(user, password) {
    payload = {
        name: user,
        password: password,
    }
    let options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }
    return fetch(
        sessionStorage.getItem("Server-URI") + "/farbophon/register",
        options
    ).then((request) => {
        return request.json().then((data) => {
            return data
        })
    })
}

function login(user, password) {
    let options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            authorization: "Basic " + btoa(user + ":" + password),
        },
    }
    return fetch(
        sessionStorage.getItem("Server-URI") + "/farbophon/login",
        options
    ).then((request) => {
        return request.json().then((data) => {
            sessionStorage.setItem("Server-Token", data.token)
            return data
        })
    })
}

function sendHighscore(user, score) {
    payload = {
        name: user,
        score: score,
    }

    let options = {
        method: "post",
        headers: {
            "x-access-tokens": sessionStorage.getItem("Server-Token"),
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

function getHighscore() {
    let options = {
        method: "get",
    }
    return fetch(
        sessionStorage.getItem("Server-URI") + "/farbophon/getHighscore",
        options
    ).then((request) => {
        return request.json().then((data) => {
            return data
        })
    })
}