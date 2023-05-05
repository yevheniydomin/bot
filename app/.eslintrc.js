process.chdir(__dirname);
 
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    codeFrame: false,
  },
  rules: {
    'func-names': 'off',
    camelcase: 'off'
  },
  extends: [
    'airbnb-standard',
  ],
};