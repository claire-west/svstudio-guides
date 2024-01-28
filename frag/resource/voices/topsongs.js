((dynCore) => {
    dynCore.when(
        dynCore.require([
            'lib.fragment',
            'app.globalModel'
        ]),
        dynCore.jsonBundle('app.json.voices', {
            youtube: 'topsongs-youtube',
            bilibili: 'topsongs-bilibili'
        })
    ).done((modules, fragment, globalModel, json) => {
        function byViews(a,b) {
            return b.mviews - a.mviews;
        };

        function over1MViews(v) {
            return v.mviews >= 1;
        }

        let youtubeEn = json.youtube.english.filter(over1MViews).sort(byViews);
        let youtubeOther = json.youtube.other.filter(over1MViews).sort(byViews);

        // let niconico = [].filter(over1MViews).sort(byViews);

        // https://docs.google.com/spreadsheets/d/e/2PACX-1vTbatdv4kUIv8Y0EJPo6bAzI4T9PkSY96DWkTPmB1MUQ2b1jNlb9YJCgTbJo9eahi2Bf8hhCHwa0Viu/pubhtml#
        let bilibili = json.bilibili.filter(over1MViews).sort(byViews);

        let songModel = modules.lib.model({
            closeModal: function() {
                let iframes = this.parentElement.previousElementSibling.getElementsByTagName('iframe');
                for (let iframe of iframes) {
                    iframe.removeAttribute('src');
                }
                globalModel.closeModal.call(this);
            }
        });

        fragment.controller('frag.resource.voices.topsongs', {
            model: {
                showYouTubeEmbed: function(song, model) {
                    model.showVideoEmbed(song, 'embed-youtubedialog', 'https://www.youtube-nocookie.com/embed/' + song.video + '?t=0&autoplay=0');
                },

                showBilibiliEmbed: function(song, model) {
                    let video;
                    if (song.video.startsWith('BV')) {
                        video = 'bvid=' + song.video;
                    } else if (song.video.startsWith('av')) {
                        video = 'aid=' + song.video.substr(2);
                    } else {
                        video = 'aid=' + song.video;
                    }
                    model.showVideoEmbed(song, 'embed-bilibilidialog', '//player.bilibili.com/player.html?' + video + '&p=1&t=0&autoplay=0');
                },

                showVideoEmbed: function(song, dialog, src) {
                    Object.assign(songModel, song);
                    songModel._refresh();

                    globalModel.openModal(dialog, songModel).done(($fragment) => {
                        let iframe = $fragment.find('iframe').get(0);
                        if (!iframe.src) {
                            iframe.src = src;
                        }
                    });
                },

                getYouTubeHref: function(video) {
                    return 'https://youtu.be/' + video;
                },

                getBilibiliHref: function(video) {
                    return 'https://www.bilibili.com/video/' + video;
                },

                formatMViews: function(mviews) {
                    return mviews + 'M+';
                },

                formatViews: function(views) {
                    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },

            onInit: function() {

            }
        }).then((controller) => {
            controller.model.youtubeEn = youtubeEn.sort(byViews);
            controller.model.youtubeOther = youtubeOther.sort(byViews);
            // controller.model.niconico = niconico;
            controller.model.bilibili = bilibili.sort(byViews);
            controller.model._refresh();
        });
    });
})(window.dynCore);