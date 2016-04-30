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
    // lint the es6 code
    eslint: {
		    target: ['src/main.js']
    },
    // convert es6 code to es5
    babel: {
      options: {
        presets: ['es2015']
      },
      dist: {
        files: {
          'dist/js/main.js': 'src/main.js'
        }
      }
    },
    // minify the es5 compliant code
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/js/main.js',
        dest: 'dist/js/main.min.js'
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s)
  grunt.registerTask('default', ['sass', 'cssmin', 'eslint', 'babel', 'uglify']);



};
