export function vec2(x, y) {
  return [x, y];
}

export function dot2(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

export function length(v1) {
  return Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
}

export function angle2(v1, v2) {
  return Math.acos(dot2(v1, v2) / length(v1) * length(v2));
}

export function scale(v, s) {
  return [v[0] * s, v[1] * s];
}

export function sum2(v1, v2) {
  return vec2(v1[0] + v2[0],
              v1[1] + v2[1]);
}

export function sub2(v1, v2) {
  return sum2(v1, scale(v2, -1));
}
