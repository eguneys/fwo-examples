import * as u from '../fwo/util';
import { vec2 } from '../fwo/vector';

import Camera from '../fwo/camera';

import * as co from 'colourz';

export default function chroma(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(85) });
  camera.pos = [0, 0, 1];

  const r = makeR(camera);

  const col = new co.shifter(co.Palette.Blue)
        .lum(0.0)
        .base();

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  r.makeTransform('lines', {
    translate: [width * 0.05, height * 0.1, 0]
  });

  let tick = 0;

  this.update = delta => {

    r.drawMesh(clear());

    let n = 40;
    for (let i = 0; i < n; i++) {
      let w = width * 0.90 / n,
          h = height * 0.8;
      r.drawMesh(coLine(col, i * w, w, h, i, n), {
        transform: 'lines'
      });
    }

  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };

  const coLine = (col, x, width, height, phase, phaseN) => ctx => {

    let n = 20;
    let w = width,
        h = height / n;

    for (let i = 0; i < n; i++) {
      let pos = vec2(x, (shiftNoise(phase, phaseN) + i) % n * h);
      let color = col.reset();


      if (i < 3) {
        color = color.lum(u.smoothstep(0, 4, i) * 0.2 + 0.1);
      }

      if (i >= 3 && i <= n - 6) {
        let ii = i + 6;
        color = color
          .hue((ii / n) * 0.2 + 0.4)
          .lum(ii / n);

      }

      if (i > n - 6) {
        color = color
          .lum(8 * 0.06)
          .hue((n - i - 2) * 0.05);
      }

      if (i >= n - 1) {
        color = color.lum(0.24);
      }

      fr(color.css(), pos, w, h)(ctx);
    }

  };

  const fr = (color, [x, y], w = 10, h = w) => ctx => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w + 1, h + 1);
  };
}

function shiftNoise(i, n) {
  let v = u.smoothstep(4, n - 5, i) * n;

  if (v > 0 && v < n) {
    v = interpolate(0, n * 0.16, v * 0.2 + 0.2 * u.usin(v * u.usin(v)));
  }

  return Math.floor(v);
}

function interpolate(pa, pb, px){
  // return  pa * (1 - px) + pb * px;
  var ft = px * Math.PI,
      f = (1 - Math.cos(ft)) * 0.5;
  return pa * (1 - f) + pb * f;
}
