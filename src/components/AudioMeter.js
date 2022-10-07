import React, { useRef } from 'react';
import { UseSoundMeter } from '../hooks/useSoundMeter';

function AudioMeter(){

    const instantMeter = useRef();
    const instantValueDisplay = useRef();
    let meterRefresh = null;
  
    const handleSuccess = (stream) =>{
        // Put variables in global scope to make them available to the
        // browser console.
        window.stream = stream;
        //const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
        UseSoundMeter(window.audioContext).connectToSource(stream, function(e) {
          if (e) {
            alert(e);
            return;
          }
          meterRefresh = setInterval(() => {
          instantMeter.current = instantValueDisplay.innerText =
          UseSoundMeter(window.audioContext).instant.toFixed(2);
          }, 200);
        });
      }
      
    //   function handleError(error) {
    //     console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    //   }
      
      
      const start = async () =>{
        console.log('Requesting local stream');
      
        try {
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          window.audioContext = new AudioContext();
          console.log('Requesting local strea2');
        } catch (e) {
          alert('Web Audio API not supported.');
        }
        console.log('Requesting local stream3');
       const response = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
       console.log(response)
       await handleSuccess(response);
       console.log('Requesting local stream4');
      }

      const stop = () =>{
        console.log('Stopping local stream');
        window.stream.getTracks().forEach(track => track.stop());
        UseSoundMeter(window.audioContext).stop();
        window.audioContext.close();
        clearInterval(meterRefresh);
        instantMeter.current = instantValueDisplay.innerText = '';
      }

     
            return (
            <>
            <div id="instant">
            <div className="label">Instant:</div>
            <meter ref={instantMeter} high="0.25" max="1" value="0"/>
            <div ref={instantValueDisplay} className="value"></div>
            </div>
            <button onClick={start}  type="button" id="startButton">Start</button> 
            <button onClick={stop} type="button" id="stopButton">Stop</button>
            </>
            )

    }

export default AudioMeter;   