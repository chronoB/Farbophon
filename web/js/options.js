document.addEventListener("DOMContentLoaded", init)

function init() {
    showCurAPIKey()
}

function showCurAPIKey() {
    fetch("/config")
        .then(response => response.text())
        .then(data => {
            let lines = data.split("\r\n")
            lines.forEach(line => {
                let parts = line.split("=")
                if (parts[0] === "API-Key") {
                    document.querySelector("#curApiKey").innerText = parts[1]
                }
            })
        })

}
