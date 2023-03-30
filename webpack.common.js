import HtmlWebpackPlugin from 'html-webpack-plugin';
// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// 정적 파일 복사 플러그인
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { resolve } from 'path';

const rootPath = resolve();

export default {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve(rootPath, './src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
      // ts-loader의 옵션은 성능 향상을 위해서
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      // 파일 로더
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
    new ForkTsCheckerWebpackPlugin(),
    // 파일, 폴더 복사 플러그인
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
        },
      ],
    }),
  ],
};
