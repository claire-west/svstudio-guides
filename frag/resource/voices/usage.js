((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment'
    ])).done((modules, fragment) => {

        var dayMillis = 24 * 60 * 60 * 1000;
        var vocaDbBaseUrl = 'https://vocadb.net/api/songs?start=0&getTotalCount=true&maxResults=1&songTypes=Original&artistId[]=';
        var vocaDbIds = {
            'AiKO': 69866,
            'An Xiao': 102955,
            'ANRI': 76270,
            'ASTERIAN': 111548,
            'Ayame': 129002,
            'Cangqiong': 73875,
            'Cheng Xiao': 76105,
            'Chiyu': 72386,
            'Cong Zheng': 76109,
            'D-Lin': 119025,
            'Eleanor Forte AI': 92247,
            'Eleanor Forte Standard (R1 & lite)': 66906,
            'Eri': 125668,
            'Feng Yi': 76186,
            'Genbu': 70241,
            'Haiyi': 74324,
            'Hanakuma Chifuyu': 103592,
            'Haruno Sora': 121429,
            'Hayden': 125666,
            'Jin': 129003,
            'JUN': 116048,
            'Kasane Teto': 118397,
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
            'Lin Lai': 120528,
            'Mai': 110703,
            'Minus': 76428,
            'Mo Chen': 76210,
            'Muxin': 76429,
            'Natalie': 109075,
            'Natsuki Karin': 94959,
            'Ninezero': 115724,
            'Oscar': 129384,
            'POPY': 126705,
            'Qing Su': 76272,
            'Ritchy': 119026,
            'ROSE': 126706,
            'Ryo': 99167,
            'Saki': {
                'AI': 85852,
                'Standard': 81917
            },
            'SAROS': 118795,
            'Sheena': 125665,
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
            'Wei Shu': 125661,
            'Xia Yu Yao': 113812,
            'Xuan Yu': 76108,
            'Yamine Renri': 69286,
            'Yuma': 109074,
            'Yun Quan': 120529
        };

        var otherVocaDbIds = {
            'flower (all versions)': 21165,
            'Haruno Sora (VOCALOID5)': 67089,
            'Hatsune Miku (all versions)': 1,
            'KAFU (CeVIO AI)': 83928,
            'Kasane Teto (UTAU)': 116,
            'Kiyoteru (all versions)': 246,
            'Luo Tianyi (all versions)': 1778,
            'Megpoid/GUMI (all versions)': 3,
            'Oscar (UTAU)': 50238,
            'POPY (CeVIO AI)': 111837,
            'ROSE (CeVIO AI)': 111839,
            'SF-A2 miki (all versions)': 146,
            'Xia Yu Yao (UTAU)': 27056,
            'Xingchen/Stardust (V4)': 35966
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
                    promises.push($.ajax(vocaDbBaseUrl + id).done((resp) => {
                        oByCharacter[name] = oByCharacter[name] || 0;
                        oByCharacter[name] += resp.totalCount;
                        aBySVD.push({
                            name: name + ' ' + suffix,
                            url: 'https://vocadb.net/Ar/' + id,
                            songCount: resp.totalCount
                        });
                    }));
                }
            }
            return promises;
        };

        var oOther;
        var fetchOtherSongCounts = function() {
            var promises = [];
            oOther = {};
            for (let name in otherVocaDbIds) {
                let id = otherVocaDbIds[name];
                promises.push($.ajax(vocaDbBaseUrl + id + '&childVoicebanks=true').done((resp) => {
                    oOther[name] = oOther[name] || 0;
                    oOther[name] += resp.totalCount;
                }));
            }
            return promises;
        };

        var onFetchSuccess = function(model) {
            var aByCharacter = [];
            var aOther = [];
            var total = 0;
            for (let name in oByCharacter) {
                total += oByCharacter[name];
                aByCharacter.push({
                    name: name,
                    songCount: oByCharacter[name]
                });
            }
            for (let name in oOther) {
                aOther.push({
                    name: name,
                    songCount: oOther[name]
                });
            }
            aByCharacter.push({
                name: 'Total',
                songCount: total
            });

            aByCharacter.sort(songCountCompare);
            aBySVD.sort(songCountCompare);
            aOther.sort(songCountCompare);

            model.aByCharacter = aByCharacter;
            model.aBySVD = aBySVD;
            model.aOther = aOther;
            model._refresh();
        };

        var checkCache = function(model) {
            var aByCharacter = localStorage.getItem('songCount.byCharacter');
            var aBySVD = localStorage.getItem('songCount.bySVD');
            var aOther = localStorage.getItem('songCount.other');
            var fetched = localStorage.getItem('songCount.fetched');

            if (!aByCharacter || !aBySVD || !fetched) {
                model._set('stale', true);
                return;
            }

            try {
                model.aByCharacter = JSON.parse(aByCharacter);
                model.aBySVD = JSON.parse(aBySVD);
                model.aOther = JSON.parse(aOther);
                fetched = new Date(fetched);
            } catch (e) {
                model._set('stale', true);
                return;
            }

            var daysSinceCache = Math.round((new Date() - fetched) / dayMillis);
            if (daysSinceCache > 1) {
                model._set('stale', true);
            }
        };

        fragment.controller('frag.resource.voices.usage', {
            model: {
                oByCharacter: {},
                aByCharacter: [],
                aBySVD: [],
                aOther: [],

                fetch: function(model) {
                    var promises = fetchSongCounts().concat(fetchOtherSongCounts());
                    model._set('fetching', true);
                    $.when.apply(this, promises).then(() => {
                        onFetchSuccess(model);
                        localStorage.setItem('songCount.byCharacter', JSON.stringify(model.aByCharacter));
                        localStorage.setItem('songCount.bySVD', JSON.stringify(model.aBySVD));
                        localStorage.setItem('songCount.other', JSON.stringify(model.aOther));
                        localStorage.setItem('songCount.fetched', new Date().toISOString());
                    }, () => {
                        console.log('Failed to fetch from VocaDB');
                        model._set('error', 'An error occurred while refreshing the song counts from VocaDB.');
                    }).always(() => {
                        model._set('fetching', false);
                    });
                },

                onFetch: function(model) {
                    model._set('stale', false);
                    model.fetch(model);
                }
            },

            onInit: function() {
                checkCache(this.model);
            }
        });
    });
})(window.dynCore);