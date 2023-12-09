((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel'
    ])).done((modules, fragment, globalModel) => {

        function addSrc(iframe, video, autoplay) {
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + video + '?t=0&autoplay=' + (autoplay ? '1' : '0');
        };

        fragment.controller('frag.embed.youtube', {
            onInit: function() {
                let container = this.$fragment.get(0);
                let iframe = container.firstElementChild;
                let video = container.attributes.video ? container.attributes.video.value : this.model._parent.video;
                container.removeAttribute('video');
                let autoplay = Boolean(container.attributes.autoplay);
                container.removeAttribute('autoplay');

                let fn = addSrc.bind(this, iframe, video, autoplay);
                if (container.attributes.lazy) {
                    globalModel.lazyElements.set(iframe, fn);
                    container.removeAttribute('lazy');
                } else {
                    fn();
                }
            }
        });
    });
})(window.dynCore);