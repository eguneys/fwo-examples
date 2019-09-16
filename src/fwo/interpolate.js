export default function interpolator2(a, b = a.slice()) {
  return {
    update(dt) {
      a.forEach((_, i) => a[i] = interpolate(a[i], b[i], dt));
    },
    target(x) {
      if (x) {
        b = x;
      }
      return b;
    },
    isSettled() {
      return a.every((_, i) => Math.abs(_ - b[i]) < 0.01);
    },
    value(x) {
      if (x) {
        a = x;
      }
      return a;
    }
  };  
}

export function interpolator(a, b = a) {
  return {
    interpolate(dt) {
      a = interpolate(a, b, dt);
    },
    target(x) {
      b = x;
    },
    set(x) {
      a = x;
    },
    get() {
      return a;
    }
  };
}

export function interpolate(a, b, dt = 0.2) {
  return a + (b - a) * dt;
}
