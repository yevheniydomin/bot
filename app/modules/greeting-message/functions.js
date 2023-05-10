const fs = require('node:fs');
const dbFunc = require('../../database/functions');

saveNewGreetingMessage = async function (ctx) {
  try {
    let field_id;
    const pathToCachedMessage = '../data/greeting-message/cahcedMessage.txt';
    const pathToCachedPictureId = '../data/greeting-message/pictureId.txt';
    const isCachedMessageExisting = fs.existsSync(pathToCachedMessage);
    const isCachedPicIdExisting = fs.existsSync(pathToCachedPictureId);

    if (isCachedMessageExisting) {
      fs.unlinkSync(pathToCachedMessage);
      ctx.reply('An old message has been removed');
      console.log('An old message has been removed');
    }
    if (isCachedPicIdExisting) {
      fs.unlinkSync(pathToCachedPictureId);
      ctx.reply('An old picture has been removed');
      console.log('Picture ID cache has been cleaned');
    }
    if (ctx.update.message.document) {
      ctx.reply('Please attach picture as a photo not as a file.');
      return 1;
    }
    if (!ctx.update.message.photo) {
      await ctx.reply('Please attach a picture as a photo');
      return 1;
    }
    if (ctx.update.message.photo) {
      file_id = ctx.update.message.photo[0].file_id;
      fs.writeFileSync(pathToCachedPictureId, file_id);
      const caption = ctx.update.message.caption;
      await dbFunc.updateGreetingMessage({ message: caption, file_id });
      fs.writeFileSync(pathToCachedMessage, caption);
      ctx.reply('The new greeting has been set.');
      return 0;
    }
  } catch (err) {
    console.log('Error on updating the greeting\n', err);
    ctx.reply(`Error on updating the greeting\n ${err}`);
  }
  return 0;
};

// sendGreeingMessage = async function (ctx) {
//   const pathToMarkdownEntities = '../data/greeting-message/markdownEntities.json';
//   const pathToCachedMessage = '../data/greeting-message/cahcedMessage.json';
//   const pathToCachedPictureId = '../data/greeting-message/pictureId.json';
//   const isEntititesExisting = fs.existsSync(pathToMarkdownEntities);
//   const isCachedMEssageExisting = fs.existsSync(pathToCachedMessage);
//   const isCachedPicIdExisting = fs.existsSync(pathToCachedPictureId);
//   try {
//     const chat_id = 181703780; //ctx.update.chat_join_request.user_chat_id;
//     if (isEntititesExisting && isCachedMEssageExisting && isCachedPicIdExisting) {
//       let caption = await dbFunc.getGreetingMessage();
//       // const decoder = new StringDecoder('utf8');
//       // const cent = await Buffer.from([caption.message]);
//       // caption.message = await decoder.write(cent);
//       const caption_entities = require('../../../data/greeting-message/markdownEntities.json');
//       const fileId = require('../../../data/greeting-message/pictureId.json');
//       await ctx.sendPhoto(fileId.file_id, {
//         chat_id,
//         caption: caption.message,
//         caption_entities,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// applyEntitiesToPlainText = function (text, entities) {
//   const markdown = {
//     bold: { left: '*', right: '*', lengthIncresed: 4 },
//     italic: { left: '_', right: '_', lengthIncresed: 4 },
//     text_link: { left: '', right: '', lengthIncresed: 0 },
//   };
//   let shift = 0;
//   for (let i = 0; i < entities.length; i++) {
//     let splitText = text.split('');
//     console.log('Slit text on a loop start\n', splitText);
//     const firstIndx = entities[i].offset + shift;
//     const secodIndx = firstIndx + entities[i].length;
//     let left;
//     let right;
//     if (entities[i].type === 'text_link') {
//       markdown[entities[i].type].left = '[';
//       markdown[entities[i].type].right = `](${entities[i].url})`;
//       markdown[entities[i].type].lengthIncresed = 4 + entities[i].url.length;
//     }
//     if (entities[i].type === 'mention') {
//       break;
//     }
//     left = markdown[entities[i].type].left;
//     right = markdown[entities[i].type].right;

//     let sliceArr = text.slice(firstIndx, secodIndx).split('');
//     sliceArr.unshift(left);
//     sliceArr.push(right);
//     const newStr = sliceArr.join('');
//     splitText.splice(firstIndx, entities[i].length, newStr);
//     shift += markdown[entities[i].type].lengthIncresed;
//     text = splitText.join('');
//   }
//   // fs.writeFileSync('../data/greeting-message/text2.txt', text);
//   return text;
// };

sendCurrentGreeting = async function (ctx) {
  await console.log('WOW:\n',ctx.update.message);
  let chat_id = undefined;
  try {
    chat_id = ctx.update.chat_join_request.from.id
  } catch(err){
    console.log('not user chat, let us check if admin');
  }
  if(!chat_id) {
    try {
      chat_id = ctx.update.callback_query.from.id
    } catch(err) {
      console.log('chat_id has not been set\n', err);
    }
  }
   
  if(!fs.existsSync('../data/greeting-message/cahcedMessage.txt')) {
    console.log('Greeting message does not exist. Please set the message firstly');
    return 1;
  }
  
  try {
    const bufferMessage = fs.readFileSync('../data/greeting-message/cahcedMessage.txt');
    const message = await bufferMessage.toString('utf8');
    const bufferPicture = await fs.readFileSync('../data/greeting-message/pictureId.txt');
    const file_id = bufferPicture.toString('utf8');
    await ctx.sendPhoto(file_id, {
      chat_id,
      caption: message,
      parse_mode: 'MarkdownV2',
    });
    console.log(`New greating has been sent to\n`
    + `User ID: ${chat_id}\nFirst name: ${ctx.update.chat_join_request.from.first_name}\n`
    + `Username: ${ctx.update.chat_join_request.from.username}`);
    return 0;
  } catch (err) {
    console.log(err);
  }
};

isGreetingReady = async function () {
    fs.existsSync('../data/greeting-message/cahcedMessage.txt') &&
    fs.existsSync('../data/greeting-message/pictureId.txt') ? true : false;
}

module.exports = {
  saveNewGreetingMessage,
  sendCurrentGreeting,
  isGreetingReady
};
