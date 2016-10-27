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
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin(
        {
          'process.env.NODE_ENV': JSON.stringify('production')
        }
      )
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
      },
      {
        test: /\.[s]css$/,
        loader: 'style!css!postcss',
      },
    ]
  },
  postcss: function() {
    return [require('precss')]
  }
};
