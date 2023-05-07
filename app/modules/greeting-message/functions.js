const fs = require('node:fs');
const fetch = require('node-fetch');
const Message = require('../../database/models/message');
const dbFunc = require('../../database/functions');

saveNewPicForGreetMessage = async function (ctx) {
  try {
    let field_id;
    const pathToMarkdownEntities = '../data/greeting-message/markdownEntities.json';
    const exists = fs.existsSync(pathToMarkdownEntities);
    if(exists) {
      fs.unlinkSync(pathToMarkdownEntities);
      console.log('Previous greeting entities has been removed');
    }

    if (ctx.update.message.document) {
      ctx.reply('Please attach picture as a photo not as a file.');
      return 1;
    }
    if (!ctx.update.message.photo) {
      const message = ctx.update.message.text;
      await ctx.reply('Please note that there are not any pictures in the new greeting message.');
      await dbFunc.updateGreetingMessage({ message, file_id: null });
      fs.writeFileSync(pathToMarkdownEntities, JSON.stringify(ctx.update.message.entities));
      await ctx.reply('Greeting has been updated.');
      return 0;
    }
    if (ctx.update.message.photo) {
      file_id = ctx.update.message.photo[0].file_id;
      const caption = ctx.update.message.caption;
      await dbFunc.updateGreetingMessage({ message: caption, file_id });
      fs.writeFileSync(pathToMarkdownEntities, JSON.stringify(ctx.update.message.caption_entities));
      ctx.reply('Greeting has been updated');
      return 0;
    }

    // ctx.telegram.getFileLink(fileId).then((url) => {
    //   const imgPath = '../data/greeting-message/image.png';
    //   const exists = fs.existsSync(imgPath);
    //   if (exists) {
    //     console.log('The image already exists.');
    //     fs.unlinkSync(imgPath);
    //     console.log('Previous image has been removed');
    //   }
    //   fetch(url).then((response) => {
    //     response.body.pipe(fs.createWriteStream(imgPath));
    //     ctx.reply('New imgage for greeting message has been saved');
    //   });
    // });
  } catch (err) {
    console.log('Error on updating the greeting\n', err);
    ctx.reply(`Error on updating the greeting\n ${err}`);
  }
  return 0;
};

saveNewMessageText = async function (ctx) {
  try {
    let message;
    if (!ctx.update.message.photo && !ctx.update.message.document) {
      message = ctx.update.message.text;
    } else {
      message = ctx.update.message.caption;
    }

    isMessageExistsInDB = await dbFunc.checkIfGreetingExists();
    if (!isMessageExistsInDB) {
      await dbFunc.createMessage(message);
      await ctx.reply('New greeting text has been added');
    } else {
      dbFunc.updateGreetingMessage(message);
      await ctx.reply('Greeting text has been updated');
    }
  } catch (err) {
    console.log('Error on saving a new greeting message to db\n', err);
    ctx.reply(`Error on saving greeting\n ${err}`);
  }
};

module.exports = {
  saveNewPicForGreetMessage,
  saveNewMessageText,
};
