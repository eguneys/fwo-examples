import renderer from '../fwo/renderer';
import exLili from './lili';

export default function examples(state) {

  const { canvas } = state;
  const gl = canvas.canvas.getContext('2d');

  const makeRenderer = camera => new renderer(gl, camera);

  let examples = {
    lili: () => new exLili(state, makeRenderer)
  };

  let currentExample = examples['lili']();

  this.update = delta => {
    currentExample.update(delta);
  };
  
}
