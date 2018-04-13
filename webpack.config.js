var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src'
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    output: {
        publicPath: "/js/",
        path: path.join(__dirname, '/dist/js/'),
        filename: '[name].build.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};
