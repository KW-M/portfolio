import { Application, Container, Point, Sprite, Text, Texture } from 'pixi.js';

export const alphabetTextures: { [key: string]: Texture } = {};
export function generateAlphabetTexture(canvas: Application, letter: string) {
    if (alphabetTextures[letter]) return alphabetTextures[letter]; // If the texture already exists, return it
    const text = new Text(letter, { fontSize: 24, fill: 'black', fontFamily: 'monospace' }); // Create a text object with the letter
    const texture = canvas.renderer.generateTexture(text); // Generate a texture from the text object
    alphabetTextures[letter] = texture; // Store the texture in the lookup object
    return texture; // Return the texture
}

export function drawCircularText(canvas: Application, text: string, radius: number): Container {
    const angleIncrement = generateAlphabetTexture(canvas, 'W').width / radius;
    const container = new Container();
    const textSprites = [];
    text = text.toUpperCase();
    let i = 0;

    const addLetter = (i: number) => {
        const letter = text[i % text.length];
        const rotation = angleIncrement * i;
        if (letter === ' ') {
            return rotation;
        } else if (!alphabetTextures[letter]) {
            generateAlphabetTexture(canvas, letter);
        }
        const textSprite = Sprite.from(alphabetTextures[letter]);
        textSprite.anchor.set(0, 1);
        textSprite.position.set(
            Math.cos(rotation) * radius,
            Math.sin(rotation) * radius
        );
        textSprite.rotation = rotation + Math.PI / 2;
        textSprites.push(textSprite);
        container.addChild(textSprite);
        return rotation;
    }
    // let totalRotation: number = 0;
    for (; i < text.length; i++) {
        addLetter(i);
    }
    // const targetRotation = Math.ceil(totalRotation / (Math.PI * 2)) * Math.PI * 2;
    // while (totalRotation < targetRotation) {
    //     totalRotation = addLetter(i);
    //     i++;
    // }

    return container;
}

export const updateCircularText = (container: Container, deltaTime: number) => {
    const rotation = container.rotation += 0.01 * deltaTime;
    const endRotation = container.children[container.children.length - 1].rotation - (Math.PI / 2) - alphabetTextures['W'].width / 280 / 2;

    console.log('sprite rotation', endRotation / (Math.PI * 2));
    for (let i = 0; i < container.children.length; i++) {
        const textSprite = container.children[i] as Sprite;
        const spriteRotation = (textSprite.rotation - (Math.PI / 2) + rotation);
        if (spriteRotation % (endRotation) < Math.PI / 2) {
            textSprite.renderable = true;
        } else if (spriteRotation > 1.5 * Math.PI) {
            textSprite.renderable = false;
        }
    }
}

export const destroyCircularText = (container: Container) => {
    container.destroy({ children: true, texture: false, baseTexture: false });
}


// usages:
// const tc = drawCircularText(forgroundCanvas, "Helloo World nice to see you! The Qucik Brown fox JuMpEd OVER the LAZY dog ", 280 / 2, new Point(0, 0), -Math.PI / 2);
// tc.position.set(300, 300);

// tc.zIndex = 100000;
// forgroundCanvas.stage.addChild(tc);
// // const letter = new Text("B", { fontSize: 24, fill: "black" });
// // const renderer = forgroundCanvas.renderer;
// // console.log(letter.width, letter.height);
// // const renderTexture = RenderTexture.create({ width: letter.width, height: letter.height });
// // renderer.render(letter, { renderTexture });
// const A = Sprite.from(alphabetTextures["A"]);
// A.position.set(50, 50);
// A.zIndex = 100000;
// forgroundCanvas.stage.addChild(A);

//   let frameCount = 0;
//   let resizeCount = -1;
//   Ticker.shared.add((delta) => {
// tc.rotation += 0.001;
// updateCircularText(tc, delta);




//////////////////////////////////////

// let tagTextContainer: Container | null = null;

// const updateTagText = () => {
//   if (isExpanded) {
//     if (tagTextContainer) {
//       tagTextContainer.renderable = false;
//     }
//     return;
//   }

//   const canvas = forgroundPixiCanvas.get();
//   if (!canvas) return;

//   const bubbleTop = cardClipElement.offsetTop + padding * (2.5 / 2) - window.scrollY;
//   const bubbleBottom = bubbleTop + DOT_SIZE;
//   if (bubbleTop < window.innerHeight && bubbleBottom > 0) {
//     if (!tagTextContainer) {
//       tagTextContainer = drawCircularText(canvas, "Helloo World nice to see you!", 280 / 2);
//       canvas.stage.addChild(tagTextContainer);
//     }
//     tagTextContainer.renderable = true;
//     tagTextContainer.position.set(xOffset + window.innerWidth / 2, (bubbleTop + bubbleBottom) / 2);
//     return;
//   } else if (tagTextContainer) {
//     canvas.stage.removeChild(tagTextContainer);
//     destroyCircularText(tagTextContainer);
//   }
// };

// oneShotSubscribe(forgroundPixiCanvas, (pixiApp) => {
//     // updateTagText();
// });
