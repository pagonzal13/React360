// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {Math as VRMath, ReactInstance, Surface} from 'react-360-web';
import ConexionModule from './ConexionModule';

const myFlatSurface = new Surface(
  700, /* width */
  400, /* height */
  Surface.SurfaceShape.Flat /* shape */
);
myFlatSurface.setAngle( 
  -Math.PI / 2, /* horiz angle */
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

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Ediphy360', { /* initial props */ }),
    r360.getDefaultSurface()
  );
  r360.renderToSurface(
    r360.createRoot('Proyector'),
    myFlatSurface,
  );
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
