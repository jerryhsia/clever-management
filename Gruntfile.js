'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    app: {
      src: '.',
      temp: '.temp',
      dist: '.dist'
    },

    watch: {
      /*js: {
        files: [
          '<%= app.src %>/scripts/*.js',
          '<%= app.src %>/scripts/controllers/*.js',
          '<%= app.src %>/scripts/services/*.js'
        ],
        tasks: ['watch:js'],
        options: {
          livereload: true
        }
      },*/
      less: {
        files: ['<%= app.src %>/styles/**/*.less'],
        tasks: ['less:dev', 'concat:dev', 'watch:less']
      }
    },

    clean: {
      dev: {
        files: [{
          dot: true,
          src: [
            '<%= app.temp %>',
            '<%= app.src %>/styles/*.css'
          ]
        }]
      },
      temp: {
        files: [{
          dot: true,
          src: [
            '<%= app.temp %>'
          ]
        }]
      }
    },

    less: {
      dev: {
        files: {
          '<%= app.temp %>/styles/bootstrap.css': '<%= app.src %>/bower_components/bootstrap/less/bootstrap.less',
          '<%= app.temp %>/styles/main.css': '<%= app.src %>/styles/main.less'
        }
      }
    },

    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts',
            src: ['**'],
            dest: '<%= app.src %>/fonts/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/fonts',
            src: ['**'],
            dest: '<%= app.src %>/fonts/'
          }
        ]
      }
    },

    concat: {
      options: {
        separator: "\n"
      },
      dev: {
        files: {
          '<%= app.src %>/styles/main.css': [
            '<%= app.temp %>/styles/bootstrap.css',
            '<%= app.temp %>/styles/main.css'
          ]
        }
      }
    }
  });

  grunt.registerTask('serve', function () {
    grunt.task.run([
      'clean:dev',
      'less:dev',
      'concat:dev',
      'copy:dev',
      'clean:temp',
      'watch'
    ]);
  });
};
