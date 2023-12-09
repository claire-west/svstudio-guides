((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel'
    ])).done((modules, fragment, globalModel) => {

        function addSrc(iframe, video) {
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + video + '?autoplay=0';
        };

        fragment.controller('frag.embed.youtube', {
            onInit: function() {
                let container = this.$fragment.get(0);
                let iframe = container.firstElementChild;
                let video = container.attributes.video.value;
                container.removeAttribute('video');

                if (container.attributes.lazy) {
                    globalModel.lazyElements.set(iframe, addSrc.bind(this, iframe, video));
                    container.removeAttribute('lazy');
                } else {
                    addSrc(iframe, video);
                }
            }
        });
    });
})(window.dynCore);