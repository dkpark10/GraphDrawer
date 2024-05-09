const fs = require('fs/promises');
const packageInfo = require('./package.json');
const dateFns = require('date-fns');
const { merge } = require('webpack-merge');
const { webpackCommonConfig } = require('./webpack.common.js');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

class CreateFilePlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.afterEmit.tap(this.constructor.name, async (compilation) => {
      const buildPath = compilation.options.output.path;
      const version = packageInfo.version;
      const buildDate = dateFns.format(new Date(), 'yymmdd-hhmmss');
      const text =`version: ${version} ${buildDate}`;

      fs.writeFile(`${buildPath}/version.txt`, text, 'utf8').catch((err) => {
        console.error(err);
      });
    });
  }
}

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    path: path.resolve('build/'),
    filename: 'app.[chunkhash].js',
    // prefix 개념 번들 파일 앞에 요청할 주소 ec2 url 이나 s3
    publicPath: '/graphpainter/',
    clean: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new CreateFilePlugin(),
    // 파일, 폴더 복사 플러그인
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
        },
      ],
    }),
  ],
});
