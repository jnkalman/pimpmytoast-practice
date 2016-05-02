module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // compile sass into css
    sass: {
      dist: {
        files: {
          'dist/css/styles.css': 'sass/styles.scss'
        }
      }
    },

    // minify css
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    // lint code
    eslint: {
		    target: ['Gruntfile.js','app/**/*.js']
    },

    // minify code
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
        'dist/js/main.min.js' : 'app/main.js'
        }
      }
    },


    /* ==== Optional ES6 Support ==== */
    // switch between writing es5 or es6 code
    if: {
      target: {
        // Target-specific file lists and/or options go here.
        options: {
        // execute test function(s)
        //  test: grunt.file.isMatch('src/*![-es5].js')
          test: (function(isES6) { return false; })
        },
        //array of tasks to execute if all tests pass
        ifTrue: ['eslint', 'babel'],
        ifFalse: ['eslint']
      }
    },

    // convert es6 code to es5
    babel: {
      options: {
        presets: ['es2015'],
        ignore: '.*\-es5\.js'
      },
      dist: {
        files: {
          'dist/js/main.js': 'app/main.js'
        }
      }
    },
    /* ==== END Optional ES6 Support ==== */

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-if');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s)
  grunt.registerTask('default', ['sass', 'cssmin', 'if', 'uglify']);



};
