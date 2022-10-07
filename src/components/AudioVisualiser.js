import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.meter = React.createRef();
    this.valueMeter = React.createRef();

  // this.instantMeter = document.querySelector('#instant meter');
  // this.instantValueDisplay = document.querySelector('#instant .value');

  }

  componentDidUpdate() {
    this.draw();
  }
  
  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    //NEW CODE start
    const valueMeter = this.valueMeter.current
    const meter = this.meter.current;

    // meter = valueMeter;
    //NEW CODE end
    const height = canvas.height; // 300
    //console.log(height);
    const width = canvas.width; // 300
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;
   // console.log(sliceWidth) // 0.296825

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);
   // console.log(context)
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      
      this.meter.current.value = valueMeter.innerText = y.toFixed(2);

      context.lineTo(x, y);
      x += sliceWidth;
      //console.log(x)
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return (
      <>
    <canvas width="300" height="300" ref={this.canvas} />
    <meter ref={this.meter} high="0.25" max="400" value="0"></meter>
    <div ref={this.valueMeter} className="value"></div>
    </>
    );
  }
}

export default AudioVisualiser;