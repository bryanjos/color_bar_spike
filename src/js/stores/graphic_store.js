import Immutable from "immutable";
import DeLorean from 'delorean';

import Colors from "../values/colors";
import Sizes from "../values/sizes";
import Tools from "../values/tools";
import Textures from "../values/textures";

let GraphicStore = DeLorean.Flux.createStore({ 
  data: {
    paint: false,
    clickX: [],
    clickY: [],
    clickDrag: [],
    clickColor: [],
    clickSize: [],
    clickTool: [],
    currentColor: Colors.black,
    currentSize: Sizes.small,
    currentTool: Tools.marker   
  },

  startPainting: function () { 
    this.data.paint = true;
    this.emit('change'); 
  }, 

  stopPainting: function () { 
    this.data.paint = false;
    this.emit('change'); 
  }, 

  addPoint: function({x, y, dragging}) {
    this.data.clickX.push(x);
    this.data.clickY.push(y);
    this.data.clickDrag.push(dragging);
    this.data.clickSize.push(this.data.currentSize);

    if(this.data.currentTool == Tools.eraser){
      this.data.clickColor.push(Colors.white);
    }else{
      this.data.clickColor.push(this.data.currentColor);
    }

    this.emit('change'); 
  },

  actions: { 
    'startPainting': 'startPainting',
    'stopPainting': 'stopPainting',
    'addPoint': 'addPoint' 
  }

}); 


export default GraphicStore;
