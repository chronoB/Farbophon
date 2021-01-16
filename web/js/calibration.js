document.addEventListener("DOMContentLoaded", initCalibration)

function initCalibration() {
    let calButton = document.querySelector("#calibration-button")

    calButton.addEventListener("click", (event) => startCalibration(event))
    let splitReferrer = document.referrer.split("/")
    if (
        splitReferrer[splitReferrer.length - 1] ===
        "singleplayerMelodySelect.html"
    ) {
        calButton.setAttribute("data-target", "/web/html/singleplayer.html")
    } else if (
        splitReferrer[splitReferrer.length - 2] === "web" ||
        splitReferrer[splitReferrer.length - 1] === "index.html"
    ) {
        calButton.setAttribute("data-target", "/web/html/testarea.html")
    }
}
function startCalibration(event) {
    //set display
    document.querySelector("#calibration").style.display = "none"
    document.querySelector("#calibration-overlay").style.display = "flex"
    let counter = 3
    //start timeout for countdown
    countdown(counter, event)
    //after 0 send midi signal
}

function countdown(counter, event) {
    if (counter >= 0) {
        window.setTimeout(() => {
            document.querySelector("#overlay-countdown-p").innerText = counter
            newCounter = counter - 1
            countdown(newCounter, event)
        }, 1000)
        return
    }
    sendCalibrationMidi()
    initAfterLoader(event)
}

function sendCalibrationMidi() {
    let event = 0x91
    sendMidi(event, 0, 0)
}
