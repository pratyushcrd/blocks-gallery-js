var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: "umd",
    library: "BlocksGallery",
    filename: 'blocks-gallery.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "example"),
    compress: true,
    port: 80
  },
  module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      }]
  }
};
