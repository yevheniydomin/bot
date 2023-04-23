const { Scenes: { Stage } } = require('telegraf');
const manageGreetingMessage = require('../scenes/AdminPanel');

const stage = new Stage([
  manageGreetingMessage
]);

module.exports = stage;
