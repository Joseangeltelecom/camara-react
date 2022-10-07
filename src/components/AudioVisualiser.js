import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.meter = React.createRef();
    this.valueMeter = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }
  

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    //NEW CODE start
    // const valueMeter = this.valueMeter.current = audioData;
    // const meter = this.meter.current;
    // meter = valueMeter;
    //NEW CODE end
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return (
      <>
    <canvas width="300" height="300" ref={this.canvas} />
    <meter ref={this.meter} id="disk_c" value="2" min="0" max="10">2 out of 10</meter>
    <div ref={this.valueMeter} className="value"></div>
    </>
    );
  }
}

export default AudioVisualiser;