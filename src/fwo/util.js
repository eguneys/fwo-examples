export const PI = Math.PI;
export const TAU = PI * 2.0;

export function rad(degree) {
  return degree * Math.PI / 180;
}

export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function randInt(min, max) {
  return Math.floor(rand(min, max));
}

export function clamp(min, max, v) {
  return Math.min(Math.max(v, min), max);
}

export function usin(v) {
  return (Math.sin(v) + 1.0) / 2.0;
}

export function smoothstep(min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
};

export function round(v, d = 100) {
  return Math.round(v * d) / d;
}
