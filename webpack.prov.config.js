const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const destination = process.env.NODE_ENV === 'production' ? 'dist' : 'docs';

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.join(__dirname, destination),
    filename: '[name].js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin(
      {
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          precss,
          autoprefixer({ browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9'] }),
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', 'jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        loaders: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.[s]css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
};
