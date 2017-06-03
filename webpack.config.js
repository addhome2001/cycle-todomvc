const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// API
const CLIENT_API = 'https://wt-addhome2001-yahoo-com-tw-0.run.webtask.io/webtask-crud/todos';

module.exports = {
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      './src/index.js',
    ],
  },
  devtool: 'eval',
  devServer: {
    host: '0.0.0.0',
    port: 8000,
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
      CLIENT_API: JSON.stringify(CLIENT_API),
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
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
};
