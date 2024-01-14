((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'app.globalModel',
        'lib.delayedAction'
    ])).done((modules, fragment, globalModel, delayedAction) => {

        let model;
        function filterTable() {
            let $rows = $('#resource-voices-ai table tbody tr');
            let tokens = [ model.selectedLanguage, ...model.search.split(',') ].filter(t => Boolean(t.trim()));
            tokens = tokens.map(t => t.trim().toLocaleLowerCase());
            if (tokens.length) {
                for (let i = 0; i < $rows.length; i++) {
                    let row = $rows.get(i);
                    let rowText = row.innerText.toLocaleLowerCase();
                    let infoDiv = model.info.get(row);
                    if (infoDiv) {
                        // only search info elements marked as "searchable"
                        rowText += $(infoDiv).find('[searchable]').text().toLocaleLowerCase();
                    }
                    if (tokens.every(t => rowText.includes(t))) {
                        $(row).show();
                    } else {
                        $(row).hide();
                    }
                }
            } else {
                $rows.show();
            }
        };

        fragment.controller('frag.resource.voices.ai', {
            model: {
                selectedLanguage: '',
                search: '',

                onSelectLanguage: function() {
                    filterTable();
                },
                onSearch: function(text) {
                    delayedAction(filterTable, 'resource-voices-ai-filter');
                    return text;
                },

                info: new Map(),
                onInfoClick: function(model) {
                    let infoDiv = model.info.get(this.parentElement.parentElement);

                    // load any lazy embeds
                    let iframes = infoDiv.getElementsByTagName('iframe');
                    for (let iframe of iframes) {
                        if (globalModel.lazyElements.has(iframe)) {
                            globalModel.lazyElements.get(iframe).call();
                        }
                    }

                    globalModel.openModal('resource-voices-infodialog', model).done(($fragment) => {
                        // move selected info content into the dialog
                        let fragmentContent = $fragment.filter('section').get(0);
                        fragmentContent.append(infoDiv);
                        $fragment.find('*').removeAttr('tabindex');
                        $fragment.find('button').focus();
                    });
                },

                getInfoTitle: function(model) {
                    let infoDiv = model.info.get(this.get(0).parentElement.parentElement);
                    return infoDiv ? 'Click for more information about ' + infoDiv.querySelector(':scope > h3').textContent : '';
                },

                getInfoTextSr: function(model) {
                    return model.getInfoTitle.apply(this.parent(), arguments);
                },

                hasInfo: function(infoMap) {
                    return this && this.length && Boolean(infoMap.get(this[0].parentElement.parentElement));
                },

                closeModal: function() {
                    let fragmentContent = this.parentElement.nextElementSibling;
                    let infoDiv = fragmentContent.firstChild;
                    if (infoDiv) {
                        // kill iframe content
                        let iframes = infoDiv.getElementsByTagName('iframe');
                        for (let iframe of iframes) {
                            iframe.removeAttribute('src');
                        }

                        // move dialog content back to the hidden div
                        $('#resource-voices-ai-info').append(infoDiv);
                    }

                    globalModel.closeModal.call(this);
                }
            }
        }).done((controller) => {
            // model is instantiated, set the variable for filterTable
            model = controller.model;

            let $rows = controller.$fragment.find('#resource-voices-ai table tbody tr');
            let $info = controller.$fragment.find('#resource-voices-ai-info');

            // premap info dialog for each row
            const infoMap = new Map();
            for (let row of $rows) {
                let key = row.dataset.voice;
                delete row.dataset.voice;

                if (key) {
                    let infoDiv = $info.find('div[data-voice="' + key + '"]').get(0);
                    if (infoDiv) {
                        infoMap.set(row, infoDiv);
                        delete infoDiv.dataset.voice;
                    }
                }
            }
            // replace the Map object entirely to force model refresh
            model._set('info', infoMap);
        });
    });
})(window.dynCore);