module.exports = function(config) {
    config.set({
        // Load files in the browser
        files: [
            '!node_modules',
            './test/libs/jquery-3.0.0.min.js',
            // './build/test/libs/commondep.test.js',
            './test/libs/jasmine-jquery.js',
            // // Load core framework
            './node_modules/es6-shim/es6-shim.js',
            './node_modules/angular/angular.js',





            './node_modules/lodash/lodash.js',
            './node_modules/d3/d3.js',
            './node_modules/d3-axis/build/d3-axis.min.js',
            './node_modules/nvd3/build/nv.d3.js',
            './node_modules/angular-nvd3/dist/angular-nvd3.js',

            // './node_modules/orange-arq-common/dist/vendor/vendor.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './node_modules/orange-angular-router/dist/angular/router/angular1/angular_1_router.js',


            './build/test/libs/*.js',

            './build/src/**/**.js',
            './build/src/utils.service.js',

            './build/src/*.module.js',

            // Test Specs
            './build/test/src/**/**/*.js',


            {pattern: 'test/mock/*.json', watched: true, served: true, included: false}
            // { pattern: './test/mock/*.json', included: true}
        ],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'build/src/**/*.js': ['coverage']
        },

        plugins:[
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-remap-istanbul',
            //'karma-firefox-launcher',
            //'karma-chrome-launcher',
            //'karma-opera-launcher',
            //'karma-safari-launcher',
            //'karma-ie-launcher',
            //'karma-junit-reporter'
        ],


        browsers: [
            'PhantomJS'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_WARN,

        // base path, that will be used to resolve files and exclude
        basePath: '.',

        // web server port
        port: 7676,

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // Additional reporters, such as growl, junit, teamcity or coverage
        reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

        // Coverage reporters
        coverageReporter: {
            reporters: [
                // reporters not supporting the `file` property
                // { type: 'html', subdir: 'report-html' },  // Over transpiled JS
                // { type: 'lcov', subdir: 'report-lcov' },  // Over transpiled JS

                // reporters supporting the `file` property, use `subdir` to directly output them in the `dir` directory
                { type: 'json', subdir: './test-raw-reports', file: 'coverage.json' },
                { type: 'cobertura', subdir: './test-raw-reports', file: 'cobertura.txt' },
                { type: 'lcovonly', subdir: './test-raw-reports', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: './test-raw-reports', file: 'teamcity.txt' },
                { type: 'text', subdir: './test-raw-reports', file: 'text.txt' },
                { type: 'text-summary', subdir: './test-raw-reports', file: 'text-summary.txt' },
            ]
        },

        // Enable or disable colors in the output (reporters and logs).
        colors: true
    });
};
