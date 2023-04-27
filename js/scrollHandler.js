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

        var binarySearch = function(ar, el, compare_fn) {
            var m = 0;
            var n = ar.length - 1;
            while (m <= n) {
                var k = (n + m) >> 1;
                var cmp = compare_fn(el, ar[k]);
                if (cmp > 0) {
                    m = k + 1;
                } else if(cmp < 0) {
                    n = k - 1;
                } else {
                    return k;
                }
            }
            return -m - 1;
        };

        var setHash = function() {
            // if above the first heading, remove the hash
            var $headings = $('section.app:visible section.contentSection:visible h3[id]');
            if (!$headings.length) {
                return;
            }

            if ($headings.get(0).getBoundingClientRect().top > 125) {
                history.replaceState({}, '', window.location.pathname + window.location.search);
                return;
            }
            // user scrolled, binary search for nearest header and set hash
            var index = binarySearch($headings, 125, (target, element) => {
                return target - element.getBoundingClientRect().top;
            });
            var target = $headings.get(Math.abs(index + 2));
            history.replaceState({}, '', '#' + target.id);
        };

        var prevScroll = 0;
        var onScroll;
        $(window).on('scroll', (e) => {
            var currScroll = window.pageYOffset
            // if user scrolls more than 50 pixels, queue hash update
            // if scrolling continuously, wait until scrolling stops by resetting the timeout
            if (Math.abs(currScroll - prevScroll) > 50) {
                window.clearTimeout(onScroll);
                onScroll = window.setTimeout(setHash, 200);
                prevScroll = currScroll;
            }
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
                }, 100);
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
                    console.error('handleInitialScroll must be invoked with .call(this,)');
                } else {
                    scrollOnRefresh() || scrollToHash(this.$fragment || this.$app);
                }
            },

            handleNavScroll: function(app, section, args) {
                if (this === window) {
                    console.error('handleNavScroll must be invoked with .call(this,)');
                } else if (app === this.title) {
                    if (section && this.model.title[section]) {
                        $('title').text(this.model.title[section]);
                    }
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