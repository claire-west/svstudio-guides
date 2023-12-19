((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel'
    ])).done((modules, fragment, globalModel) => {
        function byViews(a,b) {
            return b.mviews - a.mviews;
        };

        let youtubeEn = [
            {
                title: 'Reckless Battery Burns',
                artist: 'team 6x111',
                vocals: 'Kevin',
                video: 'EYKrl61cUsY',
                mviews: 3.4
            },
            {
                title: 'Wildcard',
                artist: 'KIRA, Asteroid Music Team',
                vocals: 'Kasane Teto',
                video: 'v1TaIfKctPo',
                mviews: 1
            },
            {
                title: 'Pathological Facade',
                artist: 'GHOST',
                vocals: 'Kasane Teto',
                video: 'inRXBlYgMGI',
                mviews: 1.5
            },
            {
                title: 'End-World Normopathy',
                artist: 'team 6x111',
                vocals: 'Solaria, Kevin',
                video: 'cPN75z580GE',
                mviews: 1.8
            },
            {
                title: 'SCAPEG♾AT',
                artist: 'GHOST',
                vocals: 'Yuma, Stardust Infinity, Asterian, Kevin',
                video: 'vqe2WMZYYvQ',
                mviews: 1.7
            },
            {
                title: 'Aura',
                artist: 'GHOST',
                vocals: 'Solaria',
                video: 'EKOSQGKn5Cw',
                mviews: 4.3
            },
            {
                title: 'It Should\'ve Been Me',
                artist: 'R.I.P',
                vocals: 'Solaria',
                video: 'ttrb6MuXkok',
                mviews: 1
            },
            {
                title: 'AUDIT',
                artist: 'WeevilDoing',
                vocals: 'Tsurumaki Maki',
                video: 'gmEqkdl4wEA',
                mviews: 3.6
            },
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
        ].sort(byViews);

        let youtubeOther = [
            {
                title: 'ミィハー (Miihaa)',
                artist: 'Chinozo',
                vocals: 'Kasane Teto',
                video: 'oePX92KTE_M',
                mviews: 1.6
            },
            {
                title: 'ムシ (Insect)',
                artist: 'Chinozo',
                vocals: 'Kotonoha Akane/Aoi ',
                video: 'j4ZuoUOkjSY',
                mviews: 1.5
            },
            {
                title: 'ハルノ寂寞 (Loneliness of Spring)',
                artist: 'inabakumori',
                vocals: 'Tsurumaki Maki',
                video: 'mFih47l1pVI',
                mviews: 7.9
            },
            {
                title: 'Post Shelter',
                artist: 'inabakumori',
                vocals: 'Tsurumaki Maki',
                video: 'kYwB-kZyNU4',
                mviews: 2.1
            },
            {
                title: 'MIRA',
                artist: 'Kanaria',
                vocals: 'Koharu Rikka',
                video: 'QF-PvlyheVc',
                mviews: 7.6
            },
            {
                title: 'SICK (full EP reupload)',
                artist: 'Yuyoyuppe',
                vocals: 'Natsuki Karin',
                video: 'aEtwA-iwoCQ',
                mviews: 1.1
            },
            {
                title: 'お呪い (The Spell)',
                artist: 'Nakiso',
                vocals: 'Hanakuma Chifuyu',
                video: 'zxYdPypVQvQ',
                mviews: 4.3
            },
            {
                title: '大女優さん (actress)',
                artist: 'Iyowa',
                vocals: 'Hanakuma Chifuyu',
                video: 'wdNjJ3eh8EQ',
                mviews: 1.4
            },
            {
                title: '一千光年 (1000 Light Years)',
                artist: 'Iyowa',
                vocals: 'Vocal synth chorus (incl. Hanakuma Chifuyu, Solaria)',
                video: 'wdNjJ3eh8EQ',
                mviews: 1.4
            },
            {
                title: 'バベル (BABEL)',
                artist: 'Iyowa',
                vocals: 'Kasane Teto (SV and UTAU versions)',
                video: 'zSKwxQqrac0',
                mviews: 2.2
            },
            {
                title: 'ずんだもんの朝食 (Zundamon\'s Breakfast)',
                artist: 'Hiraumi',
                vocals: 'Koharu Rikka, Zundamon (Voicevox)',
                video: 'YTn37zK4Hck',
                mviews: 2.5
            },
            {
                title: '蛋餅好朋友之歌 (Dàn Bǐng Hǎo Péngyǒu zhī Gē)',
                artist: 'NiceChord',
                vocals: 'AiKO',
                video: 'SrGCmZqjz7o',
                mviews: 1.2
            },
            {
                title: 'Liar Dancer',
                artist: 'Masarada',
                vocals: 'Kasane Teto',
                video: 'UHbmkxv-874',
                mviews: 1.9
            },
            {
                title: 'のだ (The Reason Is)',
                artist: 'Daibakuhashin',
                vocals: 'Kasane Teto, Hatsune Miku (Vocaloid), Zundamon (Neutrino)',
                video: 'vY8iwpN3GXQ',
                mviews: 2.8
            },
            {
                title: 'あいのうた (Song of "AI")',
                artist: 'Daibakuhashin',
                vocals: 'Kasane Teto, Hatsune Miku (Vocaloid)',
                video: 'LyZk53_5GwM',
                mviews: 1.5
            }
            // {
            //     title: '',
            //     artist: '',
            //     vocals: '',
            //     video: '',
            //     mviews:
            // }
        ].sort(byViews);

        let niconico = [].sort(byViews);

        // https://docs.google.com/spreadsheets/d/e/2PACX-1vTbatdv4kUIv8Y0EJPo6bAzI4T9PkSY96DWkTPmB1MUQ2b1jNlb9YJCgTbJo9eahi2Bf8hhCHwa0Viu/pubhtml#
        let bilibili = [
            {
                title: '天下局 (Tiānxià Jú)',
                artist: 'Chenyiming, KBShinya (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV1z4411q74Y',
                mviews: 4.9
            },
            {
                title: '404 Not Found',
                artist: 'Kide',
                vocals: 'Chiyu',
                video: 'BV1vE411R7iD',
                mviews: 1.5
            },
            {
                title: '青鸟衔风 (Qīngniǎo Xián Fēng)',
                artist: 'PoKeR (忘川风华录 series)',
                vocals: 'Haiyi, Shian',
                video: 'av79182548',
                mviews: 1.9
            },
            {
                title: '流年如歌 (Time Flies)',
                artist: 'Ximen Zhen',
                vocals: 'Cangqiong',
                video: 'av78978783',
                mviews: 2.6
            },
            {
                title: 'Talking to the Rain',
                artist: 'Da Huntun',
                vocals: 'Haiyi, Xingchen (Vocaloid)',
                video: 'av85509041',
                mviews: 1.0
            },
            {
                title: '木兰行 (Mùlán Xíng)',
                artist: 'Wu Lian (忘川风华录 series)',
                vocals: 'Cangqiong',
                video: 'av837540509',
                mviews: 7.9
            },
            {
                title: '好字唯之 (Hǎo Zì Wéi Zhī)',
                artist: 'KBShinya, Xiangwang (忘川风华录 series)',
                vocals: 'Haiyi',
                video: 'av710942299',
                mviews: 1.8
            },
            {
                title: '苍蝇 (Cāngyíng)',
                artist: 'ilem',
                vocals: 'Chiyu',
                video: 'av456679355',
                mviews: 7.1
            },
            {
                title: '不可道 (Bùkě Dào)',
                artist: 'Ta Ku (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV1xD4y127im',
                mviews: 3.1
            },
            {
                title: '水叙湖风 (Shuǐ Xù Hú Fēng)',
                artist: 'Yu Ge (忘川风华录 series)',
                vocals: '星尘Minus',
                video: 'BV1Xp4y1a7zj',
                mviews: 1.1
            },
            {
                title: '是非 (Shìfēi)',
                artist: 'Chenyiming (忘川风华录 series)',
                vocals: 'Cangqiong',
                video: 'BV14K4y1E7t4',
                mviews: 1.6
            },
            {
                title: '谓剑 (Wèi Jiàn)',
                artist: 'Ta Ku (忘川风华录 series)',
                vocals: 'Chiyu, San Lian (UTAU)',
                video: 'BV1xZ4y137QB',
                mviews: 1.6
            },
            {
                title: '万象霜天 (Wànxiàng Shuāngtiān)',
                artist: 'KBShinya (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV1zN411d7dG',
                mviews: 9.6
            },
            {
                title: '千秋梦 (Qiānqiū Mèng)',
                artist: 'PokeR (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV1Gi4y1K7Hr',
                mviews: 4.3
            },
            {
                title: '易安难安 (Yì Ān Nán Ān)',
                artist: 'Yu Ge (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV19y4y1b7Kd',
                mviews: 2.9
            },
            {
                title: '惊鹊 (Jīng Què)',
                artist: 'Ta Ku (忘川风华录 series)',
                vocals: 'Haiyi, 星尘Minus',
                video: 'BV13Z4y1F798',
                mviews: 2.4
            },
            {
                title: '不赴 (Bùfù)',
                artist: 'Ice-Paper (忘川风华录 series)',
                vocals: 'Cangqiong, Chiyu',
                video: 'av889794346',
                mviews: 3.1
            },
            {
                title: '西行 (Xīxíng)',
                artist: 'Chenyiming (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV1Wf4y1P7HG',
                mviews: 1.2
            },
            {
                title: '倾国 (Qīngguó)',
                artist: 'Shang Xiao Jin (忘川风华录 series)',
                vocals: 'Chiyu, Zhao Fangjing (live vocalist)',
                video: 'BV1V34y1r77P',
                mviews: 1.3
            },
            {
                title: '相虎 (Xiāng Hǔ)',
                artist: 'Shui Mu (忘川风华录 series)',
                vocals: 'Cangqiong',
                video: 'BV1wm4y1S7qZ',
                mviews: 1
            },
            {
                title: '弈 (Yì)',
                artist: 'KBShinya, Huiyuanqiong',
                vocals: 'Cangqiong (lead), Cangqiong Plus (harmony)',
                video: 'BV1q34y1271d',
                mviews: 4.5
            },
            {
                title: '补天裂 (Bǔ Tiān Liè)',
                artist: 'litterzy (忘川风华录 series)',
                vocals: 'Haiyi, 星尘Minus',
                video: 'BV1EP4y1N7QN',
                mviews: 1.1
            },
            {
                title: '我多想说再见啊 (Wǒ Duō Xiǎng Shuō Zàijiàn a)',
                artist: 'Ke Li Ke',
                vocals: 'Stardust Infinity',
                video: 'BV1dP4y1T7TU',
                mviews: 1.5
            },
            {
                title: '我在池袋看漂亮姐姐 (Wǒ Zài Chídài Kàn Piàoliàng Jiějiě)',
                artist: 'inosoo',
                vocals: 'Stardust Infinity',
                video: 'BV1sZ4y127KT',
                mviews: 1.1
            },
            {
                title: '破云来 (Pò Yún Lái)',
                artist: 'Chenyiming (忘川风华录 series)',
                vocals: 'Chiyu',
                video: 'BV1zU4y1m7ej',
                mviews: 2.4
            },
            {
                title: '始见千秋 (Shǐ Jiàn Qiānqiū)',
                artist: 'PokeR (忘川风华录 series)',
                vocals: 'Cangqiong, Chiyu, Stardust Infinity, Haiyi',
                video: 'BV1JG4y1b7oB',
                mviews: 2.7
            },
            {
                title: '临川浮梦 (Línchuān Fú Mèng)',
                artist: 'Chenyiming (忘川风华录 series)',
                vocals: 'Chiyu, Stardust Infinity',
                video: 'av990224432',
                mviews: 1.9
            },
            {
                title: '将军行 (Jiāngjūn Xíng)',
                artist: 'Zhou Guo Yi (忘川风华录 series)',
                vocals: 'Cangqiong, Stardust Infinity, Chiyu',
                video: 'av948475467',
                mviews: 1.6
            },
            {
                title: '妄语人间 (Wàngyǔ Rénjiān)',
                artist: 'Zhou Guo Yi (忘川风华录 series)',
                vocals: 'Stardust Infinity',
                video: 'av437888226',
                mviews: 1.9
            },
            {
                title: '数风流 (Shù Fēngliú)',
                artist: 'Chenyiming (忘川风华录 series)',
                vocals: 'Stardust Infinity, Haiyi, Cangqiong,Shian, 星尘Minus, Chiyu, Muxin',
                video: 'av823926177',
                mviews: 2.3
            },
            {
                title: '问剑春秋 (Wèn Jiàn Chūnqiū)',
                artist: 'Chen Pengjie (忘川风华录 series)',
                vocals: 'Chiyu, Cangqiong',
                video: 'av827027422',
                mviews: 1.1
            },
            {
                title: '剑与雪 (Jiàn yǔ Xuě)',
                artist: 'KBShinya',
                vocals: 'Stardust Infinity',
                video: 'av234794791',
                mviews: 1.3
            },
            {
                title: '旷古回响 (Kuànggǔ Huíxiǎng)',
                artist: 'Chenyiming (忘川风华录 series)',
                vocals: 'Cangqiong, Chiyu, Stardust Infinity, Haiyi, Shian, 星尘Minus, Muxin',
                video: 'BV1wH4y1m7Pc',
                mviews: 1.1
            }
            // {
            //     title: '',
            //     artist: '',
            //     vocals: '',
            //     video: '',
            //     mviews:
            // }
        ].sort(byViews);

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