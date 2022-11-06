((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel'
    ])).done((modules, fragment, globalModel) => {
        fragment.controller('frag.common', {
            onInit: function() {
                var scrollY = globalModel._get('scrollY');
                if (scrollY) {
                    // wait for end of execution queue
                    globalModel._set('scrollY', null);
                    setTimeout(() => {
                        window.scrollTo(0, scrollY);
                    }, 0);
                }
            }
        });
    });
})(window.dynCore);