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
                    dicts: 'Dictionary Directory',
                    scripts: 'Script Directory',
                    issues: 'Known Issues & Workarounds',
                    glossary: 'Glossary of Terms'
                }
            },

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);