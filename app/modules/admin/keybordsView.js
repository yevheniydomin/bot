const { Markup } = require('telegraf');

const mainMenuKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Налаштувати привітання', 'greet-settings')],
  [Markup.button.callback('Вийти', 'exit')],
]);

const greetingMenuKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Поточне привітання', 'current-greeting'),
  Markup.button.callback('Встановити нове', 'set-greeting')],
  [Markup.button.callback('В головне меню', 'main-menu')],
]);

module.exports = {
  mainMenuKeyboard,
  greetingMenuKeyboard
}