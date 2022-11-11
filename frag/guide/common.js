((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.scrollHandler'
    ])).done((modules, fragment, scrollHandler) => {
        fragment.controller('frag.guide.common', {
            onInit: scrollHandler.handleInitialScroll
        });
    });
})(window.dynCore);