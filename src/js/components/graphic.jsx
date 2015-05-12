import React from "react";
import Immutable from "immutable";

import GraphicStore from '../stores/graphic_store';
import GraphicActions from '../actions/graphic_actions';
import Colors from "../values/colors";
import Sizes from "../values/sizes";
import Tools from "../values/tools";
import Textures from "../values/textures";

var Graphic = React.createClass({
  getInitialState: function() {
    return GraphicStore.data;
  },

  getRawCanvas: function(){
    return React.findDOMNode(this);
  },

  getContext: function(){
    return this.getRawCanvas().getContext('2d');
  },

  componentDidMount: function() {
    GraphicStore.listener.addListener('change', this._onChange);
    this.paint(this.state, this.getContext());
  },

  componentWillUnmount: function() {
    GraphicStore.listener.removeListener('change', this._onChange);
  },

  componentDidUpdate: function() {
    this.paint(this.state, this.getContext());
  },

  _onChange: function() {
    this.replaceState(GraphicStore.data);
  },

  paint: function(data, context){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    
    context.lineJoin = "round";

    for(var i=0; i < data.clickX.length; i++)
    {   
      context.beginPath();

      if(data.clickDrag[i] && i){
        context.moveTo(data.clickX[i-1], data.clickY[i-1]);
      }else{
        context.moveTo(data.clickX[i]-1, data.clickY[i]);
      }

      context.lineTo(data.clickX[i], data.clickY[i]);
      context.closePath();
      context.strokeStyle = data.clickColor[i];
      context.lineWidth = data.clickSize[i];
      context.stroke();
    }

    if(data.currentTool == Tools.crayon) {
      context.globalAlpha = 0.4;
      context.drawImage(Textures.crayon, 0, 0, context.canvas.width, context.canvas.height);
    }
    
    context.globalAlpha = 1;
    context.restore();
  },

  onMouseDownHandler: function(event){
    let canvas = this.getRawCanvas();
    let mouseX = event.pageX - canvas.offsetLeft;
    let mouseY = event.pageY - canvas.offsetTop;

    GraphicActions.startPainting();
    GraphicActions.addPoint({ x: mouseX, y: mouseY, dragging: false });  
  },

  onMouseMoveHandler: function(event){
    let canvas = this.getRawCanvas();
    let mouseX = event.pageX - canvas.offsetLeft;
    let mouseY = event.pageY - canvas.offsetTop;

    if(GraphicStore.data.paint){
      GraphicActions.addPoint({ x: mouseX, y: mouseY, dragging: true });       
    }
  },

  onMouseUpHandler: function(event){
    GraphicActions.stopPainting();
  },

  onMouseLeaveHandler: function(event){
    GraphicActions.stopPainting();
  },

  render: function () {
    return (
      <canvas 
        className="drawingArea" 
        width={800} 
        height={600} 
        onMouseMove={this.onMouseMoveHandler} 
        onMouseDown={this.onMouseDownHandler} 
        onMouseUp={this.onMouseUpHandler} 
        onMouseLeave={this.onMouseLeaveHandler}>
      </canvas>
    );
  }
});


export default Graphic;
