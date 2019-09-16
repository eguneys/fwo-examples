import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';

import makeTicker from '../ticker';

// http://www.complexification.net/gallery/machines/sandstroke/
export default function sandStroke(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);

  const pix = r.pixeler;

  let colour = new co.shifter();
  let ticker = new makeTicker();

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  this.init = () => {
    
  };

  this.update = delta => {

    ticker.update(delta);

    let tick = ticker.value(0.1);

    pix.clear(colour.hsb([0, 50, 90]).abgr());


    pix.sandStroke(0, 0, u.usin(tick) * width*0.5, height*0.5,
                 5,
                 colour
                 .hsb([100, 50, 50])
                   .abgr(),
                   u.usin(tick) * 900);

    pix.sandStroke(width * 0.1, height * 0.1,
                   u.usin(tick) * width * 0.8, height * 0.1,
                   5,
                   colour
                   .hsb([100, 50, 50])
                   .abgr());

    pix.sandStroke(width * 0.1, height * 0.8,
                   width * 0.8, height * 0.8,
                   5,
                   colour
                   .hsb([100, 50, 50])
                   .abgr(),
                   u.usin(tick) * 900);

    pix.sandRect(u.usin(tick) * 100, 1)
    (width*0.5, height*0.5, 200, 5, colour.abgr());
    //pix.rect(width * 0.5, height * 0.5, 200, 200, colour.abgr());

    pix.render();
  };

  const layering = () => ctx => {

    
    

  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
