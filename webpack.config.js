const path = require('path');

//После сборки создает отдельный css файл, в который помещается результат компиляции всего scss древа ссылок,
//корень которого расположен в js файле точки входа('./src/index.js' в данном случае).
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Сжимает древо pug файлов(в данном случае) в единый html файл, подтягивая в него ссылки на js и css бандлеры, созданные на основе
//корневого js файла указанного в точке входа(/src/index.js в данном случае).
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


let entries = [
    //{ pageName: "HeadersAndFooters", pageType: "UIKit" },
    //{ pageName: "FormElements", pageType: "UIKit" },
    //{ pageName: "ColorsAndType", pageType: "UIKit" },
    { pageName: "Cards", pageType: "UIKit" },
    //{ pageName: "LandingPage", pageType: "WebPages" },
    { pageName: "SearchRoom", pageType: "WebPages" },
    //{ pageName: "Registration", pageType: "WebPages" },
    //{ pageName: "SignIn", pageType: "WebPages" },
    //{ pageName: "RoomDetails", pageType: "WebPages" },
];

const pluginsOptions = [];
entries.forEach(e => {
    pluginsOptions.push(
        new HtmlWebpackPlugin({
            filename: `./${e.pageName}.html`,
            template: `./src/pages/${e.pageType}/${e.pageName}/${e.pageName}.pug`,
            inject: true,
            chunks: [e.pageName],
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

module.exports = {
    entry: entries.reduce((obj, curEntry) => {
        obj[curEntry.pageName] = `./src/pages/${curEntry.pageType}/${curEntry.pageName}/${curEntry.pageName}.js`;
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
                test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
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