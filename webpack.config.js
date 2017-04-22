var path = require('path');
// var webpack = require('webpack');
module.exports = {
  entry: './public/client-material-ui.js',

  output: {
    filename: 'bundle-material-ui.js',
    path: path.join('public/js/')
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      }
    ]
  }

  // , plugins: [
  //   new webpack.ProvidePlugin({
  //       'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  //   })
  // ]
};