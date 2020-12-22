import rtmidi as midi

midiOut = midi.MidiOut()
midiIn = midi.MidiIn()

print("Midi outs:", midiOut.get_ports())
print("Midi ins:", midiIn.get_ports())
