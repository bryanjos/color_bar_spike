import DeLorean from 'delorean';
import GraphicStore from './stores/graphic_store';

var Dispatcher = DeLorean.Flux.createDispatcher({
  startPainting: function(){
    this.dispatch('startPainting');
  },
  stopPainting: function(){
    this.dispatch('stopPainting');
  },
  addPoint: function(data){
    this.dispatch('addPoint', data);
  },
  getStores: function(){
    return { graphic: GraphicStore };
  }
})

export default Dispatcher;