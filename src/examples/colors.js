import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';

import makeNoise from '../fwo/noise';

// ktylerxhobbs.com/essays/2016/working-with-color-in-generative-art
export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  const noise = makeNoise();

  const colour = new co.shifter(co.Palette.CelGreen)
        .lum(0.3)
        .base();

  this.init = () => {
    r.drawMesh(clear(colour
                     .reset()
                     .css()));

    r.drawMesh(gradient());

    let n = 40;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        let ny = noise(y),
            nx = noise(x),
            nR = noise(x + y);

        let radius = 10 + nR * 20;

        let phase = y % 2;

        let pos = [(nx + x + phase * 0.5) * 40,
                   (ny + y) * 40];

        let blueHue = u.rand(180, 220);

        r.raw(fillStyle(colour
                        .reset()
                        // .hue(u.map(ny, 0.3, 1, 0.3, 0.6))
                        //.hsl(pickColorBasedOnY(y, n))
                        //.hsl(pickColorPalette(radius < 20))
                        .hsl(pickColorBluerTop(y, n))
                        .css()));



        r.drawMesh(circle(pos, radius));
      }
    }
  };

  this.update = delta => {
    

  };

  const gradient = () => ctx => {
    for (let y = 0; y < height; y+=5) {

      fillStyle(colour
                .reset()
                .hsl(pickColorBasedOnY(y, height))
                .css())(ctx);

      ctx.fillRect(0, y, width, 5);

    }
  };

  const pickColorBasedOnY = (y, maxY) => {

    let hue = u.map(u.rand(y, y+100), 0, maxY, 180, 220);
    let hsb = [hue, 90, 80];

    return co.normalizeHsb(hsb);
  };

  const pickColorPalette = p => {
    let pick = p ? u.weightedChoice([
      [[0, 0, 100], 0.7],
      [[54, 90, 95], 0.2],
      [[0, 80, 80], 0.1]
    ]): u.weightedChoice([
      [[0, 0, 100], 0.7],
      [[220, 50, 50], 0.2],
      [[120, 50, 80], 0.1]
    ]);

    return co.normalizeHsb(pick);
  };

  const pickColorBluerTop = (y, maxY) => {
    let blueOdds = u.map(y, 0, maxY, 0.3, 0.0),
        redOdds = 0.3 - blueOdds;

    let pick = u.weightedChoice([
      [[0, 0, 100], 0.70],
      [[220, 50, 50], blueOdds],
      [[0, 80, 80], redOdds]
    ]);

    return co.normalizeHsb(pick);
  };

  const fillStyle = color => ctx => {
    ctx.fillStyle = color;
  };

  const circle = (pos, radius) => ctx => {

    ctx.beginPath();
    ctx.arc(pos[0], pos[1], radius, 0, u.TAU);
    ctx.fill();
    
  };

  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
