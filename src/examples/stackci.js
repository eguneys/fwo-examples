import * as u from '../fwo/util';

import Camera from '../fwo/camera';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(85) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  r.makeTransform('lines', {
    translate: [width * 0.05, height * 0.1, 0]
  });

  let tick = 0;

  this.update = delta => {

    r.drawMesh(clear());

    r.raw(ctx => {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
    });


    let n = 8;
    let radius = 80;

    for (let i = 0; i < n; i++) {
      r.drawMesh(lineci(i * radius, radius, i), {
        transform: 'lines'
      });
    }

  };

  const lineci = (y, radius, phase) => ctx => {
    let phaseX = (phase % 2) * radius;
    for (let i = 0; i < 10; i++) {
      stackci([i * radius * 2.0 + phaseX, y], radius)(ctx);
    }
  };

  const stackci = (pos, radius) => ctx => {
    
    let n = 12;
    let stepRadius = radius / n;

    for (let i = 0; i <= n; i++) {
      circle(pos, (n - i) * stepRadius)(ctx);
    }

  };

  const circle = (pos, radius) => ctx => {

    ctx.beginPath();
    ctx.arc(pos[0], pos[1], radius, 0, u.TAU);
    ctx.stroke();
    ctx.fill();
  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
