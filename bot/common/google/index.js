const { googleSheets, auth, client } = require('../../connections/google.connection');
const moment = require('moment');


const addNewUserToSpreadsheet = async function(args) {
  const { first_name, last_name, username, id } = args;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tabTitle = process.env.GOOGLE_TAB_TITLE;

  try{
    client();
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `${tabTitle}!C:G`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [id, first_name, last_name, username, date = moment().format('DD-MM-YYYY HH:MM')]
        ],
      },
    });
  } catch(err) {
    console.log('Error on adding a new user to a google spreadsheet\n', err);
  }
}

module.exports = addNewUserToSpreadsheet;