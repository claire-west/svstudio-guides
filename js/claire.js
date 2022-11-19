((dynCore) => {
    dynCore.when(dynCore.require([
        'app.container',
        'app.scrollHandler'
    ])).done((modules, container, scrollHandler) => {
        container('claire', {
            model: {
                scrollTop: scrollHandler.scrollTop
            },

            onInit: scrollHandler.handleInitialScroll,
            onNavTo: scrollHandler.handleNavScroll
        });
    });
})(window.dynCore);