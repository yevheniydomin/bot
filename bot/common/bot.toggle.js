const { Bot } = require('../../models');

// true - switch bot on, false - off
const toggleBot = async function(state) {
  try {
    Bot.update({ enebled: state }, { where: {} });
  } catch(err) {
    console.log('Error on toggle bot\n', err);
  }

  return state ?  'Bot has been enabled' :  'bot has been disabled';
}