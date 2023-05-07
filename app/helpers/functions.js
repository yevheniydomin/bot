const dbFunc = require('../database/functions');

const restoreGreetingMessageFromDB = async function () {
  dbFunc.getGreetingMessage();
}