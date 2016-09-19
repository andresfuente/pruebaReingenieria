/* global module */
/*jshint esnext: true */

module.exports = function (grunt) {

    var __NAME__ = 'more-megas';

    var css_files = [
        // {
        //     './dist/styles/commons-more-megas.css': './source/sass/' + __NAME__ + '.scss'
        // }
        //
        // {
        //     './dist/styles/fdc-more-megas.css': './source/sass/fdc-' + __NAME__ + '.scss'
        // },
        //
        // {
        //     './dist/styles/pae-more-megas.css': './source/sass/pae-' + __NAME__ + '.scss'
        // },
        //
        // {
        //     './dist/styles/mbf-more-megas.css': './source/sass/mbf-' + __NAME__ + '.scss'
        // }
    ];

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        // add the specific-browser css-prefix
                        browsers: ['> 0%', 'last 2 versions']
                    })
                    // require('cssnano')()    // minify the result
                ]
            },
            // commons: {
            //     src: './dist/styles/commons-' + __NAME__ + '.css',
            //     dest: './dist/styles/commons-' + __NAME__ + '.css'
            // }
            // fdc: {
            //     src: './dist/styles/fdc-' + __NAME__ + '.css',
            //     dest: './dist/styles/fdc-' + __NAME__ + '.css'
            // },
            // pae: {
            //     src: './dist/styles/pae-' + __NAME__ + '.css',
            //     dest: './dist/styles/pae-' + __NAME__ + '.css'
            // },
            // mbf: {
            //     src: './dist/styles/mbf-' + __NAME__ + '.css',
            //     dest: './dist/styles/mbf-' + __NAME__ + '.css'
            // }
        },

        ts: {
            default: {
                tsconfig: true
            }
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
                    // 'src/**/*.js'
                    'src/**/*controller.js',
                    'src/**/*constant.js',
                    'src/**/*service.js',
                    'src/types/**/*.js',
                    'src/**/*component.js',
                    'src/**/*.module.js'
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
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },

        config: {
            js: {
                src: 'src/components/*.js',
                dist: 'src/components/'
            },

            html: {
                src: 'source/templates/*.html',
                dist: 'src/'
            }

        },

        sass: {
            options: {
                sourceMap: true,
                sourceComments: false,
                processors: [
                    //require('autoprefixer')()  // add the specific-browser css-prefix
                    // require('cssnano')()    // minify the result
                ]
            },

            dist: {
                options: {
                    style: 'compressed'
                },
                files: css_files
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
                                var p = grunt.file.read('src/source/templates/' + __NAME__ + '.html');
                                return "\"" + p + "\"";

                            }
                        }
                    ]
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-postcss');


    grunt.registerTask('str', ['string-replace']);
    grunt.registerTask('rejs', ['string-replace:js']);

    grunt.registerTask('css', ['sass:dist']);
    grunt.registerTask('build', ['css', 'postcss']);

    grunt.registerTask('default', ['string-replace:html', 'ts', 'string-replace:js', 'concat','uglify', 'build']);
};