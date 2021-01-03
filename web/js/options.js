document.addEventListener("DOMContentLoaded", showConfig)

function showConfig() {
    Object.keys(sessionStorage).forEach(function (key) {
        if (key === "IsThisFirstTime_Log_From_LiveServer") {
            //remove unwanted output from liveserver extension from vscode
            return
        }
        value = sessionStorage.getItem(key)
        container = document.createElement("div")
        container.className = "config-container"
        configDiv = document.createElement("div")
        label = document.createElement("label")
        label.setAttribute("for", key)
        label.innerText = key + ":"
        p = document.createElement("p")
        p.setAttribute("id", key)
        p.innerText = value

        configDiv.appendChild(label)
        configDiv.appendChild(p)
        container.appendChild(configDiv)
        document.querySelector(".rainbow-wrap").appendChild(container)
    })
}
