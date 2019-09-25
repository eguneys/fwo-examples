import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as v from '../fwo/vector';

import inp2 from '../fwo/interpolate';

import * as co from 'colourz';

import Ticker from '../ticker';


export default function mesh3d(state, makeR) {

  const { width, height, aspect } = state.canvas;

  const camera = new Camera({ aspect, fov: u.rad(60) });
  camera.pos = [0, 0, 800];

  const r = makeR(camera);

  let colour = new co.shifter();

  let tick = 0;

  let rects = [];

  this.init = () => {

    let geo = new GeometryFront();

    geo.face(new SlidingFace(StaticVerts(0, 0, width, height),
                             colour 
                             .hsb([200, 10, 50])
                             .css()));

    geo.face(new SlidingFace(SlidingVerts(width*0.25, height*0.25, width * 0.5, height * 0.5),
                             colour 
                             .hsb([200, 50, 50])
                             .css()));
    geo.face(new SlidingFace(SlidingVerts(-width*0.25, -height*0.25, width * 0.5, height * 0.5),
                             colour 
                             .hsb([100, 50, 50])
                             .css()));

    let aRect = new Mesh(geo);
    aRect.transform({
      translate: [0, 0, 0],
      rotate: [0, -u.PI * 0.0, 0]
    });

    rects.push(aRect);

    

  };


  let ticker = new Ticker();

  this.update = delta => {
    ticker.update(delta);
    
    // camera.pos[0] = Math.sin(ticker.value(0.1)) * 200;

    rects.forEach(_ => _.update(delta));

    r.drawMesh(clear());
    
    rects.forEach(_ => {
      r.drawElements(_.geometry(), _.transform());
    });
  };

  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}

function Mesh(geometry) {

  let transform = {};

  this.transform = (_transform) => {
    if (_transform)
      transform = _transform; 
    return transform;
  };

  this.geometry = () => geometry.faces();

  this.update = delta => {
    geometry.update(delta);
  };

}

function GeometryFront() {

  const faces = [];

  this.face = (face) => {
    face.init();

    faces.push(face);
  };

  this.faces = () =>
    faces.map(_ => ({
      vertices: _.vertices(),
      color: _.color()
    }));

  this.update = delta => {
    faces.forEach(_ => _.update(delta));
  };

}

function CenteredVert(verts, width, height) {
  return verts.map(vert => 
    v.sum3(vert, [-width*0.5, -height*0.5, 0]));
};

function SlidingVerts(x, y, width, height) {

  let baseVerts = CenteredVert([[x + width, y, 0],
                                [x + width, y + height, 0],
                                [x, y + height, 0],
                                [x, y, 0]], width, height);

  let targetVerts = CenteredVert([[x + width, y, 0],
                                  [x + width, y + height, 0],
                                  [x + width, y + height, 0],
                                  [x + width, y, 0]], width, height);

  return { baseVerts,
           targetVerts };
}

function StaticVerts(x, y, width, height) {
  let baseVerts = CenteredVert([[x + width, y, 0],
                               [x + width, y + height, 0],
                               [x, y + height, 0],
                                [x, y, 0]], width, height);

  let targetVerts = baseVerts;

  return {
    baseVerts,
    targetVerts
  };
}

function SlidingFace({ 
  baseVerts,
  targetVerts
}, baseColor) {

  let color = baseColor;

  let verts;

  this.init = () => {

    verts = targetVerts.map((tVert, i) =>
      new inp2(baseVerts[i], tVert));
  };

  this.vertices = () => verts.map(_ => _.value());
  this.color = () => color;

  this.update = delta => {
    verts.forEach(_ => _.update(delta * 0.01));
  };
}

function StaticFace(verts, color) {
  this.init = () => {};

  this.vertices = () => verts;
  this.color = () => color;

  this.update = delta => {};
}
