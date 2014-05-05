/*!
 * Lightweight
 * http://sharenjoy.com.tw
 * @author Ronald Jian
 */

'use strict';

/**
 * Grunt module
 */
module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  
  /**
   * FireShell Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      app: 'app',
      cmsharenjoy: 'vendor/sharenjoy/cmsharenjoy/src',
      asset: 'assets',
      root: 'public',
      port: 80
    },

    bower: {
      install: {
        options: {
          cleanup: false,
          install: true,
          verbose: true,
          copy: false
        }
      },
      cleanup: {
        options: {
          cleanup: true,
          verbose: true,
          install: false,
          copy: false
        }
      }
    },

    copy: {
      dev: {
        files: [
          /*{
            expand: true,
            cwd: '<%= project.asset %>/vendor/easy-files/',
            src: ['**'],
            dest: '<%= project.root %>/'
          },*/ {
            expand: true,
            cwd: '<%= project.asset %>/vendor/bootstrap-sass-official/vendor/assets/javascripts/',
            src: ['**'],
            dest: '<%= project.root %>/js/'
          }, {
            expand: true,
            cwd: '<%= project.asset %>/vendor/bootstrap-sass-official/vendor/assets/fonts/bootstrap/',
            src: ['**'],
            dest: '<%= project.root %>/fonts/'
          }, {
            expand: true,
            cwd: '<%= project.asset %>/vendor/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap',
            src: ['**'],
            dest: '<%= project.root %>/scss/bootstrap/'
          }, {
            expand: true,
            cwd: '<%= project.asset %>/vendor/font-awesome/css/',
            src: ['**'],
            dest: '<%= project.root %>/css/font-awesome/'
          }, {
            expand: true,
            cwd: '<%= project.asset %>/vendor/font-awesome/fonts/',
            src: ['**'],
            dest: '<%= project.root %>/fonts/'
          }
        ]
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: '<%= project.root %>/scss',
          cssDir: '<%= project.root %>/css',
          imagesDir: '<%= project.root %>/images',
          javascriptsDir: '<%= project.root %>/js',
          outputStyle: 'expanded',    //# output_style = :expanded or :nested or :compact or :compressed
          relativeAssets: true,
          noLineComments: true,
          debugInfo: false,
          environment: 'development'
        }
      },
      production: {
        options: {
          force: true,
          sassDir: '<%= project.root %>/scss',
          cssDir: '<%= project.root %>/css',
          imagesDir: '<%= project.root %>/images',
          javascriptsDir: '<%= project.root %>/js',
          outputStyle: 'compressed',
          relativeAssets: true,
          noLineComments: true,
          environment: 'production'
        }
      }
    },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost/<%= pkg.name %>/<%= project.root %>',
        app: 'Firefox'    //Google Chrome, Firefox, Safari
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      sass: {
        files: ['<%= project.root %>/scss/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['<%= project.root %>/*.{html,htm}'],
        options: {
          livereload: true
        }
      },
      php: {
        files: [
          '<%= project.cmsharenjoy %>/**/*.php',
          '<%= project.app %>/**/*.php',
          '<%= project.root %>/**/*.php'
        ],
        options: {
          livereload: true
        }
      }
      // ,
      // livereload: {
      //   options: {
      //     livereload: true,
      //     port: '<%=project.port %>'
      //   },
      //   files: [
      //     '<%= project.root %>/**/*.{css,php,htm,html,png,jpg,jpeg,gif}'
      //   ]
      // }
    }
  });
  
  grunt.registerTask('init', function() {
    grunt.log.writeln('Initial project');
    return (grunt.file.exists('<%= project.asset %>/vendor')) || grunt.task.run('bower:install');
  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'init',
    'copy:dev',
    'compass:dev',
    'open:server',
    'watch'
  ]);

  /**
   * Install bower
   */
  grunt.registerTask('install', [
    'bower:install'
  ]);

  /**
   * Build for development
   */
  grunt.registerTask('dev', [
    'watch'
  ]);

  /**
   * Build for production
   */
  grunt.registerTask('pro', [
    'compass:production'
  ]);

};
