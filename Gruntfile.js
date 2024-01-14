module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      deploy: {
        src: [
          'css/**',
          'frag/**',
          'html/**',
          'img/**',
          'js/**',
          '*.html',
          '*.ico',
          'sitemap.txt'
        ],
        dest: 'deploy/',
        expand: true
      }
    },
    build_templated_pages: {
      build: {}
    },
    generate_fragment_preload: {
      options: {
        dest: 'js/fragPreload.js'
      },
      files: {
        src: [
          'frag/**/*.html'
        ],
        dest: 'js/',
        expand: true
      }
    },
    uglify: {
      app: {
        expand: true,
        src: [ 'js/**/*.js' ],
        dest: 'build'
      },
      frag: {
        expand: true,
        src: [ 'frag/**/*.js' ],
        dest: 'build'
      }
    },
    build_preload: {
      app: {
        options: {
          dest: 'js/',
          namespace: 'app'
        },
        cwd: 'build',
        src: [ 'js/**/*.js' ],
        expand: true
      },
      frag: {
        options: {
          dest: 'frag/js/',
          namespace: 'frag'
        },
        cwd: 'build',
        src: [ 'frag/**/*.js' ],
        expand: true
      }
    }
  });

  grunt.loadTasks('./grunt');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', [ 'build_templated_pages', 'generate_fragment_preload', 'uglify:app', 'uglify:frag', 'build_preload:app', 'build_preload:frag' ]);
  grunt.registerTask('test', [ 'uglify:app', 'uglify:frag', 'build_preload:app', 'build_preload:frag' ]);
  grunt.registerTask('prepare-neocities', [ 'build_templated_pages', 'generate_fragment_preload', 'uglify:app', 'uglify:frag', 'build_preload:app', 'build_preload:frag', 'copy' ]);
};