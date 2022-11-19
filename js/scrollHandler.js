((dynCore) => {
    dynCore.declare('app.scrollHandler', () => {
        var scrollY;
        // https://stackoverflow.com/a/53307588
        const pageAccessedByReload = (
          (window.performance.navigation && window.performance.navigation.type === 1) ||
            window.performance
              .getEntriesByType('navigation')
              .map((nav) => nav.type)
              .includes('reload')
        );

        if (pageAccessedByReload && localStorage.getItem('currentHash') === window.location.hash) {
            scrollY = localStorage.getItem('scrollY');
        }

        localStorage.removeItem('currentHash');
        localStorage.removeItem('scrollY');

        $(window).unload(() => {
            localStorage.setItem('scrollY', window.pageYOffset);
            localStorage.setItem('currentHash', window.location.hash);
        });

        var scrollOnRefresh = function() {
            if (scrollY && pageAccessedByReload) {
                // scroll after current execution queue
                setTimeout(() => {
                    window.scrollTo(0, scrollY);
                    // prevent additional scrolling once done
                    setTimeout(() => {
                        scrollY = null;
                    }, 0);
                }, 0);
                return true;
            }
            return false;
        };

        var scrollToHash = function($fragment) {
            // looking for the id normally doesn't work if it has a / in it
            var $heading = $fragment.find('[id="' + window.location.hash.substr(1) + '"]');
            if ($heading.length) {
                setTimeout(() => {
                    window.scrollTo(0, $heading.offset().top - 20);
                }, 0);
            }
        };

        return {
            handleInitialScroll: function() {
                if (this === window) {
                    console.error('handleInitialScroll must be called with .call(this,)');
                } else {
                    scrollOnRefresh() || scrollToHash(this.$fragment);
                }
            },

            handleNavScroll: function(app, section, args) {
                if (this === window) {
                    console.error('handleNavScroll must be called with .call(this,)');
                } else if (app === this.title && section && this.model.title[section]) {
                    $('title').text(this.model.title[section]);
                    if (!args.length) {
                        window.scrollTo(0, 0);
                    } else {
                        scrollToHash(this.$app);
                    }
                }
            },

            scrollTop: function() {
                window.scrollTo(0, 0);
            }
        }
    });
})(window.dynCore);