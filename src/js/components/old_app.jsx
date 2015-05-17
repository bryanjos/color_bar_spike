import React from "react";
import Layout from "./layout"

let App = {
  start: function(){
    React.render(<Layout/>, document.getElementById("main"));
  }
}


export default App;