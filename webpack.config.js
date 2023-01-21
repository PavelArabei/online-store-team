/* eslint-disable */
const path = require('path');
const EslingPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpacPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    entry: {
        index: './index',
    },
    output: {
        filename: '[name].[contenthash].js',
        //путь к итоговому файлу
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.json', '.js'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new EslingPlugin({ extensions: 'ts' }),
        new HTMLWebpackPlugin({
            template: './index.html',
        }),
        new CleanWebpackPlugin(),

        new CopyWebpacPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'src', 'favicon.ico'),
                    to: path.join(__dirname, 'dist'),
                },
                {
                    from: path.join(__dirname, 'src', 'assets'),
                    to: path.join(__dirname, 'dist', 'assets'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.?(s)css$/i,
                use: [MiniCssExtractPlugin.loader,  'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.csv$/,
                use: ['csv-loader'],
            },
        ],
    },
};


