
let context = new AudioContext();

let soundName = ""

let bpm = 100

function initialize() {
	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess()
			.then(success, failure);
	}

	// Initialisiert WebMIDI
	function success(midi) {
		createUI(midi.inputs);

		// liefert Liste der MIDI-Input Ports
		function findInputPort(name) {
			let selectedInput = null;
			midi.inputs.forEach(function (input, key) {
				if (input.name == name) {
					selectedInput = input;
				}
			});
			return selectedInput;
		}

		// initialisiert einen MIDI-Input Port
		function initializeInputPort(name) {
			const input = findInputPort(name);
			if (input) {
				input.addEventListener('midimessage', onMIDIMessage2);
			}
		}

		// erzeugt Dropdown-Menü mit MIDI-Input Ports
		function createUI(inputs) {
			inputs.forEach(function (input, key) {
				let opt = document.createElement("option");
				opt.text = input.name;
				document.getElementById("inputportselector").add(opt);
			});

			document.getElementById("connectbutton").addEventListener("click", onConnect);
			function onConnect() {
				var optionsMenu = document.getElementById("inputportselector");
				var portName = optionsMenu.options[optionsMenu.selectedIndex].text;

				initializeInputPort(portName);
			}
			document.querySelector("#bpmButton").addEventListener("click", setBPM)
			function setBPM() {
				bpm = parseInt(document.querySelector("#bpm").value)
			}
		}
		initBPM()
		function initBPM() {
			bpm = parseInt(document.querySelector("#bpm").value)
			playNoteperBPM()
		}
		function playNoteperBPM() {
			playDrum()
			window.setTimeout(playNoteperBPM, 1000 / bpm * 60)
		}

	}

	function failure() {
		console.error('No access to your midi devices.')
	}

	// MIDI-Input Eventhandler
	function onMIDIMessage(event) {
		let string = "";
		console.log(event)
		for (byte of event.data) {
			string += byte.toString(8) + " ";

			// Darstellung der MIDI-Strings im Textfeld
			document.getElementById("label").innerHTML = string;
			document.getElementById("midiNote").innerHTML = event.data[1];
		}
		let note = parseInt(event.data[1])
		console.log(note)
		if (note === 1) {
			document.getElementById("label").innerHTML = "red";
			soundName = "1"
		} else if (note === 2) {
			document.getElementById("label").innerHTML = "green";
			soundName = "2"
		} else if (note === 3) {
			document.getElementById("label").innerHTML = "blue";
			soundName = "3"
		} else if (note === 4) {
			document.getElementById("label").innerHTML = "cyan";
			soundName = "4"
		} else if (note === 5) {
			document.getElementById("label").innerHTML = "magenta";
			soundName = "5"
		} else if (note === 6) {
			document.getElementById("label").innerHTML = "yellow";
			soundName = "6"
		} else if (note === 7) {
			document.getElementById("label").innerHTML = "off";
			soundName = "7"
		}
	}



	function playDrum() {
		console.log(soundName);
		if (soundName.includes("7") || soundName == "") {
			return
		} else {
			console.log(soundName)
		}
		fetch("drumsounds/" + soundName + ".wav")
			// Antwort in Array parsen
			.then(response => response.arrayBuffer())
			// Array in Buffer Wandeln
			.then(undecodedAudio => context.decodeAudioData(undecodedAudio))
			// Buffer in SourceBufferNode wandeln und abspielen
			.then(audioBuffer => {
				let sourceBufferNode = context.createBufferSource();
				sourceBufferNode.buffer = audioBuffer;
				sourceBufferNode.connect(context.destination);
				sourceBufferNode.start(context.currentTime);
			})
			// im Fehlerfall Consolenfehler ausgeben
			.catch(console.error);
	}
}
