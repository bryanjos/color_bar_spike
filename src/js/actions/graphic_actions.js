let GraphicsActions = { 
  startPainting: function () { 
    window.App.Dispatcher.startPainting(); 
  },
  stopPainting: function () { 
    window.App.Dispatcher.stopPainting(); 
  },
  addPoint: function (data) { 
    window.App.Dispatcher.addPoint(data); 
  },
};

export default GraphicsActions;