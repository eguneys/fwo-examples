import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as v from '../fwo/vector';
import makeNoise from '../fwo/noise';

import * as co from 'colourz';
import lineDrawer from '../linedrawer';

// https://www.reddit.com/r/proceduralgeneration/comments/cml32g/perlin_noise_based_wobbly_lines_with_color/
export default function wobblyLines(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);

  const colour = new co.shifter();

  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  let lines2d = new lineDrawer();

  this.init = () => {
    r.drawMesh(clear());

    let noise = new makeNoise();

    let color = colour;
    let n = 100;
    for (let i = 0; i< n; i++) {
      let y = i * (height / n);
      let geometry = geoLine(0, y, width, y);

      let vertices = geometry.vertices.map(([x0, y0]) => {
        let offset = height * 0.8;
        let yNoise = noise(x0 * 0.004, x0 * 0.002) * offset - offset * 0.5;
        return [x0, y0 + yNoise];
      });

      let noisy = {
        ...geometry,
        vertices
      };

      lines2d.pushGeometryWithIndices(
        noisy, color
          .hsb([u.rand(0, 100), 50, 50])
          .css());
    }

  };

  const geoLine = (x0, y0, x1, y1, segments = 100) => {
    let vertices = [],
        indices = [];

    let v0 = v.vec2(x0, y0),
        v1 = v.vec2(x1, y1);

    let diff = v.sub2(v1, v0);
    let step = v.magnitude(diff) / segments,
        vStep = v.scale(v.normalize(diff), step);

    let vi = v0;

    vertices.push(vi);

    for (let i = 0; i < segments; i++) {
      vi = v.sum2(vi, vStep);
      vertices.push(vi);
      indices.push([i, i + 1]);
    }


    return { vertices, indices };
  };


  this.update = delta => {

    r.drawMesh(ctx => {
      ctx.lineWidth = 10;
      for (let { path, color } of lines2d.paths()) {
        ctx.strokeStyle = color;
        ctx.stroke(path);
      }
    });
    
  };

  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
