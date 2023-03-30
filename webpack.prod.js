import { merge } from 'webpack-merge';
import path from 'path';
import common from './webpack.common.js';

export default merge(common, {
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
