((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.scrollHandler'
    ])).done((modules, container, scrollHandler) => {
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

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);