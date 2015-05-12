import Colors from "./colors";
import Sizes from "./sizes";
import Tools from "./tools";
import Textures from "./textures";
import Immutable from "immutable";

let drawingArea = document.getElementById('drawingArea');
let drawingAreaContext = drawingArea.getContext("2d");

let states = Immutable.List.of();

let state = Immutable.Map({
  paint: false,
  clickX: Immutable.List.of(),
  clickY: Immutable.List.of(),
  clickDrag: Immutable.List.of(),
  clickColor: Immutable.List.of(),
  clickSize: Immutable.List.of(),
  clickTool: Immutable.List.of(),
  currentColor: Colors.black,
  currentSize: Sizes.small,
  currentTool: Tools.marker
});

function main(){
  drawingArea.addEventListener("mousedown", onMouseDownHandler);
  drawingArea.addEventListener("mousemove", onMouseMoveHandler);
  drawingArea.addEventListener("mouseup", onMouseUpHandler);
  drawingArea.addEventListener("mouseleave", onMouseLeaveHandler);
}

function onMouseDownHandler(event){
  var mouseX = event.pageX - this.offsetLeft;
  var mouseY = event.pageY - this.offsetTop;

  state = state.set('paint', true);

  addClick(mouseX, mouseY);
  redraw(drawingAreaContext);   
}

function onMouseMoveHandler(event){
  var mouseX = event.pageX - this.offsetLeft;
  var mouseY = event.pageY - this.offsetTop;

  if(state.get('paint')){
    addClick(mouseX, mouseY, true);
    redraw(drawingAreaContext);
  }
}

function onMouseUpHandler(event){
  state = state.set('paint', false);
  states = states.push(state);
}

function onMouseLeaveHandler(event){
  state = state.set('paint', false);
  states = states.push(state);
}

function addClick (x, y, dragging = false) {
  state = state.set('clickX', state.get('clickX').push(x));
  state = state.set('clickY', state.get('clickY').push(y));
  state = state.set('clickDrag', state.get('clickDrag').push(dragging));
  state = state.set('clickSize', state.get('clickSize').push(state.get('currentSize')));

  if(state.get('currentTool') == Tools.eraser){
    state = state.set('clickColor', state.get('clickColor').push(Colors.white));
  }else{
    state = state.set('clickColor', state.get('clickColor').push(state.get('currentColor')));
  }
}

function redraw(context){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
  context.lineJoin = "round";
      
  for(var i = 0; i < state.get('clickX').size; i++) {    
    context.beginPath();

    if(state.get('clickDrag').get(i) && i){
      context.moveTo(state.get('clickX').get(i-1), state.get('clickY').get(i-1));
    }else{
      context.moveTo(state.get('clickX').get(i)-1, state.get('clickY').get(i));
    }

    context.lineTo(state.get('clickX').get(i), state.get('clickY').get(i));

    context.closePath();
    context.strokeStyle = state.get('clickColor').get('i');
    context.lineWidth = state.get('clickSize').get('i');
    context.stroke();
  }

  if(state.get('currentTool') == Tools.crayon) {
    context.globalAlpha = 0.4;
    context.drawImage(Textures.crayon, 0, 0, context.canvas.width, context.canvas.height);
  }
  
  context.globalAlpha = 1;
}

main();