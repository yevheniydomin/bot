const { sheets } = require('googleapis/build/src/apis/sheets');
const { googleSheets, auth } = require('../../connections/google.connection');
const moment = require('moment');

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const tabTitle = process.env.GOOGLE_TAB_TITLE;

const addNewUserToSpreadsheet = async function(args) {
  const { first_name, last_name, username, id } = args;
  try{
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `${tabTitle}!C:G`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [id, first_name, last_name, username, date = moment().format('DD-MM-YYYY hh:mm')]
        ],
      },
    });
  } catch(err) {
    console.log('Error on adding a new user to a google spreadsheet\n', err);
  }
}

const isUserInSpreadsheet = async function(user_id) {
  try {
    const result = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${tabTitle}!C:C`,
    });

    if(!result.data.values) {
      console.log('This user id is not present in spreadsheet.');
      return false;
    } 

    return await result.data.values.some((cell) => {
      return cell[0].toString() === user_id.toString();
    });
  } catch(err) {
    console.log('Error on getting user id from google spreadsheet\n', err);
  }
}

module.exports = {
addNewUserToSpreadsheet,
isUserInSpreadsheet,
}