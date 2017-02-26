var ExtractTextPlugin = require('extract-text-webpack-plugin');
var serverApi = require('./srv/server-api');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    // see details here https://webpack.github.io/docs/webpack-dev-server.html#api
    devServer: { setup: serverApi },
    // see details http://webpack.github.io/docs/configuration.html#devtool
    devtool: '#inline-source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
                loader: 'css-loader'
            })
        }, 
        {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        },        
        {
            // HTML LOADER
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.(html|json)$/,
            loader: 'raw-loader'
        },
        { 
            // BABEL LOADER
            // Reference: https://babeljs.io/docs/setup/#installation
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader" 
        }]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
    ]
}

