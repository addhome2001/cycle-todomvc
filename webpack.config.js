var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/dev-server',
      './src/index.js'
    ]
  },
  devServer: {
     host: 'localhost',
     port: 8000,
     contentBase: './dist',
  },
	output: {
    path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
	},
  plugins:[new webpack.HotModuleReplacementPlugin()],
    resolveLoader: {
   	modulesDirectories: ['node_modules']
 	},
  resolve: {
	  extensions: ['', '.js', 'jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
  module: {
	  loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        loaders: 'babel',
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
};
