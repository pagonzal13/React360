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
  r360.compositor.setBackground(r360.getAssetURL(''));
}

window.React360 = {init};
