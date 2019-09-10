import Graphics from './graphics';
import * as mat4 from './matrix';

export default function renderer(gl, camera) {
  
  const g = new Graphics(gl);

  let transforms = {};

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

  this.drawMesh = (f, transform = {}) => {

    const uMatrix = mvpMatrix(modelMatrix(transform));

    g.draw(f, {
      translate: [uMatrix[12], uMatrix[13]]
    });
  };

  this.transformGeometry = ({ vertices, normals }, transform = {}) => {
    const uMatrix = mvpMatrix(modelMatrix(transform));

    vertices = vertices.map(vertex => {
      let res = mat4.mulVec(uMatrix, [...vertex, 0.0, 1.0]);
      return [res[0], res[1]];
    });

    normals = normals.map(vertex => {
      let res = mat4.mulVec(uMatrix, [...vertex, 0.0, 1.0]);
      return [res[0], res[1]];
    });

    return { vertices, normals };
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
