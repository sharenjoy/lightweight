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
    'compass:dev',
    'open:server',
    'watch'
  ]);

  /**
   * Build for development
   */
  grunt.registerTask('build:dev', [
    'compass:dev'
  ]);

  /**
   * Build for production
   */
  grunt.registerTask('build:production', [
    'compass:production'
  ]);

};
