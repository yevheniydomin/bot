const { Scenes: { Stage } } = require('telegraf');
const manageGreetingMessage = require('../scenes/manageGreetingMessage');

const stage = new Stage ([
  manageGreetingMessage,
]);

module.exports = stage;
