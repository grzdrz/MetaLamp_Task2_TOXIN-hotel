const path = require('path');

//Сжимает древо pug файлов(в данном случае) в единый html файл, подтягивая в него ссылки на js и css бандлеры, созданные на основе
//корневого js файла указанного в точке входа.
const HtmlWebpackPlugin = require('html-webpack-plugin');

//После сборки создает отдельный css файл, в который помещается результат компиляции всего scss древа ссылок,
//корень которого расположен в js файле точки входа.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack');

//HtmlWebpackPlugin с inject: true при генерации html файлов вставляет в него ВСЕ описанные в свойстве entry объекта конфигурации
//сгенерированные на основе pug файлов js файлы (а вместе с ними и все css файлы, извлеченные посредством 
//MiniCssExtractPlugin из этих js файлов).
//Как настроить HtmlWebpackPlugin на инжекцию только определенных файлов я так и не понял, поэтому создал генератор конфигов
//под каждую страницу. В этом случае в каждый html файл инжектируется по одному одноименному js и css файлу.
module.exports = class WebpackConfigBuilder {
    constructor(fileName, __dirname) {
        this.entry = {
            [fileName]: './src/pages/' + fileName + '.js',
        };

        this.output = {
            path: path.resolve(__dirname, 'bandle'),
            filename: fileName + '.js'
        };

        this.plugins = this.setPlugins(fileName);

        this.module = {
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
                        /* {
                            loader: "style-loader"
                        }, */
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
                {
                    test: /\.(ttf|eot|woff|woff2|svg|png)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                },
            ]
        };
    }

    setPlugins(fileName) {
        let resultOptions = [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
        ];
        resultOptions.push(
            new HtmlWebpackPlugin({
                filename: './' + fileName + '.html',
                template: './src/pages/' + fileName + '.pug',
                inject: true,
            })
        );
        resultOptions.push(new MiniCssExtractPlugin({
            filename: fileName + '.css',
        }));

        return resultOptions;
    }
}
/* pluginsOptions.push(new HtmlWebpackExternalsPlugin({ // optional plugin: inject cdn
    externals: [
        {
            module: 'jquery',
            entry: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
        }
    ]
})); */