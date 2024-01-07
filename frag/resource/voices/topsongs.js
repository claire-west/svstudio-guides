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

        let youtubeEn = json.youtube.english.sort(byViews);
        let youtubeOther = json.youtube.other.sort(byViews);
        // {
        //     title: 'Uncanny',
        //     artist: 'GHOST',
        //     vocals: 'Kevin',
        //     video: 'qK62up6otZU',
        //     mviews: 0.9
        // },
        // {
        //     title: 'ATARAXIA',
        //     artist: 'Patterns',
        //     vocals: 'Eleanor Forte',
        //     video: 'bUh2W3jjapA',
        //     mviews: 0.9
        // }
        // {
        //     title: '',
        //     artist: '',
        //     vocals: '',
        //     video: '',
        //     mviews:
        // }

        let niconico = [].sort(byViews);

        // https://docs.google.com/spreadsheets/d/e/2PACX-1vTbatdv4kUIv8Y0EJPo6bAzI4T9PkSY96DWkTPmB1MUQ2b1jNlb9YJCgTbJo9eahi2Bf8hhCHwa0Viu/pubhtml#
        let bilibili = json.bilibili.sort(byViews);

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
                    model.showVideoEmbed(song, 'embed-youtubedialog', 'https://www.youtube-nocookie.com/embed/' + song.video + '?t=0&autoplay=1');
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
                    model.showVideoEmbed(song, 'embed-bilibilidialog', '//player.bilibili.com/player.html?' + video + '&p=1&t=0&autoplay=1');
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