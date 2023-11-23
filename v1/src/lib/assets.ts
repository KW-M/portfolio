import { Assets, Spritesheet, Texture } from 'pixi.js';

import blendGradient from "../../../cloudAssets/blendGradient.png?url";
export const sprites = await Assets.load('spritesheet.json') as Spritesheet;
export const baseClouds = ['Cloud1', 'Cloud2', 'Cloud3', 'Cloud4', 'cloud5', 'cloud6', 'Cloud7'].map((name) => sprites.textures[name + '.png']);
export const bigClouds = ['Cloud1', 'Cloud2', 'Cloud3', 'Cloud4'].map((name) => sprites.textures[name + '.png']);
export const blendGradientTexture = Texture.from(blendGradient);
export const blendGradient9SliceArgs = [1, 285, 1, 285];


import background1 from "../lib/images/backgrounds/cradleMtn.jpg?url";
import background2 from "../lib/images/backgrounds/glacialLake.jpg?url";
import background3 from "../lib/images/backgrounds/desertDino.jpg?url";
import background4 from "../lib/images/backgrounds/forestCruz.jpg?url";
import background5 from "../lib/images/backgrounds/Reflections.jpg?url";
import background6 from "../lib/images/backgrounds/granite.jpg?url";
import background7 from "../lib/images/backgrounds/lake2.jpg?url";
import background8 from "../lib/images/backgrounds/llamaPichu.jpg?url";
import background9 from "../lib/images/backgrounds/mistyTrees.jpg?url";
import background10 from "../lib/images/backgrounds/oceanWaves.jpg?url";
import background11 from "../lib/images/backgrounds/oregon-blur.jpg?url";
import background12 from "../lib/images/backgrounds/pisac.jpg?url";
export const backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8, background9, background10, background11, background12];
