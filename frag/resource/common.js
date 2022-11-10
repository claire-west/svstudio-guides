((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.maintainScrollPos'
    ])).done((modules, fragment, maintainScrollPos) => {
        fragment.controller('frag.resource.common', {
            model: {
                phonemeSet: localStorage.getItem('phonemeSet') || 'en',
                setEnglish: function(model) {
                    localStorage.setItem('phonemeSet', 'en');
                    model._set('phonemeSet', 'en');
                },
                setJapanese: function(model) {
                    localStorage.setItem('phonemeSet', 'jp');
                    model._set('phonemeSet', 'jp');
                },
                setChinese: function(model) {
                    localStorage.setItem('phonemeSet', 'zh');
                    model._set('phonemeSet', 'zh');
                }
            },

            onInit: function() {
                maintainScrollPos();
            }
        });
    });
})(window.dynCore);