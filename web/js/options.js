document.addEventListener("DOMContentLoaded", showConfig)

function showConfig() {
    fetch("/config")
        .then((response) => response.text())
        .then((data) => {
            let lines = data.split("\r\n")
            lines.forEach((line) => {
                let parts = line.split("=")
                if (parts[0] === "CamDevice") {
                    document.querySelector("#curCamDevice").innerText = parts[1]
                }
                if (parts[0] === "Threshold") {
                    document.querySelector("#curThreshold").innerText = parts[1]
                }
                if (parts[0] === "API-Key") {
                    document.querySelector("#curApiKey").innerText = parts[1]
                }
                if (parts[0] === "MidiDevice") {
                    document.querySelector("#curMidiController").innerText =
                        parts[1]
                }
                if (parts[0] === "Server-URI") {
                    document.querySelector("#curServerURI").innerText = parts[1]
                }
            })
        })
}
