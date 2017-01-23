const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://0.0.0.0:8000',
      'webpack/hot/dev-server',
      './src/index.js',
    ],
  },
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
  ],
  resolve: {
    extensions: ['.js', 'jsx'],
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
    ],
  },
};
