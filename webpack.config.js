const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'BlocksGallery',
    filename: 'blocks-gallery.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    compress: true,
    port: 80,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
}
