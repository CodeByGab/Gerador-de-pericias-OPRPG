const Jimp = require('jimp');

const inputImagePath = './imgs/pericias.jpg';
const outputImagePath = './imgs/periciasOutput.jpg';
const textArray = ['4', '2', '1', '4', '2']
const coordinates = {
  coord1: {
    x: 58,
    y: 100,
  },
  coord2: {
    x: 170,
    y: 28,
  },
  coord3: {
    x: 280,
    y: 100,
  },
  coord4: {
    x: 248,
    y: 234,
  },
  coord5: {
    x: 90,
    y: 234,
  }
}
let isDarkMode = true;

async function main() {
  
  await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
    Jimp.read(inputImagePath)
    .then(imageJpg => {

      for(let i = 0; i < textArray.length; i++){
        const coord = coordinates[`coord${i + 1}`]
        imageJpg.print(font, coord.x, coord.y, {
          text: textArray[i]
        })
      }
      if(isDarkMode){
        imageJpg.invert()
          .write(outputImagePath);
      }
      imageJpg.write(outputImagePath);

    });
  });

}

main();
