((dynCore) => {
    dynCore.when(
        dynCore.require([
            'app.container'
        ])
    ).done((modules, container) => {
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