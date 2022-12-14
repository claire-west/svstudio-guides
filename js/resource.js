((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.scrollHandler'
    ])).done((modules, container, scrollHandler) => {
        container('resource', {
            model: {
                title: {
                    voices: 'Voice Databases for SynthV Studio',
                    phonemes: 'Phoneme Lists',
                    faq: 'Frequently Asked Questions',
                    scripts: 'Script Catalog',
                    dicts: 'Dictionary Catalog',
                    issues: 'Known Issues & Workarounds',
                    eula: 'Product EULA & Terms of Use',
                    support: 'Contacting Customer Support',
                    plugin: 'Music Production Tools',
                    glossary: 'Glossary of Terms'
                }
            },

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);