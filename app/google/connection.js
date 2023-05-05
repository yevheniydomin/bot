const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: './env/google.credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

const client = async () => auth.getClient();
const googleSheets = google.sheets({ version: 'v4', auth: client });

module.exports = {
  googleSheets,
  auth,
  client
};