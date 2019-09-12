import renderer from '../fwo/renderer';

import makeExamples from './examples';

export default function examples(state) {

  const { canvas, width, height } = state;
  const gl = canvas.getContext('2d');

  const makeRenderer = camera => new renderer(gl, camera, width, height);

  let examples = makeExamples();

  let currentExample;

  this.init = (example) => {
    let makeExample = examples[example];
    currentExample = new makeExample(state, makeRenderer);
    if (currentExample.init) currentExample.init();
  };

  this.update = delta => {
    currentExample.update(delta);
  };

  this.all = () => {
    return Object.keys(examples);
  };

  let keys = this.all();
  this.init(keys[keys.length-1]);
}
