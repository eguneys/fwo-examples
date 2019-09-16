export { shifter } from 'colourz';

export const abgrToarr = rgba => {
  const a = (rgba & 0xff000000) >>> 24,
        b = (rgba & 0x00ff0000) >>> 16,
        g = (rgba & 0x0000ff00) >>> 8,
        r = (rgba & 0x000000ff);

  return [r, g, b, a];
};

export { fromArrAbgr } from 'colourz';

export { blend } from 'colourz';


export function alpAbgr(abgr, a) {
  if (!a) {
    return (abgr & 0xff000000) >>> 24;
  } else {
    return (abgr & 0x00ffffff) | (a << 24 >>> 0);
  }
}
