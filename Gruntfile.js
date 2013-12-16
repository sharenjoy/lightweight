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
            cwd: '<%= project.app %>/vendor/easy-files/',
            src: ['**'],
            dest: '<%= project.app %>/'
          },*/ {
            expand: true,
            cwd: '<%= project.app %>/vendor/sass-bootstrap/dist/js/',
            src: ['**'],
            dest: '<%= project.app %>/js/'
          }, {
            expand: true,
            cwd: '<%= project.app %>/vendor/sass-bootstrap/dist/fonts/',
            src: ['**'],
            dest: '<%= project.app %>/fonts/'
          }, {
            expand: true,
            cwd: '<%= project.app %>/vendor/sass-bootstrap/lib/',
            src: ['**'],
            dest: '<%= project.app %>/scss/bootstrap/'
          }, {
            expand: true,
            cwd: '<%= project.app %>/vendor/font-awesome/css/',
            src: ['**'],
            dest: '<%= project.app %>/css/'
          }, {
            expand: true,
            cwd: '<%= project.app %>/vendor/font-awesome/fonts/',
            src: ['**'],
            dest: '<%= project.app %>/fonts/'
          }
        ]
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: '<%= project.app %>/scss',
          cssDir: '<%= project.app %>/css',
          imagesDir: '<%= project.app %>/images',
          javascriptsDir: '<%= project.app %>/js',
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
          sassDir: '<%= project.app %>/scss',
          cssDir: '<%= project.app %>/css',
          imagesDir: '<%= project.app %>/images',
          javascriptsDir: '<%= project.app %>/js',
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
        path: 'http://localhost/<%= pkg.name %>/<%= project.app %>',
        app: 'Safari'
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
        files: ['<%= project.app %>/scss/**/*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: true,
          port: '<%=project.port %>'
        },
        files: [
          '<%= project.app %>/**/*.{css,php,htm,html,png,jpg,jpeg,gif}'
        ]
      }
    }
  });
  
  grunt.registerTask('init', function() {
    grunt.log.writeln('Initial project');
    return (grunt.file.exists('<%= project.app %>/vendor')) || grunt.task.run('bower:install');
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
    'compass:dev',
    'open:server',
    'watch'
  ]);

  /**
   * Build for production
   */
  grunt.registerTask('pro', [
    'compass:production'
  ]);

};
