const path = require('path');

//После сборки создает отдельный css файл, в который помещается результат компиляции всего scss древа ссылок,
//корень которого расположен в js файле точки входа('./src/index.js' в данном случае).
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Сжимает древо pug файлов(в данном случае) в единый html файл, подтягивая в него ссылки на js и css бандлеры, созданные на основе
//корневого js файла указанного в точке входа(/src/index.js в данном случае).
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Массив объектов-плагинов, описаных выше.
//Под 2ой плагин создано n экземпляров, где n == числу корневых pug файлов. Это нужно для того, чтобы при сборке получалось множество 
//html бандлов под каждую страницу веб-приложения.   
const glob = require('glob');
const pluginsOptions = [];
let pages = glob.sync(__dirname + '/src/pug/*.pug');
pages.forEach(function (file) {
    let base = path.basename(file, '.pug');
    pluginsOptions.push(
        new HtmlWebpackPlugin({
            filename: './' + base + '.html',
            template: './src/pug/' + base + '.pug',
            inject: true
        })
    )
});
pluginsOptions.push(new MiniCssExtractPlugin({
    filename: 'index.css',
}));

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'bandle'),
        filename: '[name].js'
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
                test: /\.scss$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader?name=./src/fonts/Montserrat/[name].[ext]'
                    }
                ]
            },
            {
                test: /\.(eot|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader?name=./src/fonts/Icons/[name].[ext]'
                    }
                ]
            },
        ]
    },
}



//(eot|svg|woff|woff2)