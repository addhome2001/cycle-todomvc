const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/dev-server',
      './src/index.js',
    ],
  },
  devServer: {
    host: 'localhost',
    port: 8000,
    contentBase: './dist',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(
      {
        'process.env.NODE_ENV': JSON.stringify('development'),
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
    modules: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        loaders: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
};
