module.exports = function(grunt) {
  const isWindows = process.platform === 'win32';
  function unixifyPath(filepath) {
    if (isWindows) {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  const template = "((dynCore) => {\n" +
    "    dynCore.declare('app.fragPreload', dynCore.require([\n" +
    "        'lib.fragment'\n" +
    "    ]), (modules, fragment) => {\n\n" +
    "        {lines}\n\n" +
    "        return fragment;\n" +
    "    });\n" +
    "})(window.dynCore);";

  grunt.registerMultiTask('generate_fragment_preload', 'Prepares a preload file for HTML fragments', function() {

    const dest = this.options().dest;
    const lines = [];

    this.files.forEach(function(filePair) {
      filePair.src.forEach(function(src) {
        src = unixifyPath(src);
        const srcParts = src.split('/');
        srcParts[srcParts.length - 1] = srcParts[srcParts.length - 1].replace('.html', '');
        const fragmentPath = srcParts.join('.');
        if (!fragmentPath.includes('phonemes')) {
          grunt.log.writeln(fragmentPath);
          const fileContents = grunt.file.read(src);
          lines.push(`fragment.preload('${fragmentPath}', \`${fileContents}\`);`);
        }
      });
    });

    const result = template.replace('{lines}', lines.join('\n        '));

    grunt.file.write(dest, result);
    grunt.log.writeln(dest);
  });
};