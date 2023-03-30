const { merge } = require('webpack-merge');
const { webpackCommonConfig } = require('./webpack.common.js');
const path = require('path');

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    path: path.resolve('build/'),
    filename: 'app.js',
    // prefix 개념 번들 파일 앞에 요청할 주소 ec2 url 이나 s3
    publicPath: './',
    clean: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
