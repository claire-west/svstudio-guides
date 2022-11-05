((dynCore) => {
    dynCore.when(
        dynCore.require([
            'app.container',
            'lib.globalModel'
        ])
    ).done((modules, container, globalModel) => {
        container('app', {
            model: {

            },

            onInit: function() {

            },

            onNavTo: function(app, section) {

            }
        });
    });
})(window.dynCore);