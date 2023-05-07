const fs = require('node:fs');
const dbFunc = require('../../database/functions');

saveNewGreetingMessage = async function (ctx) {
  try {
    let field_id;
    const pathToMarkdownEntities = '../data/greeting-message/markdownEntities.json';
    const pathToCachedMessage = '../data/greeting-message/cahcedMessage.json';
    const pathToCachedPictureId = '../data/greeting-message/pictureId.json';
    const isEntititesExisting = fs.existsSync(pathToMarkdownEntities);
    const isCachedMEssageExisting = fs.existsSync(pathToCachedMessage);
    const isCachedPicIdExisting = fs.existsSync(pathToCachedPictureId);

    if (isEntititesExisting) {
      fs.unlinkSync(pathToMarkdownEntities);
      console.log('Previous greeting entities has been removed');
    }
    if (isCachedMEssageExisting) {
      fs.unlinkSync(pathToCachedMessage);
      console.log('Old message cache has been cleaned');
    }
    if (isCachedPicIdExisting) {
      fs.unlinkSync(pathToCachedPictureId);
      console.log('Picture ID cache has been cleaned');
    }
    if (ctx.update.message.document) {
      ctx.reply('Please attach picture as a photo not as a file.');
      return 1;
    }
    if (!ctx.update.message.photo) {
      const message = ctx.update.message.text;
      await ctx.reply('Please note that there are not any pictures in the new greeting message.');
      await dbFunc.updateGreetingMessage({ message, file_id: null });
      if (ctx.update.message.entities) {
        fs.writeFileSync(pathToMarkdownEntities, JSON.stringify(ctx.update.message.entities));
      }
      fs.writeFileSync(pathToCachedMessage, `{"message": "${message}"}`);
      await ctx.reply('Greeting has been updated.');
      return 0;
    }
    if (ctx.update.message.photo) {
      file_id = ctx.update.message.photo[0].file_id;
      fs.writeFileSync(pathToCachedPictureId, `{"file_id": "${file_id}"}`);
      const caption = ctx.update.message.caption;
      await dbFunc.updateGreetingMessage({ message: caption, file_id });
      if (ctx.update.message.caption_entities) {
        fs.writeFileSync(
          pathToMarkdownEntities,
          JSON.stringify(ctx.update.message.caption_entities)
        );
      }
      fs.writeFileSync(pathToCachedMessage, `{"message": "${caption}"}`);
      ctx.reply('Greeting has been updated');
      return 0;
    }
  } catch (err) {
    console.log('Error on updating the greeting\n', err);
    ctx.reply(`Error on updating the greeting\n ${err}`);
  }
  return 0;
};

sendGreeingMessage = async function (ctx) {
  const pathToMarkdownEntities = '../data/greeting-message/markdownEntities.json';
  const pathToCachedMessage = '../data/greeting-message/cahcedMessage.json';
  const pathToCachedPictureId = '../data/greeting-message/pictureId.json';
  const isEntititesExisting = fs.existsSync(pathToMarkdownEntities);
  const isCachedMEssageExisting = fs.existsSync(pathToCachedMessage);
  const isCachedPicIdExisting = fs.existsSync(pathToCachedPictureId);
  try {
    const chat_id = ctx.update.chat_join_request.user_chat_id;
    if(isEntititesExisting && isCachedMEssageExisting && isCachedPicIdExisting) {
      const caption = await dbFunc.getGreetingMessage();
      console.log(caption, '\n\n');
      const caption_entities = require('../../../data/greeting-message/markdownEntities.json');
      console.log(caption_entities, '\n\n');
      const fileId = require('../../../data/greeting-message/pictureId.json');
      await ctx.sendPhoto(fileId.file_id, {
        chat_id,
        caption: caption.message,
        caption_entities,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  saveNewGreetingMessage,
  sendGreeingMessage
};
