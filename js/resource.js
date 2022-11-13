((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.scrollHandler'
    ])).done((modules, container, scrollHandler) => {
        container('resource', {
            model: {
                title: {
                    phonemes: 'Phoneme Lists',
                    faq: 'Frequently Asked Questions',
                    scripts: 'Script Catalog',
                    dicts: 'Dictionary Catalog',
                    issues: 'Known Issues & Workarounds',
                    glossary: 'Glossary of Terms'
                }
            },

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);