const fs = require('node:fs');
const fetch = require('node-fetch');
const Message = require('../../database/models/message');

saveNewPicForGreetMessage = async function (ctx) {
  try {
    let fieldId;
    if (ctx.update.message.photo) {
      console.log(ctx.update.message.photo);
      const indxOfTheBestPhotoQuality = ctx.update.message.photo.length - 1;
      fileId = ctx.update.message.photo[indxOfTheBestPhotoQuality].file_id;
    } else {
      fileId = ctx.update.message.document.file_id;
    }
    ctx.telegram.getFileLink(fileId).then((url) => {
      const imgPath = '../data/greeting-img/image.png';
      const exists = fs.existsSync(imgPath);
      if (exists) {
        console.log('The image already exists.');
        fs.unlinkSync(imgPath);
        console.log('Previous image has been removed');
      }
      fetch(url).then((response) => {
        response.body.pipe(fs.createWriteStream(imgPath));
      });
    });
  } catch (err) {
    console.log('Error on image fetch\n', err);
  }
  return 0;
};

saveNewMessageText = async function (ctx) {
  try {
  } catch (err) {
    console.log('Error on saving a new greeting message to db\n', err);
  }
};


module.exports = {
  saveNewPicForGreetMessage,
}
