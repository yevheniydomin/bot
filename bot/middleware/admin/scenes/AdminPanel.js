const { Scenes } = require('telegraf');
const dbSequelize = require('../../../common/sequelize/db.sequelize');


const AdminPanel = new Scenes.BaseScene('AdminPanel');
AdminPanel.enter(async (ctx) => {
  await ctx.reply('Welcome to Admin panel!\n');
});

module.exports = AdminPanel;