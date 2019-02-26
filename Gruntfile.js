/* global module */
/*jshint esnext: true */

module.exports = function (grunt) {
    const sass = require('node-sass');
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        shortName: grunt.file.readJSON('package.json').name.replace('orange-', ''),

        clean: {
            dev: ['./.tscache', './build/*', './prebuild/*', './dist/*', './.sonar', './.scannerwork'],
            coverage: ['./coverage'],
            css: ['./src/styles/css/*', './dist/styles/css/*', '!./src/styles/css/animate.css'],
            reports: ['./scss-lint-report.xml'],
            artifacts: ['./*.zip'],
            tempTs: ['./*tmp.txt']
        },

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
            commons: {
                src: './dist/styles/commons-<%= shortName %>.css',
                dest: './dist/styles/commons-<%= shortName %>.css'
            },
            fdc: {
                src: './dist/styles/fdc-<%= shortName %>.css',
                dest: './dist/styles/fdc-<%= shortName %>.css'
            },
            pae: {
                src: './dist/styles/pae-<%= shortName %>.css',
                dest: './dist/styles/pae-<%= shortName %>.css'
            },
            mbf: {
                src: './dist/styles/mbf-<%= shortName %>.css',
                dest: './dist/styles/mbf-<%= shortName %>.css'
            },
            pdv: {
                src: './dist/styles/pdv-<%= shortName %>.css',
                dest: './dist/styles/pdv-<%= shortName %>.css'
            },
            altamira: {
                src: './dist/styles/altamira-<%= shortName %>.css',
                dest: './dist/styles/altamira-<%= shortName %>.css'
            },
            wdt: {
                src: './dist/styles/wdt-<%= shortName %>.css',
                dest: './dist/styles/wdt-<%= shortName %>.css'
            },
            kyc: {
                src: './dist/styles/kyc-<%= shortName %>.css',
                dest: './dist/styles/kyc-<%= shortName %>.css'
            },
        },

        sass: {
            options: {
                sourceMap: true,
                sourceComments: false,
                implementation: sass
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/commons-<%= shortName %>.css': './src/sass/<%= shortName %>.scss'
                }
            },
            fdc: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/fdc-<%= shortName %>.css': './src/sass/fdc-<%= shortName %>.scss'
                }
            },
            mbf: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/commons-<%= shortName %>.css': './src/sass/mbf-<%= shortName %>.scss'
                }
            },
            pae: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/pae-<%= shortName %>.css': './src/sass/pae-<%= shortName %>.scss'
                }
            },
            pdv: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/pdv-<%= shortName %>.css': './src/sass/pdv-<%= shortName %>.scss'
                }
            },
            altamira: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/commons-<%= shortName %>.css': './src/sass/pae-<%= shortName %>.scss'
                }
            },
            wdt: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/wdt-<%= shortName %>.css': './src/sass/wdt-<%= shortName %>.scss'
                }
            },
            kyc: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './dist/styles/kyc-<%= shortName %>.css': './src/sass/kyc-<%= shortName %>.scss'
                }
            },
        },

        ts: {
            default: {
                tsconfig: true
            }
        },

        config: {
            js: {
                src: 'build/**/components/*.component.js',
                dist: 'build/'
            },
            html: { // Se indica de donde coger los ficheros HTML y dónde se deben depositar
                src: 'src/templates/*.html',
                dist: 'build/'
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
                    'build/**/*constant.js',
                    'build/**/*.model.js',
                    'build/**/*.filter.js',
                    'build/**/*service.js',
                    'build/**/*directive.js',
                    'build/**/*controller.js',
                    'build/types/**/*.js',
                    'build/**/*component.js',
                    'build/**/*.module.js',
                    '!build/test/**/*.js',
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        copy: {
            img: {
                src: './src/images/examples/<%= pkg.name %>.png',
                dest: './dist/images/examples/orange-p<%= pkg.name%>.png'
            },
            sass: {
                expand: true,
                cwd: './src/sass/',
                src: '*.scss',
                dest: './dist/stylesSCSS/'
            }
        },

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
                        "json": "./coverage/test-raw-reports/coverage-final.json",
                        "lcovonly": "./coverage/lcov-report/lcov.info"
                    }
                }
            }
        },

        coverage: {
            check: {
                options: {
                    thresholds: {
                        branches: 10,
                        functions: 10,
                        lines: 10,
                        statements: 10
                    },
                    dir: "./coverage"
                }
            }
        },

        'string-replace': { // Ejemplos de uso en la web oficial https://www.npmjs.com/package/grunt-string-replace
            html: {
                files: { // Definición de qué archivos se van a editar
                    '<%= config.html.dist %>': '<%= config.html.src %>'
                },
                options: { // Definición de los patrones de reemplazo para dejar en una única línea el contenido del HTML
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
                files: { // Ficheros que van a ser editados
                    '<%= config.js.dist %>': '<%= config.js.src %>'
                },
                options: {
                    replacements: [
                        {
                            pattern: /(templateUrl)/ig,
                            replacement: 'template'
                        },

                        {
                            pattern: /(')(\/*)(tpls)(.*)(html')/ig,
                            replacement: function (match, p1) {
                                // Dentro de la función deja utilizar <%= shortName %> y hay que sacarlo de nuevo
                                var name = grunt.file.readJSON('package.json').name.replace('orange-', '');
                                var p = grunt.file.read('build/src/templates/'+ name + '.html');
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

        dtsGenerator: {
            options: {
                exclude: ['node_modules/**', 'typings/**', 'test/**/**'],
                name: '<%= shortName %>',
                project: './',
                out: 'dist/typings/<%= shortName %>.d.ts'
            },
            default: {
                src: ['/path/to/package-directory/**/*.ts']
            }
        },
        
        /**
         * NgDocs: tarea que genera documentación del código en base a las notaciones en los ficheros desarrollados
         */
        ngdocs: {
            options: {
                dest: 'docs/<%= shortName %>/' + '<%= shortName %>@' + require('./package.json').version,
                title: '<%= shortName %>',
                sourceLink: true,
                startPage: '/modules'
            },
            components: {
                src: ['build/src/components/**/*.js'],
                title: 'Componentes'
            },
            services: {
                src: ['build/src/services/**/*.js'],
                title: 'Servicios'
            },
            filters: {
                src: ['build/src/filters/**/*.js'],
                title: 'Filtros'
            },
            controllers: {
                src: ['build/src/controllers/**/*.js'],
                title: 'Controladores'
            },
            modules: {
                src: ['build/src/*.module.js'],
                title: 'Modulo'
            }
        }

    });
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
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

    grunt.registerTask('str', ['string-replace']);
    grunt.registerTask('rejs', ['string-replace:js']);

    grunt.registerTask('ts-linter', ['ts', 'tslint']);
    grunt.registerTask('test-with-linter', ['ts-linter', 'karma:unit']);
    grunt.registerTask('quality-code', ['clean', 'ts-linter', 'string-replace', 'test-with-linter', 'remapIstanbul', 'coverage']);

    grunt.registerTask('build-css', ['sass', 'postcss']);
    grunt.registerTask('test', ['string-replace:dist', 'karma:unit']);  // ['jshint', 'karma']
    grunt.registerTask('generate-coverage-report', ['test', 'remapIstanbul', 'coverage']);
    grunt.registerTask('dts-generate', ['dtsGenerator']);
    grunt.registerTask('genDocs', ['clean', 'ts', 'ngdocs']);
    grunt.registerTask('default', ['clean', 'string-replace:html', 'ts', 'string-replace:js', 'concat', 'dts-generate','uglify','build-css', 'copy']);
    grunt.registerTask('build', ['clean',  'ts', 'string-replace:html', 'string-replace:js', 'concat', 'dts-generate','build-css', 'copy']);
};
