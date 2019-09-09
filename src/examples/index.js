import renderer from '../fwo/renderer';
import exLili from './lili';
import exChroma from './chroma';
import exStackci from './stackci';
import exAllegory from './allegory';

export default function examples(state) {

  const { canvas } = state;
  const gl = canvas.canvas.getContext('2d');

  const makeRenderer = camera => new renderer(gl, camera);

  let examples = {
    lili: exLili,
    chroma: exChroma,
    stackci: exStackci,
    allegory: exAllegory
  };

  let makeExample = examples['allegory'];

  let currentExample = new makeExample(state, makeRenderer);

  this.update = delta => {
    currentExample.update(delta);
  };
  
}
