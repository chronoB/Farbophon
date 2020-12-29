import rtmidi as midi

midiOut = midi.MidiOut()
midiIn = midi.MidiIn()

midiOutPorts = midiOut.get_ports()
midiInPorts = midiIn.get_ports()

print("Midi outs:", midiOutPorts)
print("Midi ins:", midiInPorts)
