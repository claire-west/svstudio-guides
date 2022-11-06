((dynCore) => {
    dynCore.when(
        dynCore.require([
            'app.container',
            'lib.hashNav',
            'lib.fragment'
        ])
    ).done((modules, container, hashNav, fragment) => {
        var titles = {
            install: 'How to Purchase, Download, and Install Synthesizer V Studio and Voice Databases'
        }

        container('guide', {
            onInit: function() {
                hashNav.bindNavSection(function(app, section) {
                    if (app === 'guide' && section) {
                        if (titles[section]) {
                            $('title').text(titles[section]);
                        }
                    }
                });
            }
        });
    });
})(window.dynCore);