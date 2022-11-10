((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.maintainScrollPos'
    ])).done((modules, fragment, maintainScrollPos) => {
        fragment.controller('frag.resource.common', {
            model: {
                phonemeSet: localStorage.getItem('phonemeSet') || 'en',
                setPhonemeSet: function(model) {
                    var phonemeSet = $(this).attr('data-lang');
                    localStorage.setItem('phonemeSet', phonemeSet);
                    model._set('phonemeSet', phonemeSet);
                }
            },

            onInit: function() {
                maintainScrollPos();
            }
        });
    });
})(window.dynCore);