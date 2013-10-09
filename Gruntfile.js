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

    compass: {
      dev: {
        options: {
          sassDir: '<%= project.app %>/sass',
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
      release: {
        options: {
          force: true,
          sassDir: '<%= project.app %>/sass',
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
        files: ['<%= project.app %>/**/*.scss'],
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
          '<%= project.app %>/**/*.{php,htm,html,png,jpg,jpeg,gif}'
        ]
      }
    }
  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'compass:dev',
    'open:server',
    'watch'
  ]);

};
