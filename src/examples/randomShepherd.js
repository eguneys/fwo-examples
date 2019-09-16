import * as u from '../fwo/util';
import Camera from '../fwo/camera';
import * as v from '../fwo/vector';
import * as co from 'colourz';
import interpolator2 from '../fwo/interpolate';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  let lPoints = [];
  let colour = new co.shifter();

  this.init = () => {


    for (let i = 0; i < 50; i++) {
      lPoints.push({
        pos: new interpolator2([u.rand(0, width), height*0.5])
      });
    }
  };


  this.update = delta => {
    update(delta);
    render();
  };

  const update = (delta) => {

    lPoints
      .filter(({pos}) => pos.isSettled())
      .forEach(({pos}) => {
        let value = pos.value();
        pos.target(v.vec2(value[0],
                          value[1] + u.rand(-100, 100)));
      });

    lPoints.forEach(({ pos }) => pos.update(0.1));
  };

  const render = () => {
    r.drawMesh(clear());

    r.fillStyle(colour.hsb([200, 50, 50]).css());
    r.strokeStyle(colour.hsb([200, 50, 50]).css());

    let radius = 20;

    lPoints.map(({ pos }) => {
      let value = pos.value(),
          target = pos.target();
      r.drawMesh(ctx => {
        ctx.beginPath();
        circle(target[0], target[1], radius)(ctx);
        ctx.stroke();

        ctx.beginPath();
        circle(value[0], value[1], radius)(ctx);
        ctx.fill();
      });
    });
  };

  const circle = (x, y, radius) => ctx => {
    ctx.arc(x, y, radius, 0, u.TAU);
  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
