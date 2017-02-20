const webpack  = require('webpack');
const path     = require('path');
const html     = require('html-webpack-plugin');
const pkg      = require('./package.json');

const devConfig   = [
    new html({ template : __dirname + '/app/index.html', filename : 'index.html', inject : 'body' }),
    new webpack.optimize.CommonsChunkPlugin({ name : 'vendor', filename : 'vendor.min-[hash:6].js' })
  ],
  prodConfig  = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle : false, sourcemap : false })
  ].concat(devConfig);

module.exports = function ( env ) {
  return {
    context   : path.resolve(__dirname, 'app'),
    devtool   : env && env.production ? 'source-map' : 'inline-source-map',
    devServer : {
      historyApiFallback: true
    },
    entry     : {
      app     : './index.js',
      vendor  : Object.keys(pkg.dependencies)
    },
    output    : {
      path      : path.resolve(__dirname, 'dist'),
      filename  : '[name].min-[hash:6].js'
    },
    plugins : env && env.production ? prodConfig : devConfig,
    module : {
      rules : [
        {
          test : /\.html?$/,
          use  : ['html-loader']
        },
        {
          test : /\.s?css$/,
          use  : ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test    : /\.jsx?$/,
          exclude : /node_modules/,
          use : [
            {
              loader  : 'babel-loader',
              options : {
                presets         : ['react', 'es2015', 'stage-0'],
                plugins         : ['react-html-attrs', 'transform-decorators-legacy'],
                cacheDirectory  : true
              }
            },
            'eslint-loader'
          ]
        },
        {
          test  : /\.(jpe?g|png|gif|svg|ico|eot|ttf|woff2?)/,
          use   : ['file-loader?name=[path][name].[ext]']
        }
      ]
    }
  };
};



// let webpack   = require('webpack'),
//   path        = require('path'),
//   clean       = require('clean-webpack-plugin'),
//   html        = require('html-webpack-plugin'),
//   pkg         = require('./package.json');

// let debug     = process.env.NODE_ENV !== 'production',
//   devConfig   = [
//     new html({ template : __dirname + '/app/index.html', filename : 'index.html', inject : 'body' }),
//     new webpack.optimize.CommonsChunkPlugin({ name : 'vendor', filename : 'vendor.min-[hash:6].js' })
//   ],
//   prodConfig  = [
//     new webpack.optimize.DedupePlugin(),
//     // new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin({ mangle : false, sourcemap : false }),
//     new clean(['dist'], { root : __dirname, verbose : true, dry : false})
//   ].concat(devConfig);

// module.exports = {
//   context   : path.join(__dirname, 'app'),
//   devtool   : debug ? 'inline-sourcemap' : null,
//   devServer : {
//     historyApiFallback: true
//   },
//   entry     : {
//     app     : './index.js',
//     vendor  : Object.keys(pkg.dependencies)
//   },
//   module    : {
//     loaders : [
//       {
//         test    : /\.html?$/,
//         loader  : 'html-loader'
//       },
//       {
//         test    : /\.jsx?$/,
//         exclude : /(node_modules|bower_components)/,
//         loaders  : ['babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0&plugins[]=react-html-attrs&plugins[]=transform-decorators-legacy&cacheDirectory=true','eslint-loader']
//       },
//       {
//         test    : /\.s?css$/,
//         loader  : 'style-loader!css-loader!sass-loader'
//       },
//       {
//         test    : /\.(jpe?g|png|gif|svg|ico|eot|ttf|woff2?)/,
//         loader  : 'file-loader?name=[path][name].[ext]'
//       }
//     ]
//   },
//   output    : {
//     path      : '/dist',
//     filename  : 'app.min-[hash:6].js'
//   },
//   plugins   : debug ? devConfig : prodConfig
// };


