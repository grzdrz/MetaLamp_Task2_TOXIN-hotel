const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const pages = [
  { pageName: 'headers-and-footers', pageType: 'ui-kit' },
  { pageName: 'form-elements', pageType: 'ui-kit' },
  { pageName: 'colors-and-type', pageType: 'ui-kit' },
  { pageName: 'cards', pageType: 'ui-kit' },
  { pageName: 'landing-page', pageType: 'web-pages' },
  { pageName: 'search-room', pageType: 'web-pages' },
  { pageName: 'registration', pageType: 'web-pages' },
  { pageName: 'sign-in', pageType: 'web-pages' },
  { pageName: 'room-details', pageType: 'web-pages' },
];

const pluginsOptions = [];
pages.forEach((e) => {
  pluginsOptions.push(
    new HtmlWebpackPlugin({
      filename: `./${e.pageName}.html`,
      template: `./src/pages/${e.pageType}/${e.pageName}/${e.pageName}.pug`,
      inject: true,
      chunks: [e.pageName],
    }),
  );
});
const entries = pages.reduce((obj, curEntry) => {
  obj[curEntry.pageName] = `./src/pages/${curEntry.pageType}/${curEntry.pageName}/${curEntry.pageName}.js`;
  return obj;
}, {});
entries.favicon = './src/favicons/favicons.js';

pluginsOptions.push(new HtmlWebpackPlugin({
  filename: './index.html',
  template: './src/pages/index/index.pug',
  inject: true,
  chunks: ['index'],
}));
entries.index = './src/pages/index/index.js';

pluginsOptions.push(new MiniCssExtractPlugin({
  filename: '[name].css',
}));
pluginsOptions.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
}));

module.exports = {
  entry: entries,

  output: {
    path: path.resolve(__dirname, 'bandle'),
    filename: '[name].js?v=[hash]',
  },

  plugins: pluginsOptions,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        /* options: {
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        }, */
      },
      {
        test: /\.pug$/,
        loaders: [
          {
            loader: 'pug-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
