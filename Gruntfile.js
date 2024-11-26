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
        src: '<%= pkg.name %>',
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
        files: '<%= pkg.name %>',
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
      },
      specs: {
        files: ['specs/**/*.js', '<%= pkg.name %>'],
        tasks: ['jasmine:specs', 'jasmine:coverage'],
        options: {
          atBegin: true
        }
      }
    },
    jasmine: {
      specs: {
        src: "<%= pkg.name %>",
        options: {
          keepRunner: true,
          vendor: "specs/vendor/**/*.js",
          specs: "specs/**/*-spec.js",
          helpers: "specs/helpers.js",
          display: "short",
          summary: true
        }
      },
      coverage: {
        src: "<%= jasmine.specs.src %>",
        options: {
          vendor: "<%= jasmine.specs.options.vendor %>",
          specs: "<%= jasmine.specs.options.specs %>",
          helpers: "<%= jasmine.specs.options.helpers %>",
          display: "none",
        }
      }
    },
    jsdoc: {
      dist: {
        src: ['<%= pkg.name %>', 'README.md'],
        options: {
          destination: 'docs',
          template: "node_modules/jsdoc/templates/default"
        }
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        banner: '/*!\n' +
                ' * <%= pkg.name %> <%= pkg.version %>\n' +
                ' * http://validatejs.org/\n' +
                ' * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp\n' +
                ' * <%= pkg.name %> may be freely distributed under the MIT license.\n' +
                '*/\n'
      },
      dist: {
        src: "<%= pkg.name %>",
        dest: "validate.min.js",
        options: {
          sourceMap: true,
          sourceMapName: 'validate.min.map'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', ['jshint:validate', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine']);
};
