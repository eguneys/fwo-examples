import renderer from '../fwo/renderer';

// https://github.com/aaronpenne/generative_art
import exLili from './lili';
import exChroma from './chroma';
import exStackci from './stackci';
import exAllegory from './allegory';


// https://tylerxhobbs.com
import exColors from './colors';
import exSoftTextures from './softTextures';
import exCirclePack from './circlePack';

// https://manning-content.s3.amazonaws.com/download/c/85bbb4d-ee4f-46d2-9bc1-03b6f23b231f/GenArt-Sample-Intro.pdf
import exIllines from './illines';

// https://www.reddit.com/r/proceduralgeneration/comments/cml32g/perlin_noise_based_wobbly_lines_with_color/
import exWobblyLines from './wobblyLines';

export default function examples(state) {

  const { canvas } = state;
  const gl = canvas.canvas.getContext('2d');

  const makeRenderer = camera => new renderer(gl, camera);

  let examples = {
    lili: exLili,
    chroma: exChroma,
    stackci: exStackci,
    allegory: exAllegory,
    colors: exColors,
    softTextures: exSoftTextures,
    circlePack: exCirclePack,
    illines: exIllines,
    wobblyLines: exWobblyLines
  };

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
