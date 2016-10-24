const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
      "bundle": './src/index.js'
  },
  output: {
      path: path.join(__dirname, 'dist'),
		  filename: '[name].js',
	},
  plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
  ],
  resolve: {
		extensions: ['', '.js', 'jsx']
	},
	module: {
		loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        loaders: 'babel',
        query: {
          cacheDirectory: true
        }
      }
    ]
  }
};
