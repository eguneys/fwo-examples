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

  let tick = 0;

  this.init = () => {
    r.drawMesh(clear());

    r.drawMesh(layering());


  };


  this.update = delta => {

    r.clear(colour.hsb([0, 50, 90]).abgr());


    r.sandStroke(0, 0, width*0.5, height*0.5,
                 0.5,
                 colour
                 .hsb([100, 50, 50])
                 .abgr());

    r.render();
  };

  const layering = () => ctx => {

    
    

  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}