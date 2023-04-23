const { Markup } = require('telegraf');

// This function allows to get array of Markup buttons with the callbacks and the ids that are
// ready to use in Markup.InlineKeybord in view. You can manage how many columns of the buttons
// do you want on the screen and you can add sufixes for the calback ids and to the buttons text
const getButtonsMarkdown = async function (
  array,
  columsNumber,
  textProp,
  callbackIdProp,
  sufix = ''
) {
  const buttons = [];
  let buttonsLinesCount = parseInt(array.length / columsNumber, 10);
  if (array.length % columsNumber) buttonsLinesCount += 1;

  for (let i = 0; i < buttonsLinesCount; i += 1) {
    buttons.push([]);
  }

  let countLine = 0;
  for (let i = 0; i < array.length; i += 1) {
    buttons[countLine].push(
      Markup.button.callback(array[i][textProp], `${sufix}${array[i][callbackIdProp]}`)
    );
    if (buttons[countLine].length === columsNumber) {
      countLine += 1;
    }
  }

  return buttons;
};

module.exports = getButtonsMarkdown;
