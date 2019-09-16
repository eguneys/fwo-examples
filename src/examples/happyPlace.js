import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as v from '../fwo/vector';

import * as co from 'colourz';

import makeFN from '../friendlyNodes';




export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);

  let colour = new co.shifter();

  let fn = new makeFN(10, 500);

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  this.init = () => {};


  this.update = delta => {
    fn.update(delta);

    render();
  };

  const render = () => {
    r.clear(colour.hsb([0, 50, 90]).abgr());

    renderNodes();

    r.render();
  };

  const renderNodes = () => {
    let nodes = fn.nodes();

    nodes.forEach(({ pos, friends }, i) => {
      
      friends.forEach(friend => {
        // dont render same friend twice;
        if (friend < i) return;

        let fPos = nodes[friend].pos;

        pos = project(pos);
        fPos = project(fPos);

        pos = v.vecXY(pos);
        fPos = v.vecXY(fPos);

        r.sandStroke(pos.x, pos.y, fPos.x,
                     fPos.y,
                     2,
                     colour
                     .hsb([100, 50, 50])
                     .abgr());
      });
    });
  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };

  function project(v0) {
    return v.sum2(v0, [width*0.5, height*0.5]);
  }
}
