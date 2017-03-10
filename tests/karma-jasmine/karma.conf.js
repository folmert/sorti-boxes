// Karma configuration
// Generated on Wed Nov 09 2016 10:20:13 GMT+0100 (W. Europe Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-ajax', 'jasmine-jquery', 'jasmine', 'fixture'],


        // list of files / patterns to load in the browser
        files: [
            'spec/mock-ajax.js',
            '../mocks/data.js',

            // dependencies
            'https://code.jquery.com/jquery-3.1.1.min.js',

            // actual code
            '../../dist/js/sorti-boxes.js',

            // tests
            'spec/test.js',

            // fixtures
            {pattern: 'spec/fixtures/*.html', included: false, served: true, watched: true}
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: [{'spec/fixtures/**/*.html': ''}],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'log-reporter'],

        "logReporter": {
            "outputPath":  "test/some/path/",
            "logFileName": "logfile.log",
            "filter_key":  "log-filter"
        },

        // web server port
        port: 9876,

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine-jquery',
            'karma-jasmine-ajax',
            'karma-jasmine',
            'karma-fixture',
            'karma-log-reporter',
            'karma-chrome-launcher',
        ],


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        client: {
            useIframe: false
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};