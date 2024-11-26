module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      options: {
        esversion: 6,
        laxcomma: true,
        curly: true,
        asi: true // Allow missing semicolons
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      specs: {
        src: 'specs/**/*.js',
        options: {
          ignores: ['specs/vendor/**/*.js'],
          laxcomma: true,
          curly: true,
          esversion: 6,
          asi: true // Allow missing semicolons in specs
        }
      },
      validate: {
        // Point to the actual JavaScript file instead of using pkg.name
        src: ['validate.js'],
        options: {
          laxcomma: true,
          curly: true,
          esversion: 6,
          asi: true // Allow missing semicolons in validate files
        }
      }
    },
    
    watch: {
      jshintGruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
        options: {
          atBegin: true
        }
      },
      jshintSrc: {
        // Watch the actual JavaScript file instead of pkg.name
        files: ['validate.js'],
        tasks: ['jshint:validate'],
        options: {
          atBegin: true
        }
      },
      jshintSpecs: {
        files: 'specs/**/*.js',
        tasks: ['jshint:specs'],
        options: {
          atBegin: true
        }
      }
    },

    uglify: {
      options: {
        report: 'gzip',
        banner: '/*!\n' +
                ' * validate.js <%= pkg.version %>\n' +
                ' * http://validatejs.org/\n' +
                ' * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp\n' +
                ' * validate.js may be freely distributed under the MIT license.\n' +
                '*/\n'
      },
      dist: {
        src: 'validate.js', // Replace pkg.name with the actual source file
        dest: 'validate.min.js',
        options: {
          sourceMap: true,
          sourceMapName: 'validate.min.map'
        }
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  // Register Grunt tasks
  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', ['jshint:validate', 'uglify']);
  grunt.registerTask('test', ['jshint']);
};