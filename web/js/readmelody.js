function readMelodyfile() {
    fetch("../melodyfiles/lv01.csv")
        .then((response) => response.text())
        .then((textmelody) => {
            //Translate the csv and save it to song
            console.log(textmelody)
            song = processData(textmelody)
            startGameAnimation()
        })
}

function processData(allText) {
    let allTextLines = allText.split(/\r\n|\n/)
    let headers = allTextLines[0].split(";")
    let lines = []

    for (let i = 1; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(";")
        if (data.length === headers.length) {
            let tarr = {}
            tarr.time = parseInt(data[0])
            tarr.note = parseInt(data[1])

            lines.push(tarr)
        }
    }
    return lines
}