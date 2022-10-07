import { useState, useEffect } from "react";

export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);
  const [videoInputList, setVideoInputList] = useState([]);
  const [audioInputList, setAudioInputList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function enableVideoStream() {
      try {     
    setIsLoading(true);
    const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInput = devices.filter((device) => device.kind === "videoinput");
    const audioInput = devices.filter((device) => device.kind === "audioinput");
    setIsLoading(false)   // Hide loading screen

    setVideoInputList(videoInput)
    setAudioInputList(audioInput)
    setMediaStream(stream);
      } catch (err) {
        // Handle the error
      }
    }

    
    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return {mediaStream, videoInputList, audioInputList, setVideoInputList, setAudioInputList, isLoading, setIsLoading };
}