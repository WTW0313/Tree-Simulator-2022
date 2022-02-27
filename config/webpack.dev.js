const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist')
}

module.exports = {
  mode: 'development',
  entry: [paths.src + '/index.js'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader'
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.src + '/index.html',
      title: 'Tree Simulator',
      favicon: paths.src + '/image/favicon.svg',
      filename: 'index.html'
    })
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', 'jsx', '.json'],
    alias: {
      '@': paths.src
    }
  }
}
