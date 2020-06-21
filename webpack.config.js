const path = require('path');

//После сборки создает отдельный css файл, в который помещается результат компиляции всего scss древа ссылок,
//корень которого расположен в js файле точки входа('./src/index.js' в данном случае).
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Сжимает древо pug файлов(в данном случае) в единый html файл, подтягивая в него ссылки на js и css бандлеры, созданные на основе
//корневого js файла указанного в точке входа(/src/index.js в данном случае).
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

//Массив объектов-плагинов, описаных выше.
//Под 2ой плагин создано n экземпляров, где n == числу корневых pug файлов. Это нужно для того, чтобы при сборке получалось множество 
//html бандлов под каждую страницу веб-приложения.   
const glob = require('glob');
const pluginsOptions = [];
let pages = glob.sync(__dirname + '/src/pages/*.pug');
pages.forEach(function (file) {
    let base = path.basename(file, '.pug');
    pluginsOptions.push(
        new HtmlWebpackPlugin({
            filename: './' + base + '.html',
            template: './src/pages/' + base + '.pug',
            inject: true,
            chunks: [base],
        })
    )
});
pluginsOptions.push(new MiniCssExtractPlugin({
    filename: '[name].css',
}));
pluginsOptions.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
}));

let entries = [
    "HeadersAndFooters",
    "FormElements",
    "ColorsAndType",
    "Cards",
    "LandingPage",
];

module.exports = {
    entry: entries.reduce((obj, curStr) => {
        obj[curStr] = "./src/pages/" + curStr + ".js";
        return obj;
    }, {}),

    output: {
        path: path.resolve(__dirname, 'bandle'),
        filename: '[name].js?v=[hash]'
    },

    plugins: pluginsOptions,

    module: {
        rules: [
            {
                test: /\.pug$/,
                loaders: [
                    {
                        loader: "pug-loader"
                    },
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
        ]
    },
}