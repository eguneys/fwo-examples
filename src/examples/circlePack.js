import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  const colour = new co.shifter(co.Palette.Blue);

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  let circles = [];

  this.init = () => {

    let radius = 200;
    let c = packRandom(radius, 100);
    if (c !== null) {
      let color = colour
          .hsb([0, 0, 50])
          .css();

      circles.push({ ...c,
                     color });
    }

  };


  this.update = delta => {
    r.drawMesh(clear());

    for (let {x, y, radius, color} of circles) {
      r.drawMesh(circle(x, y, radius, color));
    }
  };

  const packRandom = (radius, failAt) => {
    while (failAt-- > 0) {
      let candidate = chooseRandom(radius);

      if (candidate) {
        return candidate;
      }
    }

    return null;
  };

  const chooseRandom = (radius) => {
    return {
      x: u.rand(0, width),
      y: u.rand(0, height),
      radius
    };
  };

  const circle = (x, y, radius, color) => ctx => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, u.TAU);
    ctx.fill();
  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
