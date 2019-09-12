import Loop from 'loopz';

import makeCanvas from './canvas';
import makeExamples from './examples';

export function app(element, options) {

  const canvas = new makeCanvas(element);

  const state = {
    ...canvas
  };

  const examples = new makeExamples(state);

  new Loop(delta => {
    examples.update(delta);
  }, 60).start();

  return {
    init: (example) => {
      examples.init(example);
    },
    list: () => {
      return examples.all();
    }
  };
}
