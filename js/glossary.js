((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.maintainScrollPos'
    ])).done((modules, container, maintainScrollPos) => {
        container('glossary', {
            onInit: function() {
                maintainScrollPos();
            }
        });
    });
})(window.dynCore);