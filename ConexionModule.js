import {Module} from 'react-360-web';

export default class ConexionModule extends Module {
  constructor(ctx) {
    super('ConexionModule'); // Makes this module available at NativeModules.MyModule
    this._rnctx = ctx;
  }

  // This method will be exposed to the React app

    conexionIframe(cb) {
      const result = new Promise((resolve, reject) => {
        window.addEventListener("message",  function(event) {
          //console.log(event);
          var winSource = event.source;
          if(event.data.audioBack){
            //console.log("(iframe) ha llegado esto: " + event.data.audioBack);
            winSource.postMessage("Estado audio recibido correctamente", event.origin);
          }
          if(event.data.imagenBack){
            //console.log("(iframe) ha llegado esto: " + event.data.imagenBack);
            winSource.postMessage("Imagen Back recibida correctamente", event.origin);
          }
        
          resolve(event.data);
        }),
        function e(){console.log("Problemas con la promesa");}; 
      });
      result.then(datos => {
        //console.log(datos);
        if (this._rnctx) {
          this._rnctx.invokeCallback(cb, [datos]);
        }
      });
  } 
}