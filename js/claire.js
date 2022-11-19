((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.scrollHandler'
    ])).done((modules, container, scrollHandler) => {
        container('claire', {
            model: {

            },

            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);