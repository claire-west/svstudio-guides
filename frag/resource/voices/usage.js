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
            'KAFU': 129923,
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
            'Megpoid (GUMI)': 128632,
            '星尘Minus': 76428,
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
            'Yongye Minus': 129591,
            'Yuma': 109074,
            'Yun Quan': 120529
        };

        var otherVocaDbIds = {
            'flower (all)': 21165,
            'Haruno Sora (Vocaloid5)': 67089,
            'Hatsune Miku (all)': 1,
            'KAITO (all)': 71,
            'KAFU (CeVIO AI)': {
                'CeVIO AI': 83928
            },
            'Kagamine Len (all)': 15,
            'Kagamine Rin (all)': 14,
            'Kasane Teto (UTAU)': 116,
            'Kiyoteru (V2 & V4)': {
                'V2': 246,
                'V4 (Unknown)': 48894,
                'V4 (Natural)': 28165,
                'V4 (Rock)': 41773
            },
            'Luo Tianyi (all)': 1778,
            'MEIKO (all)': 176,
            'Megpoid/GUMI (all)': 3,
            'Megurine Luka (all)': 2,
            'Oscar (UTAU)': 50238,
            'POPY (CeVIO AI)': {
                'CeVIO AI': 111837
            },
            'ROSE (CeVIO AI)': {
                'CeVIO AI': 111839
            },
            'SF-A2 miki (V2 & V4)': {
                'V2': 146,
                'V4': 28167
            },
            'Xia Yu Yao (UTAU)': 27056,
            'Xingchen/Stardust (Vocaloid4)': 35966
        };

        var songCountCompare = function(a, b) {
            return b.songCount - a.songCount;
        };

        var aRequestQueue;
        var oByCharacter;
        var enqueueSongCounts = function() {
            var promises = [];
            oByCharacter = {};
            for (let name in vocaDbIds) {
                if (typeof(vocaDbIds[name]) === 'number') {
                    vocaDbIds[name] = {
                        '': vocaDbIds[name]
                    };
                }

                for (let suffix in vocaDbIds[name]) {
                    let id = vocaDbIds[name][suffix];
                    let promise = $.Deferred();

                    aRequestQueue.push(() => {
                        return $.ajax(vocaDbBaseUrl + id).done((resp) => {
                            oByCharacter[name] = oByCharacter[name] || 0;
                            oByCharacter[name] += resp.totalCount;
                            promise.resolve();
                        });
                    });
                    promises.push(promise);
                }
            }
            return promises;
        };

        var oOther;
        var enqueueOtherSongCounts = function() {
            var promises = [];
            oOther = {};

            for (let name in otherVocaDbIds) {
                if (typeof(otherVocaDbIds[name]) === 'number') {
                    otherVocaDbIds[name] = {
                        '': otherVocaDbIds[name]
                    };
                }

                for (let suffix in otherVocaDbIds[name]) {
                    let id = otherVocaDbIds[name][suffix];
                    let promise = $.Deferred();
                    let url = vocaDbBaseUrl + id;
                    if (suffix === '') {
                        url += '&childVoicebanks=true';
                    }

                    aRequestQueue.push(() => {
                        return $.ajax(url).done((resp) => {
                            oOther[name] = oOther[name] || 0;
                            oOther[name] += resp.totalCount;
                            promise.resolve();
                        });
                    });
                    promises.push(promise);
                }
            }
            return promises;
        };

        var batchSize = 10;
        function processQueue(model) {
            return processInitialBatch(model, aRequestQueue.splice(0, batchSize));
        };

        function processInitialBatch(model, fns) {
            let promises = [];
            for (let fn of fns) {
                model.incrementStarted();
                promises.push(fn().done(() => {
                    promises.push(onRequestComplete(model));
                }));
            }
            return $.when.apply(this, promises);
        };

        function onRequestComplete(model) {
            model.incrementResolved();
            if (aRequestQueue.length) {
                return processNext(model);
            } else {
                return $.Deferred().resolve();
            }
        };

        function processNext(model) {
            let promise = $.Deferred();
            let fn = aRequestQueue.splice(0, 1)[0];
            model.incrementStarted();
            fn().done(() => {
                onRequestComplete(model).done(promise.resolve);
            });
            return promise;
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
            aOther.sort(songCountCompare);

            model.aByCharacter = aByCharacter;
            model.aOther = aOther;
            model._refresh();
        };

        var checkCache = function(model) {
            var aByCharacter = localStorage.getItem('songCount.byCharacter');
            var aOther = localStorage.getItem('songCount.other');
            var fetched = localStorage.getItem('songCount.fetched');

            if (!aByCharacter || !fetched) {
                model._set('stale', true);
                return;
            }

            try {
                model.aByCharacter = JSON.parse(aByCharacter);
                model.aOther = JSON.parse(aOther);
                fetched = new Date(fetched);
            } catch (e) {
                model._set('stale', true);
                return;
            }

            var daysSinceCache = Math.round((new Date() - fetched) / dayMillis);
            if (daysSinceCache > 2) {
                model._set('stale', true);
            }
        };

        fragment.controller('frag.resource.voices.usage', {
            model: {
                oByCharacter: {},
                aByCharacter: [],
                aOther: [],

                fetch: function(model) {
                    aRequestQueue = [];
                    var promises = enqueueSongCounts().concat(enqueueOtherSongCounts());
                    model._set('fetching', true);
                    model._set('pendingCount', promises.length);
                    model._set('startedCount', 0);
                    model._set('resolvedCount', 0);

                    $.when.apply(this, promises).then(() => {
                        onFetchSuccess(model);
                        localStorage.setItem('songCount.byCharacter', JSON.stringify(model.aByCharacter));
                        localStorage.setItem('songCount.other', JSON.stringify(model.aOther));
                        localStorage.setItem('songCount.fetched', new Date().toISOString());
                    }, () => {
                        console.log('Failed to fetch from VocaDB');
                        model._set('error', 'An error occurred while refreshing the song counts from VocaDB.');
                    }).always(() => {
                        model._set('fetching', false);
                    });

                    processQueue(model);
                },

                onFetch: function(model) {
                    model._set('stale', false);
                    model.fetch(model);
                },

                incrementStarted: function() {
                    this._set('startedCount', this._get('startedCount') + 1);
                },

                incrementResolved: function() {
                    this._set('resolvedCount', this._get('resolvedCount') + 1);
                },

                getName: function(name) {
                    return name ? name.split('(')[0].trim() : '';
                },

                getPlatform: function(name) {
                    return name && name.includes('(') ? name.split('(')[1].slice(0, -1).trim() : '';
                }
            },

            onInit: function() {
                checkCache(this.model);
            }
        });
    });
})(window.dynCore);