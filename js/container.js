((dynCore) => {
    dynCore.declare('app.container', dynCore.require([
        'lib.hashNav',
        'lib.bind',
        'app.globalModel'
    ]), (modules, hashNav, bind, globalModel) => {
        var apps = {};
        var pending = {};
        var lib = modules.lib;

        var container = {
            init: function(title, app, $app) {
                dynCore.when(dynCore.require('lib.baseApp')).done((modules, baseApp) => {
                    $app = $app || $('#app-' + title);
                    baseApp({
                        title: title,
                        namespace: $app.data('namespace') || $app.data('ns') || 'app',
                        app: app,
                        $app: $app
                    }).done((app) => {
                        apps[app.title] = app;
                        var appPath = app.namespace + '.' + app.title;
                        if (pending[appPath]) {
                            pending[appPath].resolve();
                        }
                        hashNav.rehash(true);
                    });
                });
            },
            loadApp: function(namespace, title) {
                if (typeof(title) === 'undefined') {
                    title = 'app.' + namespace;
                } else {
                    title = namespace + '.' + title;
                }
                var promise = pending[title] = $.Deferred();
                dynCore.js(title).fail(promise.reject);
            },
            getPending: function(title) {
                return pending[title];
            },
            getApp: function(title) {
                return apps[title];
            }
        };

        $(window).scroll(() => {
            localStorage.setItem('scrollY', window.pageYOffset);
            localStorage.setItem('currentHash', window.location.hash);

            // var $header = $('div.top-bar, div.top-bar-spacer');
            // if ($(document).scrollTop() > 0) {
            //     $header.addClass('shrink');
            // } else {
            //     $header.removeClass('shrink');
            // }
        });

        globalModel._set('onAboutPress', () => {
            globalModel.openModal('about');
        });

        globalModel._set('onGoogleAnalyticsPress', () => {
            globalModel.openModal('googleAnalytics');
        });

        hashNav.bindNavApp((app, section, args) => {
            var $app;
            if (app) {
                $app = $('#app-' + app);
            } else {
                app = $('body .defaultApp').get(0).id.split('-')[1];
                window.location.replace('#' + app);
                return;
            }

            if (typeof(apps[app]) === 'undefined') {
                container.loadApp(app, $app.data('namespace') || $app.data('ns'));
                return;
            }

            $('.app').hide();
            $app.show();

            dynCore.favicon(apps[app].favicon);
            $('title').text($app.data('app'));
        });

        hashNav.bindNavSection((app, section, args) => {
            var $app = $('#app-' + app);
            var sectionSelector;
            if (app && section) {
                sectionSelector = '#' + app + '-' + section;
            } else {
                sectionSelector = '.defaultSection';
            }

            $app.find('.contentSection').hide();
            $app.find(sectionSelector).show();
        });

        bind($('body'), globalModel);

        hashNav.rehash();

        return container.init;
    });
})(window.dynCore);