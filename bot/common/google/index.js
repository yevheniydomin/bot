const moment = require('moment');
const { googleSheets, auth } = require('../../connections/google.connection');

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const tabTitle = process.env.GOOGLE_TAB_TITLE;

// gets user model obj destructed object writes the data to a google spreadsheet
const addNewUserToSpreadsheet = async function (args) {
  const {
    first_name, last_name, username, id
  } = args;
  const date = moment().format('DD-MM-YYYY HH:mm');
  try {
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `${tabTitle}!C:G`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [id, first_name, last_name, username, date]
        ]
      }
    });
  } catch (err) {
    return err;
  }
  return 0;
};

// Checks by user id if user is already present in the spreadsheet. Returns true or false.
const isUserInSpreadsheet = async function (user_id) {
  try {
    const result = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${tabTitle}!C:C`
    });

    if (!result.data.values) {
      return false;
    }
    return await result.data.values.some(cell => cell[0].toString() === user_id.toString());
  } catch (err) {
    return err;
  }
};

module.exports = {
  addNewUserToSpreadsheet,
  isUserInSpreadsheet
};
