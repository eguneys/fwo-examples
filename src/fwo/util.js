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

export function arand(values) {
  return values[randInt(0, values.length)];
}

export function clamp(v, min, max) {
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

export function map(n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

export function weightedChoice(weights) {
  let r = rand(0, 1);

  function step(weightSeen, remainings) {
    let remaining = remainings[0];
    let rest = remainings.slice(1);
    if (remainings.length === 1) {
      return remaining[0];
    }

    let newWeight = remaining[1],
        endBound = weightSeen + newWeight;

    if (r > weightSeen && r < endBound) {
      return remaining[0];
    }
    return step(weightSeen + remaining[1], rest);
  }

  return step(0, weights);
}
