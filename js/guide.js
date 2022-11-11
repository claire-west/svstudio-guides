((dynCore) => {
    dynCore.when(dynCore.require('app.container')).done((modules, container) => {
        container('guide', {
            model: {
                title: {
                    install: 'How to Purchase, Download, and Install Synthesizer V Studio and Voice Databases',
                    phonemes: 'Entering lyrics & phonemes for better pronunciation & timing, and how to use dictionaries',
                    support: 'Contacting Customer Support'
                }
            },

            onNavTo: function(app, section, args) {
                if (app === this.title && section && this.model.title[section]) {
                    $('title').text(this.model.title[section]);
                    if (!args.length) {
                        window.scrollTo(0, 0);
                    } else {
                        // looking for the id normally doesn't work if it has a / in it
                        var $heading = this.$app.find('[id="' + window.location.hash.substr(1) + '"]');
                        if ($heading.length) {
                            window.scrollTo(0, $heading.offset().top - 20);
                        }
                    }
                }
            }
        });
    });
})(window.dynCore);