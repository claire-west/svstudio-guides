((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel'
    ])).done((modules, fragment, globalModel) => {

        function addSrc(iframe) {
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + iframe.attributes.video.value + '?autoplay=0';
        };

        fragment.controller('frag.embed.youtube', {
            onInit: function() {
                let iframe = this.$fragment.get(0);
                if (iframe.attributes.lazy) {
                    globalModel.lazyElements.set(iframe, addSrc.bind(this, iframe));
                    iframe.removeAttribute('lazy');
                } else {
                    addSrc(iframe);
                }
            }
        });
    });
})(window.dynCore);