document.addEventListener("DOMContentLoaded", init)

function init() {
    checkIfConfigIsLoaded()
    let navButtons = document.querySelectorAll(".nav-button")
    navButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => initAfterLoader(event))
    })
}

//rmv preloader when images are loaded
window.onload = removePreLoader
function removePreLoader() {
    let preloader = document.getElementById("preloader")
    preloader.classList.remove("show")
}

function initAfterLoader(event) {
    let afterloader = document.getElementById("afterloader")
    afterloader.classList.add("show")
    window.setTimeout(function () {
        redirectToPage(event.target)
    }, 500)
}

function redirectToPage(target) {
    window.location = target.dataset.target
}

//Configuration

function checkIfConfigIsLoaded() {
    if (sessionStorage.getItem("isConfigLoaded") === null) {
        getConfiguration()
    }
}

function getConfiguration() {
    let identifierIndex = 0
    let valueIndex = 1

    fetch("/config")
        .then((response) => response.text())
        .then((data) => {
            //split every line into a new object.
            //every line of the config file is a new config object
            let lines = data.split("\r\n")
            lines.forEach((line) => {
                //split the configuration in two parts
                //identifier=value
                let parts = line.split("=")
                //save the configuration in the sessionStorage
                sessionStorage.setItem(
                    parts[identifierIndex],
                    parts[valueIndex]
                )
            })
            sessionStorage.setItem("isConfigLoaded", 1)
            const DEV_MODE = parseInt(sessionStorage.getItem("DevMode"))
        })
}
