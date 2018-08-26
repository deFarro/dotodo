// Karma configuration
// Generated on Wed Sep 20 2017 17:03:39 GMT+0300 (AST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.js': ['webpack']
    },

    webpack: {
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'jsdom': 'window',
        'cheerio': 'window'
     },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
              loader: 'babel-loader',
              options: {"presets": ["react", "env"]}
          }]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'css-loader',
              options: {sourceMap: true}
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: true}
          }]
        }]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Safari'],
    //browsers: ['Chrome'],
    //browsers: ['Firefox'],
    //browsers: ['Safari'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
