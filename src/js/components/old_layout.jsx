import React from "react"
import Graphic from "./graphic";

var Layout = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function () {
    return (
      <div>
          <div className="toolArea">
            <span className="toolTitle">Tools:</span>
            <button className="toolButton">Marker</button>
            <button className="toolButton">Eraser</button>
            <button className="toolButton">Crayon</button>
          </div>
          <div className="toolArea">
            <span className="toolTitle">Sizes:</span>
            <button className="toolButton">Small</button>
            <button className="toolButton">Medium</button>
            <button className="toolButton">Large</button>
          </div>
          <div className="toolArea">
            <span className="toolTitle">Colors:</span>
            <button className="toolButton">Black</button>
            <button className="toolButton">Purple</button>
            <button className="toolButton">Green</button>
          </div>
          <Graphic/>
      </div>
    );
  }
});

export default Layout