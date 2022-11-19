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
                    i18n: 'GUI Translations',
                    issues: 'Known Issues & Workarounds',
                    eula: 'Product EULA & Terms of Use',
                    glossary: 'Glossary of Terms'
                }
            },

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);