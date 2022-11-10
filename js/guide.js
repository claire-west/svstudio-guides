((dynCore) => {
    dynCore.when(dynCore.require('app.container')).done((modules, container) => {
        container('guide', {
            model: {
                title: {
                    install: 'How to Purchase, Download, and Install Synthesizer V Studio and Voice Databases',
                    phonemes: 'Entering lyrics & phonemes for better pronounciation & timing, and how to use dictionaries',
                    support: 'Contacting Customer Support'
                }
            },

            onNavTo: function(app, section, args) {
                if (app === this.title && section && this.model.title[section]) {
                    $('title').text(this.model.title[section]);
                    if (!args.length) {
                        window.scrollTo(0, 0);
                    }
                }
            }
        });
    });
})(window.dynCore);