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
  let buttonsLinesCount = await parseInt(array.length / columsNumber);
  if (array.length % columsNumber) buttonsLinesCount++;

  for (let i = 0; i < buttonsLinesCount; i++) {
    buttons.push([]);
  }

  let countLine = 0;
  for (let i = 0; i < array.length; i++) {
    buttons[countLine].push(
      Markup.button.callback(array[i][textProp], `${sufix}${array[i][callbackIdProp]}`)
    );
    if (buttons[countLine].length === columsNumber) {
      countLine++;
    }
  }

  return buttons;
};