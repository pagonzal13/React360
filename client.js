// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {Location, ReactInstance, Surface} from 'react-360-web';
import ConexionModule from './ConexionModule';

const leftPanel = new Surface(700, 600, Surface.SurfaceShape.Flat);

leftPanel.setAngle(
  -1.4, /* horiz angle */
  0 /* vertical angle */
);

const centerPanel = new Surface(600, 300, Surface.SurfaceShape.Cylinder);

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
    r360.createRoot('PopUpFail', { /* initial props */ }),
    centerPanel,
  );
  r360.renderToLocation(
    r360.createRoot('Marks'),
    r360.getDefaultLocation(),
  );
  const sup = r360.getDefaultSurface();
  sup.setShape(Surface.SurfaceShape.Flat);
  sup.resize(200, 90);
  sup.setAngle(0, -0.4);
  r360.renderToSurface(
    r360.createRoot('Ediphy360', { /* initial props */ }),
    sup
  );
  r360.renderToSurface(
    r360.createRoot('Proyector'),
    leftPanel,
  );
  r360.compositor.setBackground('./static_assets/360_world.jpg');

}

window.React360 = {init};
