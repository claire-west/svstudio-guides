((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.maintainScrollPos'
    ])).done((modules, fragment, maintainScrollPos) => {
        fragment.controller('frag.resource.common', {
            onInit: function() {
                maintainScrollPos();
            }
        });
    });
})(window.dynCore);