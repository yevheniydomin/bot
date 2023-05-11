const { mainMenuKeyboard, greetingMenuKeyboard } = require('./keybordsView');
const { Composer, Markup } = require('telegraf');
const { sendCurrentGreeting, saveNewGreetingMessage } = require('../greeting-message/functions')

const composer = new Composer();
composer.on('callback_query', async (ctx) => {
  const query = ctx.update.callback_query.data;
  switch(query) {
    case 'main-menu':
      await ctx.deleteMessage();
      await ctx.reply('Ласкаво просимо до адмінки:', mainMenuKeyboard);
      break;
    case 'greet-settings':
      await ctx.deleteMessage();
      await ctx.reply('\n\n\n\nДії над привітанням:', greetingMenuKeyboard);
      break;
    case 'current-greeting':
      await sendCurrentGreeting(ctx);
      await ctx.reply('Дії над привітанням:', greetingMenuKeyboard);
      break;
    case 'set-greeting':
      await ctx.reply('Напиши новий меседж та прикрипи фотку:');
      break;
    case 'exit':
      await ctx.deleteMessage();
  }
  
});
composer.on('message', async (ctx) => {
  console.log('triggered photo')
  const result = await saveNewGreetingMessage(ctx);
  if(result) {
    ctx.reply('Щось пішло не так. Не вдалося встановити новий меседж');
  } else {
    await ctx.deleteMessage();
    await ctx.reply('Нове привітання встановлене!', greetingMenuKeyboard);

  }
})

module.exports = composer;