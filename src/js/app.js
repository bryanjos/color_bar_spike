import App from "./components/app";
import Dispatcher from "./dispatcher";

function main(){
  window.App = {
    Dispatcher: Dispatcher
  }

  App.start();
}


main();