((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.scrollHandler'
    ])).done((modules, container, scrollHandler) => {
        container('guide', {
            model: {
                title: {
                    install: 'How to Purchase, Download, and Install Synthesizer V Studio and Voice Databases',
                    phonemes: 'Entering lyrics & phonemes for better pronunciation & timing, and how to use dictionaries',
                    pitchdeviation: 'All About Pitch Deviation, Vibrato, and Instant Mode'
                }
            },

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);