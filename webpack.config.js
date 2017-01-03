'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
var express = require('./server');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './public',
        filename: "/js/[name].js",
        publicPath: ''
    },
    // see details here https://webpack.github.io/docs/webpack-dev-server.html#api
    devServer: { setup: express.server_api },
    // see details http://webpack.github.io/docs/configuration.html#devtool
    devtool: '#source-map',
    module: {
        loaders: [
            {test: /\.css$/,loader: 'css-loader!sass-loader'},
            {test: /\.html$/,loader: 'raw-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            css: [ "src/main.css" ],
            template: 'index.html'
        }),
        new ExtractTextPlugin('/css/[name].[ext]')
    ]
};



