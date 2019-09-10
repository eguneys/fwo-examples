import * as u from '../fwo/util';

import * as co from 'colourz';

import Camera from '../fwo/camera';


// https://tylerxhobbs.com/essays/2015/creating-soft-textures-generatively
export default function softTextures(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);

  const colour = new co.shifter(co.Palette.Blue);

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  this.init = () => {
    r.drawMesh(clear());

    r.fillStyle(colour
                .reset()
                .hsb([200, 0, 10])
                .alp(0.1)
                .css());

    let minWidth = width * 0.3;
    // r.drawMesh(layers(minWidth));


    // r.drawMesh(layersSimple(minWidth));


    // r.drawMesh(aThousandAndStroke(horizLines(minWidth)));
    //r.drawMesh(aThousandAndStroke(vertLines(minWidth), 80));

    //r.drawMesh(aThousandAndStroke(anyLines(minWidth, width * 0.5), 220));

    r.drawMesh(aThousandAndStroke(anyLinesCluster(minWidth, width * 0.5), 120));
  };

  this.update = delta => {};

  const anyLinesCluster = (minWidth, spread = 200) => i => ctx => {
    
    let topX = minWidth + u.rand(0, spread),
        botX = minWidth + u.rand(0, spread),
        meanStartY = u.rand(0, height),
        meanEndY = u.rand(0, height);

    for (let i = 0; i < 8; i++) {
      ctx.moveTo(u.rand(topX, topX + 15), u.rand(meanStartY, meanStartY + 15));
      ctx.lineTo(u.rand(botX, botX + 15), u.rand(meanEndY, meanEndY + 15));
    }
    
  };

  const anyLines = (minWidth, spread = 200) => i => ctx => {

    let topX = minWidth + u.rand(0, spread),
        botX = minWidth + u.rand(0, spread);

    ctx.moveTo(topX, u.arand([0, height]));
    ctx.lineTo(botX, u.arand([0, height]));

  };

  const vertLines = minWidth => i => ctx => {
    let x = minWidth + u.rand(0, 200);

    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  };


  const horizLines = minWidth => i => ctx => {
    let startX = minWidth,
        endX = minWidth + u.rand(0, 60),
        y = u.rand(0, height);

    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
  };

  const aThousandAndStroke = (f, n = 1000) => ctx => {
    ctx.strokeStyle = colour
      .reset()
      .hsb([0, 0, 10])
      .alp(1.0)
      .css();

    for (let i = 0; i < n; i++) {
      f(i)(ctx);
    }
    ctx.stroke();    
  };


  const layersSimple = (minWidth) => ctx => {

    for (let i = 0; i < 20; i++) {
      
      let topWidth = minWidth + u.rand(0, 200),
          botWidth = minWidth + u.rand(0, 200);

      ctx.beginPath();

      ctx.moveTo(0, 0);
      ctx.lineTo(0 + topWidth, 0);
      ctx.lineTo(0 + botWidth, height);
      ctx.lineTo(0, height);
      ctx.fill();

    }
    
  };

  const layers = (minWidth) => ctx => {
    for (let i = 0; i < 100; i++) {
      let actualWidth = minWidth + u.rand(0, 200);
      ctx.fillRect(0, 0, actualWidth, height);
    }
  };

  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };


}
