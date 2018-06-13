// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {Location, ReactInstance, Surface} from 'react-360-web';
import ConexionModule from './ConexionModule';

const leftPanel = new Surface(700, 400, Surface.SurfaceShape.Flat);
leftPanel.setAngle( 
  -1.4, /* horiz angle */
  0 /* vertical angle */
);

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      ctx => new ConexionModule(ctx),
    ],
    ...options,
  });

  r360.renderToSurface(
    r360.createRoot('Ediphy360', { /* initial props */ }),
    r360.getDefaultSurface()
  );
  r360.renderToSurface(
    r360.createRoot('Proyector'),
    leftPanel,
  );
  // Load the initial environment
  /*Esto es una prueba para hacer fetch con las imagenes.
  Quitarla de aquí y llevarmela al index o al Backgroud si quiero
  utilizar urls al tuntún (no desde flicker, que ya no tienen lo del cors)
  */
  /*fetch('http://blog.topazlabs.com/wp-content/uploads/2013/06/Screen-shot-2013-06-17-at-3.37.16-PM.png', {
    method: 'GET',
    mode: 'no-cors',
  }).then( function(response){
      //console.log(response);
      return response.blob();
    }).then(function(blob){
      //console.log(blob);
      var objectURL = URL.createObjectURL(blob);
      //console.log(objectURL);
      //r360.compositor.setBackground(objectURL);
    }
    );*/
  r360.compositor.setBackground('');

}

window.React360 = {init};
