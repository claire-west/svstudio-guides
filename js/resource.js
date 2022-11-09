((dynCore) => {
    dynCore.when(dynCore.require('app.container')).done((modules, container) => {
        container('resource', {
            model: {
                title: {
                    faq: 'Frequently Asked Questions',
                    issues: 'Known Issues & Workarounds',
                    scripts: 'Script Directory',
                    dicts: 'Dictionary Directory',
                    phonemes: 'Phoneme Lists',
                    glossary: 'Glossary of Terms'
                }
            },

            onNavTo: function(app, section) {
                if (app === this.title && section && this.model.title[section]) {
                    $('title').text(this.model.title[section]);
                    window.scrollTo(0, 0);
                }
            }
        });
    });
})(window.dynCore);