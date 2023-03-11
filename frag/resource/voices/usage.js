((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment'
    ])).done((modules, fragment, scrollHandler) => {

        var dayMillis = 24 * 60 * 60 * 1000;
        var vocaDbIds = {
            'AiKO': 69866,
            'An Xiao': 102955,
            'ANRI': 76270,
            'ASTERIAN': 111548,
            'Cangqiong': 73875,
            'Cheng Xiao': 76105,
            'Chiyu': 72386,
            'Cong Zheng': 76109,
            'Eleanor Forte': {
                'AI': 92247,
                'Standard (R1 & lite)': 66906
            },
            'Feng Yi': 76186,
            'Genbu': 70241,
            'Haiyi': 74324,
            'Hanakuma Chifuyu': 103592,
            'JUN': 116048,
            'Kevin': 99147,
            'Koharu Rikka': {
                '(Unknown)': 85853,
                'AI': 85847,
                'Standard': 85846
            },
            'Kotonoha Akane/Aoi': 81912,
            'Kyomachi Seika': {
                '(Unknown)': 97769,
                'AI': 97760,
                'Standard': 97770
            },
            'Mai': 110703,
            'Minus': 76428,
            'Mo Chen': 76210,
            'Muxin': 76429,
            'Natalie': 109075,
            'Natsuki Karin': 94959,
            'Ninezero': 115724,
            'Qing Su': 76272,
            'Ryo': 99167,
            'Saki': {
                'AI': 85852,
                'Standard': 81917
            },
            'Shian': 71416,
            'SOLARIA': 76317,
            'Stardust Infinity': 76283,
            'Tsuina-chan': {
                '(Unknown)': 96162,
                'AI': 96164,
                'Standard': 96163
            },
            'Tsurumaki Maki': {
                '(Unknown)': 85855,
                'AI (Japanese)': 85836,
                'Standard (Japanese)': 85835,
                'AI (English)': 85838,
                'Standard (English)': 85837
            },
            'Weina': 76161,
            'Xia Yu Yao': 113812,
            'Xuan Yu': 76108,
            'Yamine Renri': 69286,
            'Yuma': 109074
        };

        var songCountCompare = function(a, b) {
            return b.songCount - a.songCount;
        };

        var oByCharacter;
        var aBySVD;
        var fetchSongCounts = function() {
            var promises = [];
            oByCharacter = {};
            aBySVD = [];
            for (let name in vocaDbIds) {
                if (typeof(vocaDbIds[name]) === 'number') {
                    vocaDbIds[name] = {
                        '': vocaDbIds[name]
                    };
                }

                for (let suffix in vocaDbIds[name]) {
                    let id = vocaDbIds[name][suffix];
                    promises.push($.ajax('https://vocadb.net/api/artists/' + id + '/details').done((resp) => {
                        oByCharacter[name] = oByCharacter[name] || 0;
                        oByCharacter[name] += resp.sharedStats.songCount;
                        aBySVD.push({
                            name: name + ' ' + suffix,
                            url: 'https://vocadb.net/Ar/' + id,
                            songCount: resp.sharedStats.songCount
                        });
                    }));
                }
            }
            return promises;
        };

        var onFetchSuccess = function(model) {
            var aByCharacter = [];
            for (let name in oByCharacter) {
                aByCharacter.push({
                    name: name,
                    songCount: oByCharacter[name]
                });
            }
            aByCharacter.sort(songCountCompare);
            aBySVD.sort(songCountCompare);

            model.aByCharacter = aByCharacter;
            model.aBySVD = aBySVD;
            model._refresh();
        };

        var checkCache = function(model) {
            var aByCharacter = localStorage.getItem('songCount.byCharacter');
            var aBySVD = localStorage.getItem('songCount.bySVD');
            var fetched = localStorage.getItem('songCount.fetched');

            if (!aByCharacter || !aBySVD || !fetched) {
                model.fetch(model);
                return;
            }

            try {
                model.aByCharacter = JSON.parse(aByCharacter);
                model.aBySVD = JSON.parse(aBySVD);
                fetched = new Date(fetched);
            } catch (e) {
                model.fetch(model);
                return;
            }

            var daysSinceCache = Math.round((new Date() - fetched) / dayMillis);
            if (daysSinceCache > 3) {
                model.fetch(model);
            }
        };

        fragment.controller('frag.resource.voices.usage', {
            model: {
                oByCharacter: {},
                aByCharacter: [],
                aBySVD: [],

                fetch: function(model) {
                    var promises = fetchSongCounts();
                    $.when.apply(this, promises).then(() => {
                        onFetchSuccess(model);
                        localStorage.setItem('songCount.byCharacter', JSON.stringify(model.aByCharacter));
                        localStorage.setItem('songCount.bySVD', JSON.stringify(model.aBySVD));
                        localStorage.setItem('songCount.fetched', new Date().toISOString());
                    }, () => {
                        console.log('Failed to fetch from VocaDB');
                        model._set('error', 'An error occurred while refreshing the song counts from VocaDB.');
                    });
                }
            },

            onInit: function() {
                checkCache(this.model);
            }
        });
    });
})(window.dynCore);