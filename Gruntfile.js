'use strict'

module.exports = (grunt) => {
  grunt.initConfig({
    simplemocha: {
      files: ['test/**/*_test.js']
    },
    standard: {
      all: {
        src: '{lib/,test/}*.js'
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
    },
    bump: {
      options: {
        commitMessage: 'chore: Bump for release (v%VERSION%)',
        files: ['package.json'],
        commitFiles: ['-a'],
        push: false
      }
    }
  })

  grunt.registerTask('addGitDirForTest', () => {
    // Kinda gross but git won't check this in
    grunt.file.write(__dirname + '/test/fixtures/git-dir/.git/foo', '')
  })

  grunt.loadNpmTasks('grunt-standard')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-simple-mocha')
  grunt.loadNpmTasks('grunt-bump')

  grunt.registerTask('test', ['standard', 'addGitDirForTest', 'simplemocha'])

  grunt.registerTask('default', ['test'])
}
