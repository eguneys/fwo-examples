import * as u from '../fwo/util';

import Camera from '../fwo/camera';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  this.init = () => {
    r.drawMesh(clear());

    r.drawMesh(layering());


  };


  this.update = delta => {};

  const layering = () => ctx => {

    
    

  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
