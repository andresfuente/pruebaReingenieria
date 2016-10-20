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
				     'build/**/*service.js',
				     'build/**/*.js'
					 
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
            }

        }

    });

    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');	
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks("grunt-tslint");


    grunt.registerTask('ts-linter', ['ts', 'tslint']);
    grunt.registerTask('str', ['string-replace']);
    grunt.registerTask('rejs', ['string-replace:js']);

    grunt.registerTask('default', ['clean','ts','string-replace:html', 'string-replace:js', 'concat',  'uglify']);
};