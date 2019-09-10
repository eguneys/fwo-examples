import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import { vec2 } from '../fwo/vector';

import makeNoise from '../fwo/noise';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 1];

  const r = makeR(camera);


  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  const noise = makeNoise();

  this.update = delta => {

    tick += delta * 0.01;

    let t1 = tick * 0.1;
    t1 = 0;

    r.drawMesh(clear('#333'));

    r.raw(ctx => {
      ctx.strokeStyle = '#fff';
    });

    for (let i = 0; i < 200; i++) {
      r.drawMesh(allegory(t1, i), {
        transform: 'center'
      });
    }
      
  };


  let cPoints = [];
  let n = 100;
  for (let i = 0; i < n; i++) {
    cPoints.push(u.TAU * (i / n));
  }
  const allegory = (t1, frameCount) => ctx => {

    let gap = 4.0;
    let minR = width * 0.03;

    ctx.beginPath();


    let a = cPoints[0];
    n = u.map(noise(a * 0.2), 0, 1, 1, 2);
    let [x0, y0] = circlePoint(n * (minR + frameCount * gap), a);

    ctx.moveTo(x0, y0);

    for (let i = 1; i < cPoints.length; i++) {
      a = cPoints[i];
      n = u.map(noise(a), 0, 1, 1, 2);
      let [x3, y3] = circlePoint(n * (minR + frameCount * gap), a);
      ctx.lineTo(x3, y3);
    }

    ctx.lineTo(x0, y0);

    ctx.stroke();
  };

  const circlePoint = (radius, angle) => {
    return vec2(Math.cos(angle) * radius,
                Math.sin(angle) * radius);
  };

  const circle = (frameCount) => ctx => {

    let minR = width * 0.01;

    ctx.beginPath();
    ctx.arc(0, 0, (minR + frameCount) * 10, 0, u.TAU);
    ctx.stroke();
    
  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
