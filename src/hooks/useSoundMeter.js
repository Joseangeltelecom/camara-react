import React, { useState } from 'react'

export function UseSoundMeter(context) {
let mic;
 const [instant, setInstant] = useState(0.0)
 const script = context.createScriptProcessor(2048, 1, 1);
 
script.onaudioprocess = function (event) {
const input = event.inputBuffer.getChannelData(0);
let i;
let sum = 0.0;
let clipcount = 0;

for (i = 0; i < input.length; ++i) {
sum += input[i] * input[i];
if (Math.abs(input[i]) > 0.99) {
clipcount += 1;
}
 }
setInstant(Math.sqrt(sum / input.length))
}
        
        const connectToSource = (stream, callback) => {
            console.log('SoundMeter connecting');
            try {
                mic = context.createMediaStreamSource(stream);
                mic.connect(script);
                // necessary to make sample run, but should not be.
                script.connect(context.destination);
                if (typeof callback !== 'undefined') {
                    callback(null);
                }
            } catch (e) {
                console.error(e);
                if (typeof callback !== 'undefined') {
                    callback(e);
                }
            }
        }

        const stop = () =>{
            console.log('SoundMeter stopping');
            mic.disconnect();
            script.disconnect();
        }
    
    
    
  return {stop, connectToSource, instant}
}
