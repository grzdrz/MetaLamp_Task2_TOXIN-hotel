const WebpackConfig = require("./webpackconfigBuilder");

let fileNames = ["HeadersAndFooters", "FormElements"];

module.exports = fileNames.map(fileName => {
    return new WebpackConfig(fileName, __dirname);
});