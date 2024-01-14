module.exports = function(grunt) {
  var isWindows = process.platform === 'win32';

  grunt.registerMultiTask('build_preload', 'Prepares a preload file', function() {
    var ns = this.options().namespace;
    var unixifyPath = function(filepath) {
      if (isWindows) {
        return filepath.replace(/\\/g, '/');
      } else {
        return filepath;
      }
    };

    var modules = [];
    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        src = unixifyPath(src);
        if (!src.includes('preload.min.js')) {
          const srcParts = src.split('/');
          srcParts[srcParts.length - 1] = srcParts[srcParts.length - 1].replace('.js', '');
          srcParts.splice(0, 2);
          const modulePath = ns + '.' + srcParts.join('.');
          modules.push('        \'' + modulePath + '\': () => { ' + grunt.file.read(src) + ' }');
        }
      });
    });

    var file =
    '((dynCore) => {\n' +
    '    dynCore.register({\n' +
        modules.join(',\n') + '\n' +
    '    });\n' +
    '})(window.dynCore);';

    var destFile = this.options().dest + 'preload.min.js';
    grunt.file.write(this.options().dest + 'preload.min.js', file);
    grunt.log.writeln(destFile);
  });
};