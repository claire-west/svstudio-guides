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
    }
  });

  grunt.loadTasks('./grunt');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', [ 'build_templated_pages', 'generate_fragment_preload' ]);
  grunt.registerTask('prepare-neocities', [ 'build_templated_pages', 'generate_fragment_preload', 'copy' ]);
};