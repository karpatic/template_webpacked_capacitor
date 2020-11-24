export let exportedComponent

// https://github.com/arduino-libraries/MIDIUSB/blob/master/examples/MIDIUSB_read/MIDIUSB_read.ino
// https://www.w3.org/TR/webmidi/#getting-access-to-the-midi-system

// https://medium.com/@kulak/web-midi-api-sending-notes-from-javascript-to-your-synth-1dfee9c57645
// eeeennnn 0kkkkkkk 0vvvvvvv
// e=evnt n=ch  k=key  v=vel

/*
1001 prefix is a noteOn event — indicating that the keyboard key has been pressed, 
1000 is a noteOff event — indicating that the key has been depressed.

*/

let curleadbit = ''  //First bit
let curstate = ''  //Next 3 bits
let curch = '' //Last 4 bits   // 
let curcc = '' // Next Bytes  // AKA Pitch
let curvel = '' // Next Bytes  // Velocity

let oldleadbit = ''
let oldstate = ''
let oldch = ''
let oldcc = ''
let oldvel = ''
let display = ''

let outp; // global MIDIAccess object

// https://docs.isy.liu.se/pub/VanHeden/DataSheets/The_MIDI_Specification.pdf

export function sendMiddleC( ) { 
  var noteOnMessage = [0xB0, 60, 60];    // note on, middle C, full velocity 
  // Inlined array creation- note off, middle C,  
  // release velocity = 64, timestamp = now + 1000ms.
  // output.send( [0x80, 60, 0x40], window.performance.now() + 1000.0 ); 
  // setInterval( sendMiddleC(midiAccess, portID ), 500);
  let form_ch = document.querySelector('#ch')
  let form_cc = document.querySelector('#cc')
  let form_ty = document.querySelector('input[name="ty"]:checked')
  console.log(form_ch, form_cc, form_ty )
  if(form_ch && form_cc && form_ty){
    console.log(form_ch.value, form_cc.value, form_ty.value )
    if(form_ch.value && form_cc.value && form_ty.value){
      console.log('Sendit!')
      let val = 0xB0
      if(form_ty.value==2){ val = 0x90 }
      if(form_ty.value==3){ val = 0x80 }
      // outp.send(noteOnMessage)
      outp.send( [ val, form_ch.value, form_cc.value] );  //omitting the timestamp means send immediately.
    }
  }
}

export function onMIDISuccess( midiAccess ) { 
  // // store in the global (in real usage, would probably keep in an object instance)
  console.log('onMIDISuccess', midiAccess) 
  // Input Ports
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
  // Output Ports
  var i = 0
  for (var output of midiAccess.outputs.values()) {
    if(output.manufacturer== "Adafruit"){
      outp = output
      console.log("OUTPUT PORT: ", i, output)
      sendMiddleC()
      // midiAccess.outputs.get(portID);
    }
    i++
  }
}

function getMIDIMessage(midiMessage) {
  console.log('recieved')
  // Current Values become Old Values
  oldleadbit = curleadbit
  oldstate = curstate
  oldch = curch
  oldcc = curcc
  oldvel = curvel
  
  // Midi Message become Current Values
  curleadbit = parseInt((midiMessage.data[0]).toString(2).slice(0, 1), 2)
  curstate = parseInt((midiMessage.data[0]).toString(2).slice(1, 4), 2)
  curch = parseInt((midiMessage.data[0]).toString(2).slice(4, 8), 2)
  curcc = midiMessage.data[1]
  curvel = midiMessage.data[2]

  // Retrieve Form Elements
  let form_ch = document.querySelector('#ch')
  let form_cc = document.querySelector('#cc')
  let form_ty = document.querySelector('input[name="ty"]:checked') 

  display = [ oldstate == curstate, oldcc == curcc, oldvel == curvel ].some((num)=> num == false)
  if( display ){ 
    form_ch.value = curch
    form_cc.value = curcc
    // form_ty.value = "2"
    console.log(JSON.stringify({
      // curleadbit,
      curstate,
      curvel
    }) )
  }
}

export function onMIDIFailure(title, text) {
  console.log('Could not access your MIDI devices.');
}

export function sendNotification(title, text) {
  // If it's okay let's create a notification
  Notification.requestPermission()
  if (Notification.permission === "granted") {
    var notification = new Notification('To do list',{
      body: text
    });
    notification.onclick = function(event) {
      console.log('Notification Clicked')
      event.preventDefault();
      //window.open('http://www.mozilla.org', '_blank');
      //workerblob.postMessage("CarlosBot#");
    }
  }
}