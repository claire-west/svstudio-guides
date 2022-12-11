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
                $('#home > section').detach().appendTo(this.$app);
                $('#home').remove();
            },

            onNavTo: function(app, section) {

            }
        });
    });
})(window.dynCore);