const path = require('path');

module.exports = {
    mode : 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath:'/'
                        },
                    }

                ],
                include: path.join(__dirname, 'src'),
                exclude: [
                    path.join(__dirname, 'index.html'),
                    path.join(__dirname, 'appbundle', 'index.html')
                ],
            },
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".html", ".sass", ".less", ".css", ".scss" ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
