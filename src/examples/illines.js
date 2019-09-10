import * as u from '../fwo/util';

import Camera from '../fwo/camera';

import * as co from 'colourz';

import { normalize, scale, sub2, sum2, vec2 } from '../fwo/vector';

export default function lili(state, makeR) {

  const { width, height } = state.canvas;

  const camera = new Camera({ fov: u.rad(90) });
  camera.pos = [0, 0, 10];

  const r = makeR(camera);


  r.makeTransform('center', {
    translate: [width * 0.5, height * 0.5, 0]
  });

  let tick = 0;

  let lines2d = [];

  const colour = new co.shifter(co.Palette.Blue);

  this.init = () => {

    lines2d = [];

    pushRotatingCircles();
  };


  this.update = delta => {
    r.drawMesh(clear());

    for (let { x0, y0, x1, y1, color, lineWidth } of lines2d) {
      r.strokeStyle(color, lineWidth);
      r.drawMesh(lineSegment(x0, y0, x1, y1), { transform: 'center' });
    }
  };

  const pushRotatingCircles = () => {
    let color = colour;

    for (let i = 0; i < 10; i++) {
      let radius = 30 + i * 2 * 10;
      let geometry = geoCircle(0, 0,
                               radius,
                               radius * u.rand(0.8, 1.4));

      
      geometry = r.transformGeometry(geometry, {
        rotate: [u.PI*u.rand(0.0, 1.0), u.PI*u.rand(0.0, 1.0), u.PI* u.rand(0.0, 1.0)]
      });

      pushGeometry(
        geometry,
        u.rand(10, 30),
        color
          .hsb([u.rand(200, 360), 100, 60])
          .css(),
        u.rand(1, 4));
    }
  };

  const pushGeometry = ({ vertices, normals }, width, color, lineWidth) => {
    for (let i in vertices) {
      let vertex = vertices[i],
          normal = normals[i],
          vertex2 = sum2(vertex, scale(normal, width));

      lines2d.push({
        x0: vertex[0],
        y0: vertex[1],
        x1: vertex2[0],
        y1: vertex2[1],
        lineWidth,
        color
      });
      
    }
  };

  const geoCircle = (cx, cy, radius, segments=200) => {
    let vertices = [],
        normals = [];

    for (let angle = 0; angle < u.TAU; angle+= u.PI/segments) {
      let p1 = sum2(vec2(cx, cy),
                        pointInCircle(angle, radius));
      let p2 = sum2(vec2(cx, cy),
                          pointInCircle(angle, radius + 2));

      let n1 = normalize(sub2(p2, p1));

      vertices.push(p1);
      normals.push(n1);
    }


    return { vertices, normals };
  };

  const pointInCircle = (angle, radius) => {
    return vec2(Math.cos(angle) * radius,
                Math.sin(angle) * radius);
  };

  const lineSegment = (x0, y0, x1, y1) => ctx => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };


  const clear = (color = '#cccccc') => ctx => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  };
}
