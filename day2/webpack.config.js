const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
