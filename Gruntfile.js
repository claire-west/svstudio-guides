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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', [ 'copy' ]);
};