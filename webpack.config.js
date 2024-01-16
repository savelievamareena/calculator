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
            // Add loaders here if needed (e.g., Babel, CSS, etc.)
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true
    }
};