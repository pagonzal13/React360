import {Module} from 'react-360-web';

export default class ConexionModule extends Module {
  constructor() {
    super('ConexionModule'); // Makes this module available at NativeModules.MyModule
  }

  // This method will be exposed to the React app
  conexionIframe() {
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
      console.log(event);
      var winSource = event.source;
      if(event.data.conexion){winSource.postMessage("Conexión establecida correctamente", event.origin);}
      else if(event.data.imagenBack){
        winSource.postMessage("Imagen Back recibida correctamente", event.origin);
        console.log(event.data);
      }else{console.log("iframe: No ha llegado una data reconocible");}
    }
  }
}