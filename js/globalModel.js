((dynCore) => {
    dynCore.declare('app.globalModel', dynCore.require([
        'lib.bind',
        'lib.fragment',
        'lib.globalModel',
        'lib.isMobile'
    ]), (modules, bind, fragment, globalModel, isMobile) => {
        globalModel._set('onToggleTheme', () => {
            var $body = $('body');
            $body.toggleClass('light');
            if ($body.hasClass('light')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.removeItem('theme');
            }
        });

        globalModel._set('onCopy', function() {
            var text = $(this).next().text();
            if (text) {
                if (isMobile()) {
                    // https://stackoverflow.com/a/71985515
                    const element = document.createElement("textarea");
                    element.value = text;
                    document.body.appendChild(element);
                    element.select();
                    document.execCommand("copy");
                    document.body.removeChild(element);
                } else {
                    navigator.clipboard.writeText(text);
                }
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
                $('body').addClass('noscroll');
                $('.modal').show();
                promise.resolve();
            });
            return promise;
        });

        globalModel._set('closeModal', function() {
            var $element = $(this).parent();
            while ($element.length) {
                if ($element.hasClass('modal')) {
                    $('body').removeClass('noscroll');
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