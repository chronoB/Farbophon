
document.addEventListener("DOMContentLoaded", init)

function init() {
    let buttons = document.querySelectorAll(".button-wrap")
    buttons.forEach(btn => {
        btn.addEventListener("click", initAfterLoader)
    })
}

//rmv preloader when images are loaded
window.onload = removePreLoader
function removePreLoader() {
    let preloader = document.getElementById("preloader")
    preloader.classList.remove("show")
}


function initAfterLoader() {
    let afterloader = document.getElementById("afterloader")
    afterloader.classList.add("show")
}
