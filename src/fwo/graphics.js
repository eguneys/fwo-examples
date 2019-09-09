export default function graphics(gl) {
  
  this.draw = (f, { translate, rotate, scale }) => 
  this.raw(ctx => {
    ctx.save();

    if (translate) {
      ctx.translate(translate[0], translate[1]);
    }

    f(ctx);

    ctx.restore();
  });

  this.raw = f => f(gl);

  this.ds = (angle, radius = 2, color = '#000') => 
  this.raw(ctx => {
    let xOffset = Math.cos(angle) * radius,
        yOffset = Math.sin(angle) * radius;

    ctx.filter = `drop-shadow(${xOffset}px ${yOffset}px ${radius}px ${color})`;

  });

}
