((dynCore) => {
    dynCore.when(
        dynCore.require([
            'app.container',
            'lib.fragment'
        ])
    ).done((modules, container, hashNav, fragment) => {
        container('guide', {
            init: function() {

            }
        });
    });
})(window.dynCore);