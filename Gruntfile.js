'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    app: {
      src: '.',
      temp: '.tmp',
      dist: 'dist',
      bower: './bower_components',
    },

    less: {
      main: {
        files: {
          '<%= app.src %>/styles/main.css': '<%= app.src %>/styles/main.less'
        }
      }
    },

    clean: {
      temp: {
        files: [{
          dot: true,
          src: [
            '<%= app.temp %>'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= app.dist %>'
          ]
        }]
      }
    },

    copy: {
      dev: {
        fonts: {
          files: [
            {
              expand: true,
              cwd: '<%= app.bower %>/font-awesome/fonts',
              src: ['**'],
              dest: '<%= app.src %>/fonts'
            }
          ]
        }
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: '<%= app.bower %>/font-awesome/fonts',
            src: ['**'],
            dest: '<%= app.dist %>/fonts'
          },
          {
            expand: true,
            cwd: '<%= app.src %>/images',
            src: ['**'],
            dest: '<%= app.dist %>/images'
          },
          {
            expand: true,
            cwd: '<%= app.src %>/i18n',
            src: ['**'],
            dest: '<%= app.dist %>/i18n'
          },
          {
            expand: true,
            cwd: '<%= app.src %>',
            src: ['index.html', 'views/**/*.html'],
            dest: '<%= app.dist %>'
          }
        ]
      }
    },

    uglify: {
      generated: {
        options: {
          mangle: false,
          report: "min"
        },
        files: [
          {
            expand: true,
            cwd: '<%= app.temp%>/concat/scripts',
            src: ['*.js'],
            dest: '<%= app.dist%>/scripts'
          }
        ]
      }
    },

    htmlmin: {
      main: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>',
          src: ['index.html', 'views/**/*.html'],
          dest: '<%= app.dist %>'
        }]
      }
    },
    
    useminPrepare: {
      html: '<%= app.src %>/index.html',
      options: {
        dest: '<%= app.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['<%= app.dist %>/index.html'],
      css: ['<%= app.dist %>/styles/*.css'],
      js: ['<%= app.dist %>/scripts/*.js'],
      options: {
        assetsDirs: ['<%= app.dist %>']
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      main: {
        src: ['<%= app.dist %>/styles/*.css', '<%= app.dist %>/scripts/*.js']
      }
    },

    connect: {
      options: {
        port: 3000,
        hostname: '*'
      },
      dev: {
        options: {
          open: true,
          livereload: 35729,
          base: '<%= app.src %>',
        }
      },
      prod: {
        options: {
          keepalive: true,
          base: '<%= app.dist %>',
        }
      }
    },

    watch: {
      dev: {
        files: ['<%= app.src %>/scripts/**/*.js', '<%= app.src %>/styles/*.js'],
        tasks: ['watch'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:temp',
    'less',
    'copy:dev',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'less',
    'copy:prod',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin',
    'htmlmin',
    'connect:prod',
    'clean:temp'
  ]);
};
