const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const destination = process.env.DEMO ? 'docs' : 'dist';
const NODE_ENV = process.env.NODE_ENV || 'production';


module.exports = () => ({
  entry: {
    bundle: './src',
  },
  output: {
    path: path.join(__dirname, '../../', destination),
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [
          precss,
          autoprefixer({ browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9'] }),
        ],
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Cycle Todo MVC',
      filename: 'index.html',
      template: 'templates/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
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
        test: /\.js[x]?$/,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?-autoprefixer', 'postcss-loader'],
        }),
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
