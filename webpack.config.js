var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: "var",
    library: "BlocksGallery",
    filename: 'blocks-gallery.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "example"),
    compress: true,
    port: 80
  }
};