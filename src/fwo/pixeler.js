import * as u from './util';
import * as v from './vector';
import * as co from '../fwo/colors';

export default function Pixeler(g, width, height) {

  const Pagesize = width * height;

  const imageData = g.raw(ctx => ctx.getImageData(0, 0, width, height));

  let buf = new ArrayBuffer(imageData.data.length);
  let buf8 = new Uint8ClampedArray(buf);
  let data = new Uint32Array(buf);

  let ram = new Uint32Array(Pagesize);


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

    let i = 0 + y * width + x;
    let src = ram[i];

    let dst = co.abgrToarr(color);
    src = co.abgrToarr(src);

    color = co.fromArrAbgr(co.blend(dst, src));

    ram[i] = color;
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

    color = co.alpAbgr(color, 255 - ((width/50) * 255));

    this.line(v1[0], v1[1], v2[0], v2[1], color);

  };

  const sandThicknesess = (() => {
    let currentValue = 0;
    const wobble = 20;
    const maxAmplitude = 50;
    let output = [];
    while (output.length < 900) {
      currentValue += -(wobble/2) + Math.random() * wobble;
      currentValue = Math.min(maxAmplitude, Math.max(currentValue, -maxAmplitude));
      output.push(Math.abs(currentValue));
    }
    return output;
  })();

  this.sandStroke = (x0, y0, x1, y1, width, color, phase = 0) => {

    phase = phase | 0;

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
      let si = Math.floor(phase + i * 0.5) % sandThicknesess.length;
      this.psand(vi[0], vi[1], p1, sandThicknesess[si], color);
    }
  };

  this.rect = rectWithLine(this.line);
  this.sandRect = (phase, gap) => rectWithLine((x0, y0, x1, y1, color) => {
    this.sandStroke(x0, y0, x1, y1, 0.5, color, y0 *gap + phase);
  }, gap);

  function rectWithLine(line, gap = 1) {
    return (x0, y0, w, h, color) => {
      let steps = h;

      for (let i = 0; i < steps; i++) {
        let yi = y0 + i * gap;

        let vi = v.vec2(x0, yi);
        let vi1 = v.vec2(x0 + w, yi);

        line(vi[0], vi[1], vi1[0], vi1[1], color, i);
      }
    };
  }
  
}
