import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';

import { vec2, distance } from '../fwo/vector';

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

    fillPacking();

    //fillPoly();

  };


  this.update = delta => {
    r.drawMesh(clear());

    for (let {x, y, radius, color} of circles) {
      r.drawMesh(circle(x, y, radius, color));
    }
  };

  const fillPoly = () => {

  };

  const fillPacking = () => {
    let sizes = [3, 5, 10, 20, 40, 80, 100, 120],
        amounts  = [200, 200, 60, 40, 16, 8, 4, 2];

    for (let i = sizes.length- 1; i >= 0; i--) {
      let radius = sizes[i];
      let amount = amounts[i];
      for (let j = 0; j < amount; j++) {
        let c = packRandom(radius, 50);
        if (c === null) {
          continue;
        } else {
          let color = colour
              .reset()
              .hsb(pickHsb(radius < 40))
              .css();

          circles.push({ ...c,
                         color });
        }
      }
    }
  };

  const pickHsb = (p) => {
    return u.weightedChoice([
      [[u.rand(80, 120), 50, 80], 0.7],
      [[u.rand(120, 180), 50, 50], 0.2],
      [[u.rand(140, 160), 50, 30], 0.1]
    ]);
  };

  const packRandom = (radius, failAt) => {
    while (failAt-- > 0) {
      let candidate = chooseRandom(radius);

      if (canFit(candidate)) {
        return candidate;
      }
    }

    return null;
  };

  const canFit = (circle) => {
    function overlap(c1, c2) {
      let p1 = vec2(c1.x, c1.y),
          p2 = vec2(c2.x, c2.y);

      return distance(p1, p2) < c1.radius + c2.radius;
    }

    return !circles.some(c2 =>
      overlap(c2, circle)
    );
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
  
