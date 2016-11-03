/* global module */
/*jshint esnext: true */

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default: {
                tsconfig: true
            }
        },
        clean: {
            dev: ['./.tscache', './build', './dist']
        },

        concat: {
            options: {
                banner: '/**************************************************************************\n' +
                '* <%= pkg.title || pkg.name %>, ' +
                'v<%= pkg.version %>; ' +
                '<%= pkg.license %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '**************************************************************************/\n',
                stripBanners: true
            },

            dist: {
                src: [
                    'build/src/**/*service.js',
                    'build/src/**/**.js',
					
                    '!build/test/**/**'

                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        copy: {},

        uglify: {
            options: {
                mangle: false
            },
            min: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            afterconcat: ['dist/<%= pkg.name %>.js'],
            files: ['Gruntfile.js', 'build/**/*.js', 'test/**/*.js']
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },

        config: {
            js: {
                src: 'build/components/*.js',
                dist: 'build/'
            },

            html: {
                src: 'src/templates/*.html',
                dist: 'build/'
            }

        },

        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: [
                    "src/**/*.ts"
                ]
            }
        },


        'string-replace': {
            html: {
                files: {
                    '<%= config.html.dist %>': '<%= config.html.src %>'
                },
                options: {
                    replacements: [
                        {
                            pattern: /(")/ig,
                            replacement: '\\\"'
                        },

                        {
                            pattern: /\r?\n|\r/g,
                            replacement: ''
                        }
                    ]
                }
            },
            js: {
                files: {
                    '<%= config.js.dist %>': '<%= config.js.src %>'
                },
                options: {
                    replacements: [
                        {
                            pattern: /(templateUrl)/ig,
                            replacement: 'template'
                        },

                        {
                            pattern: /('tpls.*')/ig,
                            replacement: function (match, p1) {
                                var p = grunt.file.read('build/src/templates/' + __NAME__ + '.html');
                                return "\"" + p + "\"";

                            }
                        }
                    ]
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '**/*',
                    dest: 'build/'
                }],
                options: {
                    replacements: [{
                        pattern: /(}\)\()(.*\|\|.*;)/g,
                        replacement: '$1/* istanbul ignore next */$2'
                    }]
                }
            }

        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        remapIstanbul: {
            dist: {
                src: "./coverage/test-raw-reports/coverage.json",
                options: {
                    fail: true,
                    reports: {
                        "html": "./coverage/lcov-report",
                        "json": "./coverage/test-raw-reports/coverage-final.json"
                    }
                }
            }
        },

        coverage: {
            check: {
                options: {
                    thresholds: {
                        branches: 70,
                        functions: 70,
                        lines: 70,
                        statements: 70
                    },
                    dir: "./coverage"
                }
            }
        },

        dtsGenerator: {
            options: {
                exclude: ['node_modules/**', 'typings/**', 'test/**/**'],
                name: 'services',
                project: './',
                out: 'dist/typings/services.d.ts'
            },
            default: {
                src: ['/path/to/package-directory/**/*.ts']
            }
        }

    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('remap-istanbul');
    grunt.loadNpmTasks('grunt-istanbul-coverage');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('dts-generator');
    grunt.loadNpmTasks('grunt-ngdocs');


    grunt.registerTask('ts-linter', ['ts', 'tslint']);
    grunt.registerTask('str', ['string-replace']);
    grunt.registerTask('rejs', ['string-replace:js']);

    grunt.registerTask('test', ['string-replace:dist', 'karma:unit']);  // ['jshint', 'karma']
    grunt.registerTask('generate-coverage-report', ['clean:coverage', 'test', 'remapIstanbul', 'coverage']);
    grunt.registerTask('dts-generate', ['dtsGenerator']);

    grunt.registerTask('default', ['clean', 'ts', 'string-replace:html', 'string-replace:js', 'concat', 'uglify', 'dts-generate']);
};