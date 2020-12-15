document.addEventListener("DOMContentLoaded", init)

function init() {
    let navButtons = document.querySelectorAll(".nav-button")
    navButtons.forEach(btn => {
        btn.addEventListener("click", event => initAfterLoader(event))
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
