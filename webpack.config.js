var debug   = process.env.NODE_ENV !== 'production',
  webpack   = require('webpack'),
  path      = require('path'),
  HWP       = require('html-webpack-plugin'),
  HWPConfig = new HWP({ template : __dirname + '/app/index.html', filename : 'index.html', inject : 'body' });

module.exports = {
  context : path.join(__dirname, 'app'),
  devtool : debug ? 'inline-sourcemap' : null,
  entry   : './app.js',
  module  : {
    loaders : [
      {
        test    : /\.jsx?$/,
        exclude : /(node_modules|bower_components)/,
        loader  : 'babel-loader',
        query   : {
          presets : ['react', 'es2015', 'stage-0'],
          plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test    : /\.scss$/,
        loader  : 'style!css!sass'
      }
    ]
  },
  output  : {
    path      : path.resolve(__dirname, 'dist'),
    filename  : 'client.min.js'
  },
  plugins : debug ? [
    HWPConfig
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle : false, sourcemap : false }),
    HWPConfig
  ]
};
