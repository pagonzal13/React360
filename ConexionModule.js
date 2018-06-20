import {Module} from 'react-360-web';

export default class ConexionModule extends Module {
  constructor(ctx) {
    super('ConexionModule'); // Makes this module available at NativeModules.MyModule
    this._rnctx = ctx;
    this.winSource = undefined;
    this.origin = undefined;
    this.handleMark = this.handleMark.bind(this);
  }

    conexionIframe(cb) {
      const result = new Promise((resolve, reject) => {
        window.addEventListener("message",  function(event) {
          //console.log(event);
          this.winSource = event.source;
          this.origin = event.origin;
          console.log(event.source, event.origin)
          if(event.data.audioBack){
            //console.log("(iframe) ha llegado esto: " + event.data.audioBack);
            this.winSource.postMessage(JSON.stringify({msg:"Estado audio recibido correctamente"}), this.origin);
          }
          if(event.data.urlBack){
             //console.log("(iframe) ha llegado esto: " + event.data.urlBack);
             this.winSource.postMessage(JSON.stringify({msg:"Url Back recibida correctamente"}), this.origin);
          }
          if(event.data.imagenBack){
            //console.log("(iframe) ha llegado esto: " + event.data.imagenBack);
            this.winSource.postMessage(JSON.stringify({msg:"Imagen Back recibida correctamente"}), this.origin);
          }
          if(event.data.urlPanel){
            //console.log("(iframe) ha llegado esto: " + event.data.urlPanel);
            this.winSource.postMessage(JSON.stringify({msg:"Url Panel recibida correctamente"}), this.origin);
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
        let query = decodeURIComponent(window.location.search);
        try{
          let myurl = query.split("?id=");
          var sinNomId = myurl[1];
          var sinNomVisor = sinNomId.split("&visor=");
          var id = sinNomVisor[0];
          
          window.parent.postMessage(JSON.stringify({msg: 'LOAD', id: id}),"*")
        }catch(e){//console.log("No hay query");
      }
        
    }
    enVisor (cb){
      let query = decodeURIComponent(window.location.search);
      try{
        let myurl = query.split("?id=");
        var sinNomId = myurl[1];
        var sinNomVisor = sinNomId.split("&visor=");
        var visor = sinNomVisor[1];

        if (this._rnctx) {
          this._rnctx.invokeCallback(cb, [visor]);
        }
      }catch(e){//console.log("No hay query");
    }
    }

    handleMark(mark, id){
      console.log(window.parent)
        window.parent.postMessage(JSON.stringify({msg:"MARK", id, mark}), "*");
    }
}
