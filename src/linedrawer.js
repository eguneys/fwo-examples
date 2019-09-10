export default function lineDrawer() {

  let lines2d = [];

  this.paths = () => lines2d.map(({ lines, color }) => {
    let path = new Path2D();

    for (let { x0, y0, x1, y1 } of lines) {
      path.moveTo(x0, y0);
      path.lineTo(x1, y1);
    }
    return {
      path,
      color };
  });

  this.pushGeometryWithIndices = ({ vertices, indices }, color) => {

    let lines = [];
    for (let [i0, i1] of indices) {
      let vertex0 = vertices[i0],
          vertex1 = vertices[i1];

      lines.push({
          x0: vertex0[0],
          y0: vertex0[1],
          x1: vertex1[0],
          y1: vertex1[1]
      });
    }
    lines2d.push({
      color,
      lines
    });
    
  };

  this.pushGeometryWithNormals = ({ vertices, normals }, width, color) => {
    for (let i in vertices) {
      let vertex = vertices[i],
          normal = normals[i],
          vertex2 = sum2(vertex, scale(normal, width));

      lines2d.push({
        color,
        line: {
          x0: vertex[0],
          y0: vertex[1],
          x1: vertex2[0],
          y1: vertex2[1]
        }});
      
    }
  };
}
