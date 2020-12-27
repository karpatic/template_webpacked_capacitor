/*
#File: Index.js
#Author: 
#Date: June 2020
#Email: @ .
#Description: Loads the app and inserts it into the div 'start-app'
#Purpose: We have to kickstart the app somehow!
#input: Nothin
#output: The Application and maybe a Service Worker

*/

import './css/index.css';

import {onMIDISuccess, getMIDIMessage, onMIDIFailure, sendNotification, sendMiddleC} from './js/Script1.js'

import {Capacitor} from '@capacitor/core';

import {Chardin} from 'chardin.ts';
import 'chardin.ts/chardinjs.scss';

(async()=>{

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

  //Get the URL Query String. default: ""
  let location_search = window.location.search

  // Check the URL Query String for meaningful information
  window.GlobalVariable = location_search.replace("?GlobalVariable=", "").replace(".html", "").replace(/([A-Z])/g, ' $1').trim()

  let viewOne = GlobalVariable.includes('viewone')
  console.log(viewOne, GlobalVariable)

  //
  // Load a View using the URL Query String for navigation
  //
  document.body.innerHTML += ''
  if (!location_search) {
    //
    // Load the Homepage
    //
    console.log('HOMEPAGE')
    let myCounties = await import(/* webpackChunkName: "ScriptName" */
    './assets/Basemap_of_DC_in_Light_Gray.json')
    let body = document.querySelector("#body") 
 
    
    body.innerHTML += `
    <div id="root"></div><button id='notification-button'>btn</button>
    <div style="background:pink;   margin: auto; min-width:400px; width: 50%; border: 3px solid green; padding: 10px;">
	<style>
	label{
	  padding:10px
	}
	</style>
    <div style="  width:350px; margin: auto; ">
		<h1> Midi Programmer </h1>
		<details>
			<summary><b>Description:</b></summary>
			This platform was built to allow you to alter the midi-messages your device sends. 
			This may be neccessary when working with external softwares that operate on midi messages in a fixed manner. 
			<br>
		</details> <br>

		<details> 
		    <summary><b>Tips:</b></summary>
			<ul>
				<li><b>toggle</b> - 1 command & internal memory -> What was the previous state? -> Syncs with light outside.</li>
				<li><b>momentary</b> - sends two commands. Switch on then Switch back off. a fixed 200 milliseconds.</li>
				<li><b>single command</b> - it does not matter what the command is. (0 or 0-127)</li>
			</ul>
		</details>
		<br>
<table>
  <tr>
    <th><b> Midi Channel</b>  </th>
    <th><label for="ch"><b>Channel</b> <br>(1-16)</label></th>
    <th><label for="cc"><b>CC Number</b> <br>(0-127)</label></th>
    <th><label for="type">Type:</label></th>
  </tr>
  <tr>
    <td>1</td>
    <td><input type="number" id="ch1" name="ch" min="1" max="16"></td>
    <td><input type="number" id="cc1" name="cc" min="0" max="127"></td>
    <td>
		<select name="type" id="type1">
		  <option value="1"><b>Trigger</b></option>
		  <option value="2"><b>Toggle</b></option>
		  <option value="3"><b>Momentary</b></option> 
		</select>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td><input type="number" id="ch2" name="ch" min="1" max="16"></td>
    <td><input type="number" id="cc2" name="cc" min="0" max="127"></td>
    <td>
		<select name="type" id="type2">
		  <option value="1"><b>Trigger</b></option>
		  <option value="2"><b>Toggle</b></option>
		  <option value="3"><b>Momentary</b></option> 
		</select>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td><input type="number" id="ch3" name="ch" min="1" max="16"></td>
    <td><input type="number" id="cc3" name="cc" min="0" max="127"></td>
    <td>
		<select name="type" id="type3">
		  <option value="1"><b>Trigger</b></option>
		  <option value="2"><b>Toggle</b></option>
		  <option value="3"><b>Momentary</b></option> 
		</select>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td><input type="number" id="ch4" name="ch" min="1" max="16"></td>
    <td><input type="number" id="cc4" name="cc" min="0" max="127"></td>
    <td>
		<select name="type" id="type4">
		  <option value="1"><b>Trigger</b></option>
		  <option value="2"><b>Toggle</b></option>
		  <option value="3"><b>Momentary</b></option> 
		</select>
    </td>
  </tr>
</table>
		<br>

		<input type="submit">
	</div>
	</div>
    `
    window.globalvariable = [];
    document.querySelector("input[type=submit]").addEventListener("click", sendMiddleC);
    
    document.querySelector('#notification-button').onclick = async()=>{
      sendNotification('Title', 'Text!')
    }

  } else if (viewOne) {
    //
    // VIEW ONE
    // 
    var sidebutton = viewOne
    document.body.innerHTML += ` 
		<div id="Wrapper"> 
		  <div class="sidebutton">
			<div <div data-intro="Toggle Something"  data-position="right">
			  ${sidebutton}
			</div>
		  </div>
		</div> `

    import(/* webpackChunkName: "Script2" */ './js/Script2.js')
  } else {//
  // VIEW TWO
  //
  }

  //
  // Chardin JS.
  //
  // localStorage.setItem('displayChardin', 'test')
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) & location_search && localStorage.getItem('displayChardin') != 'false') {
    localStorage.setItem('displayChardin', 'false')
    let chardin = new Chardin(document.querySelector('body'));
    chardin.start();
  }
}
)()
