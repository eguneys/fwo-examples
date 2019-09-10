
// https://github.com/aaronpenne/generative_art
import exLili from './lili';
import exChroma from './chroma';
import exStackci from './stackci';
import exAllegory from './allegory';


// https://tylerxhobbs.com
import exColors from './colors';
import exSoftTextures from './softTextures';
import exCirclePack from './circlePack';

import exIllines from './illines';
import exWobblyLines from './wobblyLines';
import exRandomShepherd from './randomShepherd';

// http://www.complexification.net/gallery/machines/happyPlace/
import exSandStroke from './sandStroke';

export default function examples() {
  return {
    lili: exLili,
    chroma: exChroma,
    stackci: exStackci,
    allegory: exAllegory,
    colors: exColors,
    softTextures: exSoftTextures,
    circlePack: exCirclePack,
    illines: exIllines,
    wobblyLines: exWobblyLines,
    randomShepherd: exRandomShepherd,
    sandStroke: exSandStroke
  };
}
