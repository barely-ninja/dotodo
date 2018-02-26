const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['index.js'],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
	  path.resolve('./src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
};