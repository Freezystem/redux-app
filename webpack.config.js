let webpack   = require('webpack'),
  path        = require('path'),
  clean       = require('clean-webpack-plugin'),
  html        = require('html-webpack-plugin'),
  pkg         = require('./package.json');

let debug     = process.env.NODE_ENV !== 'production',
  devConfig   = [
    new html({ template : __dirname + '/app/index.html', filename : 'index.html', inject : 'body' }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min-[hash:6].js')
  ],
  prodConfig  = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle : false, sourcemap : false }),
    new clean(['dist'], { root : __dirname, verbose : true, dry : false})
  ].concat(devConfig);

module.exports = {
  context   : path.join(__dirname, 'app'),
  devtool   : debug ? 'inline-sourcemap' : null,
  devServer : {
    historyApiFallback: true
  },
  entry     : {
    app     : './index.js',
    vendor  : Object.keys(pkg.dependencies)
  },
  eslint  : {
    configFile: './.eslintrc'
  },
  module    : {
    loaders : [
      {
        test    : /\.html$/,
        loader  : 'html'
      },
      {
        test    : /\.jsx?$/,
        exclude : /(node_modules|bower_components)/,
        loader  : 'babel',
        query   : {
          presets : ['react', 'es2015', 'stage-0'],
          plugins : ['react-html-attrs', 'transform-decorators-legacy'],
          cacheDirectory: true
        }
      },
      {
        test    : /\.s?css$/,
        loader  : 'style!css!sass'
      },
      {
        test    : /\.(jpe?g|png|gif|svg|ico|eot|ttf|woff2?)/,
        loader  : 'file?name=[path][name].[ext]'
      }
    ]
  },
  output    : {
    path      : './dist',
    filename  : 'app.min-[hash:6].js'
  },
  plugins   : debug ? devConfig : prodConfig
};
