const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const VENDOR_LIBS = ['react', 'react-dom'];

const config = (env = {}) => ({
  entry: {
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: '/dist/'
  },
  devtool: env.prod ? 'source-maps' : 'eval',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|svg)(\?.*$|$)/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[chunkhash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      minRatio: 0.8
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  stats: {
    colors: true,
    errors: true,
    errorDetails: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css']
  }
});


module.exports = config;
