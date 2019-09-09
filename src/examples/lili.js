import * as u from '../fwo/util';

import Camera from '../fwo/camera';
import { vec2, sub2, sum2 } from '../fwo/vector';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(85) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  r.makeTransform('lilies', {
    translate: [width * 0.1, height * 0.5, 0]
  });

  let tick = 0;

  this.update = delta => {

    tick += delta * 0.01;

    r.drawMesh(clear);

    for (let i = 0; i < 5; i++) {
      let depth = u.usin(tick + i) * 5;
      let pos = [i * 10 * 2 * 5, 0];

      r.drawMesh(renderLili2(pos, 10, depth));
    }
  };


  const clear = ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(0, 0, width, height);
  };

  const ds = (angle, radius = 2, color = '#000000') => ctx => {

    let xOffset = Math.cos(angle) * radius,
        yOffset = Math.sin(angle) * radius;

    if (radius > 0) {
      ctx.filter = `drop-shadow(${xOffset}px ${yOffset}px ${radius}px ${color})`;
    } else {
      ctx.filter = `none`;
    }
  };

  const renderLili2 = (pos, radius, depth) => ctx => {
    for (let i = 0; i < 5; i++) {
      r.raw(ds(0, i < depth ? depth/5 * 2:0));

      r.drawMesh(renderLili(pos, (5 - i) * radius), {
        transform: 'lilies'
      });
    }
  };

  const renderLili = ([x, y],
                      radius = 5,
                      color = '#ff0000') => ctx => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, u.TAU);
    ctx.fill();
  };

}
