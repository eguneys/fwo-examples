import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';


export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);

  let colour = new co.shifter();

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  this.init = () => {
    r.clear();
  };


  this.update = delta => {};

}
