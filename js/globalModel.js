((dynCore) => {
    dynCore.declare('app.globalModel', dynCore.require([
        'lib.bind',
        'lib.fragment',
        'lib.globalModel',
        'lib.isMobile'
    ]), (modules, bind, fragment, globalModel, isMobile) => {
        globalModel._set('isMobile', isMobile());

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
        var previousFocus = null;
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
                var $modal = $('.modal');
                $('body').addClass('noscroll');
                var escapeHandler = function(e) {
                    if (e.key == "Escape") {
                        globalModel.closeModal.call($fragment);
                        $modal.off('keyup', escapeHandler);
                    }
                };
                $modal.on('keyup', escapeHandler);
                $modal.show().find('.dialog').scrollTop(0);
                previousFocus = document.activeElement;
                $('body > :not(.modal)').attr('aria-hidden', 'true');
                $('body > :not(.modal) *').attr('tabindex', -1);
                promise.resolve($fragment);
                $fragment.find('button').focus();
            });
            return promise;
        });

        globalModel._set('closeModal', function() {
            var $element = $(this).parent();
            while ($element.length) {
                if ($element.hasClass('modal')) {
                    $('body').removeClass('noscroll');
                    $element.hide();
                    $('body > :not(.modal)').removeAttr('aria-hidden');
                    $('body > :not(.modal) *').removeAttr('tabindex');
                    if (previousFocus) {
                        previousFocus.focus();
                        previousFocus = null;
                    }
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

        globalModel._set('lazyElements', new Map());

        return globalModel;
    });
})(window.dynCore);