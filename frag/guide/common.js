((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.maintainScrollPos'
    ])).done((modules, fragment, maintainScrollPos) => {
        fragment.controller('frag.guide.common', {
            onInit: function() {
                maintainScrollPos();
            }
        });
    });
})(window.dynCore);