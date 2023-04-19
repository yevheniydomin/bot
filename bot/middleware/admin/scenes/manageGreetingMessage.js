const { Scenes, Markup, Composer } = require('telegraf');
const dbAdd = require('../../../common/sequelize/db.add.sequelize');
const dbGet = require('../../../common/sequelize/db.get.sequelize');

const manageGreetingMessage = new Scenes.BaseScene('manageGreetingMessage');

manageGreetingMessage.enter((ctx) => {
  ctx.reply('You are in the message scene');
  console.log('TEST!')
})

module.exports = manageGreetingMessage;