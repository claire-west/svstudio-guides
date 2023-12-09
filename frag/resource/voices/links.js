((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment'
    ])).done((modules, fragment) => {
        fragment.controller('frag.resource.voices.links', {
            onInit: function() {
                let element = this.$fragment.get(0);

                let eula = element.attributes.eula.value;
                if (eula === 'dreamtonics') {
                    eula = 'https://dreamtonics.com/terms/';
                } else if (eula === 'ahs') {
                    eula = 'https://www.ah-soft.com/synth-v/eula_e.html';
                }

                let wiki = element.attributes.wiki.value;
                if (!wiki.includes('http')) {
                    wiki = 'https://synthv.fandom.com/wiki/' + wiki + '_(Synthesizer_V_Studio)';
                }

                let vocadb = 'https://vocadb.net/Ar/' + element.attributes.vocadb.value;
                let characterguidelines = element.attributes.characterguidelines ? element.attributes.characterguidelines.value : null;

                this.model._set('url', {
                    eula: eula,
                    wiki: wiki,
                    vocadb: vocadb,
                    characterguidelines: characterguidelines
                });

                element.removeAttribute('eula');
                element.removeAttribute('wiki');
                element.removeAttribute('vocadb');
            }
        });
    });
})(window.dynCore);