import React, { Component } from 'react';
import AudioVisualiser from './AudioVisualiser';
import MeterTest from './MeterTest';

class AudioAnalyser extends Component {

    constructor(props) {
        super(props);
        this.state = { audioData: new Uint8Array(0) };
        this.tick = this.tick.bind(this);
      }
      
 
    componentDidMount() {
        // Primero creamos un nuevo AudioContext .
        // Safari todavía solo admite la versión prefijada de webkit.
        this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        // crearemos un AnalyserNode que hará el trabajo pesado por nosotros:
        this.analyser = this.audioContext.createAnalyser();
        //Del AnalyserNode necesitamos saber la frecuenciaBinCount que, según la documentación, generalmente equivale a la cantidad de valores de datos que estarán disponibles para reproducir en una visualización.
        // Crearemos una matriz de enteros sin signo de 8 bits, un Uint8Array, la longitud de la frecuenciaBinCount.
        // Este dataArray se utilizará para almacenar los datos de forma de onda que el AnalyserNode creará.
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
       // Pasamos el media stream del micrófono al componente como props y necesitamos convertirlo en una fuente para la Web Audio API.
       // To do this, call createMediaStreamSource on the AudioContext object, passing in the stream.  
       this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        // Once we have the source we can then connect the analyser.
        this.source.connect(this.analyser);
        // tendremos que llamar al método getByteTimeDomainData de AnalyserNode cada vez que queramos actualizar la visualización.
        this.rafId = requestAnimationFrame(this.tick);
        }

        tick() {
            this.analyser.getByteTimeDomainData(this.dataArray);
            this.setState({ audioData: this.dataArray });
            /* Dado que estaremos animando esta visualización, llamaremos a la API requestAnimationFrame del navegador para extraer
             los datos de audio más recientes del AnalyserNode cada vez que queramos actualizar la visualización.*/
             this.rafId = requestAnimationFrame(this.tick);
          }

        componentWillUnmount() {
            cancelAnimationFrame(this.rafId);
            this.analyser.disconnect();
            this.source.disconnect();
          }

        //   render() {
        //     return <AudioVisualiser audioData={this.state.audioData} />;
        //   }
        render() {
            return (
                <>
              <AudioVisualiser audioData={this.state.audioData} /> 
              <MeterTest audioData={this.state.audioData} /> 
          {/*      <textarea value={this.state.audioData} />; */}
               </>
            )
          }
    }

export default AudioAnalyser;   