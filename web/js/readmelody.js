function readMelodyfile() {
    fetch("../melodyfiles/lv01.csv")
        .then((response) => response.text())
        .then((textmelody) => {
            //Translate the json and save it to song
            console.log(textmelody)
            song = processData(textmelody)
            startGameAnimation()
        })

    //get melodyfile from folder
    //file (csv):
    /*
    {
        //beinhaltet
        100,0
        500,0
        900,1
        1300,2
        .
        .
        .
        // soll werden zu
        //[[timestamp],[note]]
    }
    */
    //save items in the following structure:
    /*let song = [
        { time: 100, note: 1 },
        ...
    ]*/
}

/* Online gefunden */

// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "data.txt",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/)
    var headers = allTextLines[0].split(";")
    var lines = []

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(";")
        if (data.length == headers.length) {
            var tarr = {}
            tarr.time = parseInt(data[0])
            tarr.note = parseInt(data[1])

            lines.push(tarr)
        }
    }
    return lines
}
