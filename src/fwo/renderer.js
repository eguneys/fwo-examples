import * as u from './util';
import Graphics from './graphics';
import * as mat4 from './matrix';
import * as v from './vector';

export default function renderer(gl, camera, width, height) {
  
  const g = new Graphics(gl, width, height);

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



  this.render = () => {

    for (let i = 0; i < data.length; i++) {
      data[i] = ram[i];
    }

    imageData.data.set(buf8);
    
    g.raw(ctx => {
      // ctx.rotate(u.PI * 0.5);
      ctx.putImageData(imageData, 0, 0);
    });
  };

  this.clear = (color) => {
    ram.fill(color, 0, Pagesize);
  };

  this.pset = (x, y, color) => {

    x = u.clamp(x | 0, 0, width);
    y = u.clamp(y | 0, 0, height);
    ram[0 + y * width + x] = color;
  };

  this.line = (x0, y0, x1, y1, color) => {

    let v0 = v.vec2(x0, y0),
        v1 = v.vec2(x1, y1),
        d1 = v.sub2(v1, v0),
        step1 = v.normalize(d1);

    let steps = v.distance(v0, v1);

    let vi = v0;
    this.pset(vi[0], vi[1], color);

    for (let i = 0; i< steps; i++) {
      vi = v.sum2(vi, step1);
      this.pset(vi[0], vi[1], color);
    }
  };

  this.psand = (x0, y0, sdir, width, color) => {
    
    let v0 = v.vec2(x0, y0),
        v1 = v.sum2(v0, v.scale(sdir, width)),
        v2 = v.sum2(v0, v.scale(sdir, - width));

    this.line(v1[0], v1[1], v2[0], v2[1], color);

  };

  this.sandStroke = (x0, y0, x1, y1, width, color) => {

    let v0 = v.vec2(x0, y0),
        v1 = v.vec2(x1, y1),
        d1 = v.sub2(v1, v0),
        step1 = v.normalize(d1);

    let p1 = v.perpendicular(d1);

    let steps = v.distance(v0, v1);

    let vi = v0;
    this.psand(vi[0], vi[1], p1, width, color);

    for (let i = 0; i< steps; i++) {
      vi = v.sum2(vi, step1);
      this.psand(vi[0], vi[1], p1, width, color);
    }
  };


  const Pagesize = width * height;

  const imageData = g.raw(ctx => ctx.getImageData(0, 0, width, height));

  let buf = new ArrayBuffer(imageData.data.length);
  let buf8 = new Uint8ClampedArray(buf);
  let data = new Uint32Array(buf);

  let ram = new Uint32Array(Pagesize);
}
