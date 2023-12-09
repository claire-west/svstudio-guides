((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel'
    ])).done((modules, fragment, globalModel) => {

        function addSrc(iframe) {
            console.warn(iframe);
            iframe.src = '//player.bilibili.com/player.html?bvid=' + iframe.attributes.video.value + '&p=1&autoplay=0';
        };

        fragment.controller('frag.embed.bilibili', {
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