'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// loading server
require('./server');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './src/app.js'
    ],
    output: {
        path: './public',
        filename: "/js/[name].js",
        publicPath: ''
    },
    // see details here https://webpack.github.io/docs/webpack-dev-server.html#api
    // see details http://webpack.github.io/docs/configuration.html#devtool
    //devtool: '#source-map',
    module: {
        loaders: [
            {test: /\.scss$/, loader:  ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader:'css-loader!sass-loader'})},
            {test: /\.css$/, loader:  ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader:'css-loader!sass-loader'})},
            {test: /\.html$/,loader: 'raw-loader'},
            {test: /\.(svg|woff|woff2)?(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=8192&name=./[hash].[ext]'},
            {test: /\.(eot|ttf)$/, loader: 'file-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            css: [ "src/main.css" ],
            template: 'index.html'
        }),
        new ExtractTextPlugin('/[name].css'),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            proxy: 'http://localhost:8080/'
        })
    ]
};



