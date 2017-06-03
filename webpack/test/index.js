const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
  },
  resolve: {
    alias: {
      Config: path.join(__dirname, './config'),
    },
  },
};
