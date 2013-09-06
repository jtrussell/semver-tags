'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    simplemocha: {
      files: ['test/**/*_test.js']
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
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'simplemocha']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'simplemocha']
      }
    }
  });

  grunt.registerTask('addGitDirForTest', function() {
    // Kinda gross but git won't check this in
    grunt.file.write(__dirname + '/test/fixtures/git-dir/.git/foo', '');
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('test', ['jshint', 'addGitDirForTest', 'simplemocha']);

  grunt.registerTask('default', ['test']);

};
