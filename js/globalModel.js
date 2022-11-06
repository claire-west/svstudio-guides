((dynCore) => {
    dynCore.declare('app.globalModel', dynCore.require([
        'lib.bind',
        'lib.fragment',
        'lib.globalModel'
    ]), (modules, bind, fragment, globalModel) => {
        if (localStorage.getItem('currentHash') === window.location.hash) {
            globalModel._set('scrollY', localStorage.getItem('scrollY'));
        }

        globalModel._set('onToggleTheme', () => {
            var $body = $('body');
            $body.toggleClass('light');
            if ($body.hasClass('light')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.removeItem('theme');
            }
        });

        // track loaded modal fragments for reuse if opened more than once
        var modalFragments = {};
        globalModel._set('openModal', (fragmentName, model) => {
            $('.modal .dialog').children().hide();
            var promise = $.Deferred();
            if (!modalFragments[fragmentName]) {
                $('.modal .dialog').append($('<z--frag-' + fragmentName + '/>'));
                // manually run fragment.scan before bind so we can get a reference to $fragment
                modalFragments[fragmentName] = fragment.scan($('.modal .dialog z--frag-' + fragmentName), model || globalModel);
                modalFragments[fragmentName].done(function($fragment, model) {
                    bind($fragment, model);
                    model._refresh();
                });
            }
            modalFragments[fragmentName].done(function($fragment) {
                $fragment.show();
                $('.modal').show();
                promise.resolve();
            });
            return promise;
        });

        globalModel._set('closeModal', function() {
            var $element = $(this).parent();
            while ($element.length) {
                if ($element.hasClass('modal')) {
                    $element.hide();
                    break;
                }
                $element = $element.parent();
            }
        });

        globalModel._set('dateFormatter', function(date) {
            if (typeof(date) === 'string') {
                date = new Date(date + ' UTC');
            }

            if (date) {
                return date.toLocaleString();
            }
            return '';
        });

        return globalModel;
    });
})(window.dynCore);