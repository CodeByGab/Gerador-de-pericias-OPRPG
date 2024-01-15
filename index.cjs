const Jimp = require('jimp');

const inputImagePath = './imgs/periciasPNG.png';
const outputImagePath = './imgs/periciasOutputPNG.png';
const textArray = ['1', '2', '3', '4', '5'];

const extraWidth = 100;
const extraHeight = 0;

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

Object.keys(coordinates).forEach(key => {
  coordinates[key].x += extraWidth / 2;
  coordinates[key].y += extraHeight / 2;
});

const whiteBg = 0xFFFFFFFF;
let isDarkMode = false;

async function main() {
  
  await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
    Jimp.read(inputImagePath)
    .then(image => {
      const newWidth = image.bitmap.width + extraWidth;
      const newHeight = image.bitmap.height + extraHeight;

      const xPosition = Math.floor((newWidth - image.bitmap.width) / 2);
      const yPosition = Math.floor((newHeight - image.bitmap.height) / 2);
      const backgroundImg = new Jimp(
        newWidth,
        newHeight,
        whiteBg
      );
      backgroundImg.composite(image, xPosition, yPosition);

      for(let i = 0; i < textArray.length; i++){
        const coord = coordinates[`coord${i + 1}`]
        backgroundImg.print(font, coord.x, coord.y, {
          text: textArray[i]
        })
        console.log(coord);
      }
      
      if(isDarkMode){
        backgroundImg.invert()
      }

      backgroundImg.write(outputImagePath);
      console.log(outputImagePath);
    });
  });

}

main();
