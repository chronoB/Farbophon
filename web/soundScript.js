// Init. Sounds, Load into Buffer
// Connect to Output
// Listen to MIDI: LoopBe1
//

function onMIDIMessage2(event) {
    // event.data is an array
    // event.data[0] = on (144) / off (128) / controlChange (176)  / pitchBend (224) / ...
    // event.data[1] = midi note
    // event.data[2] = velocity
    console.log(event.data[0]);
    switch (event.data[0]) {
    case 144:
        // your function startNote(note, velocity)
        soundName="" + event.data[1];
        //startNote(event.data[1]);
        document.getElementById("midiNote").innerHTML = event.data[1] + " ";               // Hier einsetzen mit innerHTML, sodass die Midi-Note angezeigt wird?
        console.log(event.data[1]) + "erkannt";
        break;

    case 128:
        // your function stopNote(note, velocity)
        soundName = "7";
        // stopNote(event.data[1]);
        document.getElementById("midiNote").innerHTML = " Midi Note";
        console.log(event.data[1]);
        //console.log(stopNote);
        break;
    }}
