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
                var $home = $('#home');
                if ($home.length) {
                    $home.detach().appendTo(this.$app);
                    $('#home').remove();
                }
            },

            onNavTo: function(app, section) {

            }
        });
    });
})(window.dynCore);