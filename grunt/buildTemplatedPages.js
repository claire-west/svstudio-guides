module.exports = function(grunt) {
  var isWindows = process.platform === 'win32';
  var regex = /@@(.*)/g;
  var placeholderPrefix = '@@';
  var titlePrefix = 'SynthV.info - ';
  var dir = 'template/';
  var manifest = dir + 'manifest.json';
  var defaultTemplate = dir + 'template.html';
  var htmlExt = '.html';

  grunt.registerMultiTask('build_templated_pages', 'Uses manifest.json to perform template substitution for web hosts that don\'t support URL rewriting', function() {
    manifest = grunt.file.read(manifest);
    manifest = JSON.parse(manifest);

    for (let route in manifest) {
      let dest = route;
      if (!dest.endsWith(htmlExt)) {
        dest += htmlExt;
      }

      let template = dir + dest;
      if (!grunt.file.exists(template)) {
        template = defaultTemplate;
      }
      let content = grunt.file.read(template);
      let thisRoute = manifest[route];
      console.log(route, thisRoute)
      for (let placeholder in thisRoute) {
        let value = thisRoute[placeholder];
        console.log(placeholderPrefix + placeholder, value)
        if (grunt.file.exists(value)) {
          value = grunt.file.read(value);
        }
        content = content.replace(placeholderPrefix + placeholder, value);
      }

      grunt.file.write(dest, content);
      grunt.log.writeln(dest);
    }
  });
};