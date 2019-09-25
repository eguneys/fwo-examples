
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

// http://www.complexification.net
import exHappyPlace from './happyPlace';
import exSandStroke from './sandStroke';

import exMesh3d from './mesh3d';
import exMeshCubes from './meshCubes';

import exHexa from './hexa';

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
    sandStroke: exSandStroke,
    mesh3d: exMesh3d,
    meshCubes: exMeshCubes,
    hexa: exHexa
  };
}
