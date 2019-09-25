import { objMap } from './util2';
import * as u from './util';
import Graphics from './graphics';
import * as mat4 from './matrix';
import * as v from './vector';
import Pixeler from './pixeler';

export default function renderer(gl, camera, width, height) {

  const g = new Graphics(gl);

  let transforms = {};

  this.pixeler = new Pixeler(g, width, height);

  this.raw = g.raw;

  this.fillStyle = color => {
    g.raw(ctx => {
      ctx.fillStyle = color;
    });
  };

  this.strokeStyle = (color, lineWidth = 1) => {
    g.raw(ctx => {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
    });
  };

  

  this.clear = (color = '#cccccc') => {
    g.raw(ctx => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    });
  };

  this.drawMesh = (f, transform = {}) => {

    const uMatrix = mvpMatrix(modelMatrix(transform));

    g.draw(f, {
      translate: [uMatrix[12], uMatrix[13]]
    });
  };


  this.drawElements = (faces, transform = {}) => {

    faces.forEach(({ vertices, color }) => {

      const uMatrix = mvpMatrix(modelMatrix(transform));

      vertices = vertices.map(vertex => {
        return mat4.mulVec(uMatrix, [...vertex, 1.0]);
      });

      let w = width * 0.5,
          h = height * 0.5;

      vertices = vertices.map(v => {
        return [w + (v[0]/v[2])*w,
                h + (v[1]/v[2])*h];
      });

      let verticesFirst = vertices[0],
          verticesRest = vertices
          .slice(1, vertices.length);
      
      g.draw(ctx => {
        ctx.fillStyle = color;
        ctx.beginPath();
        let v1 = verticesFirst;
        ctx.moveTo(v1[0], v1[1]);

        verticesRest
          .forEach(v => {
            ctx.lineTo(v[0], v[1]);
          });
        ctx.fill();
      }, {});
    });
  };

  this.makeTransform = (name, transform) => {
    transforms[name] = modelMatrix(transform);
  };

  const modelMatrix = transform => {
    let matrix = transforms[transform.transform] || mat4.identity();
    return mat4.transform(matrix, transform);
  };

  const mvpMatrix = modelMatrix => {
    const { pos: camPos, target, up } = camera;
    const { fov, aspect, near, far } = camera;

    let camMatrix = mat4.lookAt(camPos, target, up);
    let viewMatrix = mat4.inverse(camMatrix);
    
    let projectionMatrix = mat4.perspective(fov, aspect, near, far);

    let viewProjectionMatrix = mat4.multiply(projectionMatrix, viewMatrix);

    return mat4.multiply(viewProjectionMatrix, modelMatrix);
  };
}
