const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StylelintPlugin = require('stylelint-webpack-plugin');

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
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['>1%', 'last 4 version', 'Firefox ESR', 'not ie < 9']
                  })
                ],
                sourceMap: true
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
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
      favicon: paths.src + '/image/favicon.ico',
      filename: 'index.html'
    }),
    new StylelintPlugin()
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', 'jsx', '.json'],
    alias: {
      '@': paths.src
    }
  }
}
