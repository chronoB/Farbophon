function sendHighscore(user, score) {
    payload = {
        name: user,
        score: score,
    }

    let options = {
        method: "post",
        headers: {
            "x-access-tokens": config.API_Key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }
    fetch(config.server_uri + "/farbophon/addScore", options)
        .then((request) => request.json())
        .then((data) => {
            //console.log(data)
        })
}

function getHighscore() {
    let options = {
        method: "get",
    }
    fetch(config.server_uri + "/farbophon/addScore", options)
        .then((request) => request.json())
        .then((data) => {
            //console.log(data)
        })
}
