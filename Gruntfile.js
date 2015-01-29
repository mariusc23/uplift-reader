'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*-test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    upmin: {
      target: {
        files: [{
          cwd: 'test/fixtures',
          src: ['**/*.html'],
          expand: true,
          dest: 'test/tmp'
        }]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
  });

  // Load this plugin's tasks
  grunt.loadTasks('tasks');

  // Test task
  grunt.registerTask('test', ['upmin', 'jshint', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['test', 'watch']);

};
