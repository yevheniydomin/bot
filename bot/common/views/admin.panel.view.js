const { Markup } = require('telegraf');
const dbSequelize = require('../sequelize/db.sequelize');


module.exports = async function () {
  return await Markup.inlineKeyboard([
    [Markup.button.callback('Edit greeting', 'get_message')],
    [Markup.button.callback('Get current subscribers', 'get_subscribers')],
    [Markup.button.callback(`a`, 'disable_bot')]
  ]);
};
