module.exports = function(config) {
    config.set({
        // logLevel: config.LOG_DEBUG,

        frameworks: [
            'jasmine'
        ],
        browsers: [
            'PhantomJS'
        ],

        files: [
            './spec.bundle.js'
        ],

        preprocessors: {
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            './spec.bundle.js': ['webpack', 'sourcemap']
        },

        webpack: require('./webpack.config'),

        singleRun: true,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // show only errors in log
            stats: 'errors-only'
        }        
    });
};