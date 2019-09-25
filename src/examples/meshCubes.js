import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';

import * as v from '../fwo/vector';

import Ticker from '../ticker';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [400, 400, 400];

  const r = makeR(camera);

  let colour = new co.shifter();

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let rects = [];

  this.init = () => {

    for (let y = 0; y < 10; y++) {
      for (let i = 0; i < 10; i++) {
        let geo = new GeometryCube(60);
        let aRect = new Mesh(geo);
        aRect.transform({
          translate: [(10-i) * 60, 0, y * 60],
          rotate: [0, -u.PI * 0.0, 0]
        });

        rects.push(aRect);
      }
    }

  };

  let ticker = new Ticker();

  this.update = delta => {
    ticker.update(delta);

    camera.pos[0] = Math.sin(ticker.value(0.1)) * 400;
    camera.pos[1] = Math.sin(ticker.value(0.1)) * 400;

    r.clear();

    rects.forEach(_ => {
      r.drawElements(_.geometry(), _.transform());
    });
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

function GeometryCube(width, height = width, depth = width) {
  const faces = [];


  const verts = [[0, 0, 0],
                 [0, height, 0],
                 [width, height, 0],
                 [width, 0, 0],
                 [0, 0, depth],
                 [0, height, depth],
                 [width, height, depth],
                 [width, 0, depth]]
        .map(vert => 
          v.sum3(vert, [-width*0.5, -height*0.5, -depth*0.5]));

  const buildPlane = (indexes) => {
    return indexes.map(_ => verts[_]);
  };

  faces.push({ vertices: buildPlane([0, 1, 2, 3]),
               color: 'red' },
             {
               vertices: buildPlane([0, 4, 5, 1]),
               color: 'green'
             },
             {
               vertices: buildPlane([4,5,6,7]),
               color: 'blue'
             });

  this.faces = () => faces;
}
