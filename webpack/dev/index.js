const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = +process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = () => ({
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      './src',
    ],
  },
  devtool: 'eval',
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: './dist',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          precss,
          autoprefixer({ browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9'] }),
        ],
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Cycle Todo MVC',
      filename: 'index.html',
      template: 'templates/index.ejs',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: {
      Config: path.join(__dirname, './config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader',
        ],
      },
    ],
  },
});
