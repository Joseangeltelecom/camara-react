import React, { Component } from 'react';
import "./MeterTest.css"

class MeterTest extends Component {
    constructor(props) {
      super(props);
      this.state = {
        r1: .7,
        r2: .3
      };
    }
    componentDidMount() {
    //   this.animatedMeter = setInterval(
    //     () => this.animate(),
    //     1000
    //   );
    }
    componentWillUnmount() {
    //   clearInterval(this.animatedMeter);
    }
    animate(){
      this.setState({
        r1: Math.random(),
        r2: Math.random()
      })
    }
    render() {
      return (
        <div className="App">
          <div className="header">meters for days</div>
          <div className="group">
            <div className="title">rounded</div>
            <div className="meter"><Meter percent={.3}/></div>
            <div className="meter"><Meter percent={.8}/></div>
          </div>
          <div className="group">
            <div className="title">square</div>
            <div className="meter"><Meter percent={this.props.audioData} rounded={false}/></div>
            <div className="meter"><Meter percent={this.props.audioData} rounded={false}/></div>
          </div>
          <div className="group">
            <div className="title">animated</div>
            <div className="meter"><Meter percent={this.props.audioData} rounded={false}/></div>
            <div className="meter"><Meter percent={this.props.audioData} /></div>
          </div>
          <div className="group">
            <div className="title">colorful</div>
            <div className="meter"><Meter percent={.4} color={'#F44336'} rounded={false}/></div>
            <div className="meter"><Meter percent={.9} color={'#FFEB3B'}/></div>
          </div>
          <div className="group">
            <div className="title">bigger</div>
            <div className="meter"><Meter percent={.4} width={250} height={17} rounded={false}/></div>
            <div className="meter"><Meter percent={.9} width={250} height={17} /></div>
          </div>
        </div>
      );
    }
  }
  
  
  var Meter = function (props) {
    var {
      percent = 0,         // a number between 0 and 1, inclusive
      width = 100,         // the overall width
      height = 10,         // the overall height
      rounded = true,      // if true, use rounded corners
      color = "#0078bc",   // the fill color
      animate = false,     // if true, animate when the percent changes
      label = null         // a label to describe the contents (for accessibility)
    } = props;
  
    var r = rounded ? Math.ceil(height / 2) : 0;
    var w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
   // var style = animate ? { "transition": "width 500ms, fill 250ms" } : null;
  
    return (
      <svg width={width} height={height} aria-label={label}>
        <rect width={width} height={height} fill="#ccc" rx={r} ry={r}/>
        <rect width={w} height={height} fill={color} rx={r} ry={r}/>
      </svg>
    );
  };
  
  export default MeterTest;