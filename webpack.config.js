const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Your application's entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Single JS output file
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // Template for your HTML file
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true
    }
};