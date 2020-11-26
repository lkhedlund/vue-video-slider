const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        plugin: './assets/plugin.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            { 
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/, 
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader", 
                    "sass-loader"
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                ],
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            {
                test:  /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'http://localhost:3000/dist/'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ 
            filename: "[name].css", 
            allChunks: true 
        }),
        new MinifyPlugin(),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};