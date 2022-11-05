((dynCore) => {
    dynCore.when(
        dynCore.require([
            'app.container',
            'lib.globalModel'
        ])
    ).done((modules, container, globalModel) => {
        container('home', {
            model: {

            },

            onInit: function() {

            },

            onNavTo: function(app, section) {

            }
        });
    });
})(window.dynCore);