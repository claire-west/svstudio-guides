((dynCore) => {
    dynCore.when(dynCore.require([
        'lib.fragment',
        'lib.delayedAction'
    ])).done((modules, fragment, delayedAction) => {

        let model;
        function filterTable() {
            let $rows = $('#resource-voices-ai table tbody tr');
            let tokens = [ model.selectedLanguage, ...model.search.split(',') ].filter(t => Boolean(t.trim()));
            tokens = tokens.map(t => t.trim().toLocaleLowerCase());
            if (tokens.length) {
                for (let i = 0; i < $rows.length; i++) {
                    let row = $rows.get(i);
                    let rowText = row.innerText.toLocaleLowerCase();
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
                    delayedAction(filterTable, 'resource-voices-ai-filter');
                },
                onSearch: function(text) {
                    delayedAction(filterTable, 'resource-voices-ai-filter');
                    return text;
                }
            }
        }).done((controller) => {
            // model is instantiated, set the variable for filterTable
            model = controller.model;
        });
    });
})(window.dynCore);