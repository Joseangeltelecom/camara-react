import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera";
import { useUserMedia } from "./hooks/use-user-media";
import { Root, Preview, Footer, GlobalStyle } from "./styles";
import LoadingSpinner from "./hooks/LoadingSpinner";
import AudioAnalyser from "./components/AudioAnalyser";
import "./index.css"
import AudioMeter from "./components/AudioMeter";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();
  const audioInputSelect = useRef()
  const videoSelect = useRef()
  const [audio, setAudio] = useState(null);


  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audio);
  }

  const stopMicrophone = () => {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
  }

 const toggleMicrophone = () => {
    if (audio) {
     stopMicrophone();
    } else {
    getMicrophone();
    }
  }

  const CAPTURE_OPTIONS = {
    audio: true,
    video: true,
  };
  const devices = useUserMedia(CAPTURE_OPTIONS)

  const renderUser =  <Root>
 {/*  <AudioMeter/> */}
  {isCameraOpen && (
    <Camera isCameraOpen={isCameraOpen}/>
  )}

<div className="controls">
          <button onClick={toggleMicrophone}>
            {audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        {audio ? <AudioAnalyser audio={audio} /> : ''}

  {cardImage && (
    <div>
      <h2>Preview</h2>
      <Preview src={cardImage && URL.createObjectURL(cardImage)} />
    </div>
  )}



<div className="select">
   <label htmlFor="audioSource">Camara source: </label>
  <select
  ref={videoSelect}
  id="audioSource"
  value={devices.videoInputList}
  onChange={e => devices.setVideoInputList(e.target.value)}>
  {devices.videoInputList.map(o => (
    <option key={o.value} value={o.value}>{o.label}</option>
  ))}
</select>
</div>

<div className="select">
  <label htmlFor="audioOutput">Micro source</label>
  <select
  ref={audioInputSelect}
  id="audioSource"
  value={devices.audioInputList}
  onChange={e => devices.setVideoInputList(e.target.value)}>
  {devices.audioInputList.map(o => (
    <option key={o.value} value={o.value}>{o.label}</option>
  ))}
</select> 
</div> 
  <Footer>
    <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
    <button
      onClick={() => {
        setIsCameraOpen(false);
        setCardImage(undefined);
      }}
    >
      Close Camera
    </button>
  </Footer>
</Root>
const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <Fragment> 
      
      {devices.isLoading ? <div style={style}><LoadingSpinner /></div> : renderUser}   
      <GlobalStyle />
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
