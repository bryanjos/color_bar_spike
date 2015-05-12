import React from "react";
import Graphic from "./graphic"

let App = {
  start: function(){
    React.render(<Graphic/>, document.getElementById("main"));
  }
}


export default App;