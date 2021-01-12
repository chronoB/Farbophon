document.addEventListener("DOMContentLoaded", addSelectOptions)

function addSelectOptions() {
    fetch("/web/melodyfiles/filelist.txt")
        .then((response) => response.text())
        .then((data) => {
            let lines = data.split("\r\n")
            lines = data.split("\n")
            lines.forEach((line) => {
                if (line === "") return
                let option = document.createElement("option")
                option.setAttribute("id", line)
                option.innerText = line
                document.getElementById("melodyselect").appendChild(option)
            })
        })
}

function selectMelody() {
    let selectEl = document.getElementById("melodyselect")
    if (selectEl.value === "") return

    sessionStorage.setItem("melodyFile", selectEl.value.split(".")[0])
}
