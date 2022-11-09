((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'lib.hashNav',
        'lib.fragment'
    ])).done((modules, container, hashNav, fragment) => {
        var titles = {
            faq: 'Frequently Asked Questions',
            scripts: 'Script Directory',
            dicts: 'Dictionary Directory',
            phonemes: 'Phoneme Lists',
            glossary: 'Glossary of Terms'
        };

        container('resource', {
            onNavTo: function(app, section) {
                if (app === 'resource' && section) {
                    if (titles[section]) {
                        $('title').text(titles[section]);
                    }
                }
            }
        });
    });
})(window.dynCore);