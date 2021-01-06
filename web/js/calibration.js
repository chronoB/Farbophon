document.addEventListener("DOMContentLoaded", initCalibration)

function initCalibration() {
    document
        .querySelector("#calibration-button")
        .addEventListener("click", (event) => startCalibration(event))
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
