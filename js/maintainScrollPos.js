((dynCore) => {
    dynCore.declare('app.maintainScrollPos', function() {
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

        return function() {
            if (scrollY && pageAccessedByReload) {
                // scroll after current execution queue
                setTimeout(() => {
                    window.scrollTo(0, scrollY);
                    // prevent additional scrolling once done
                    setTimeout(() => {
                        scrollY = null;
                    }, 0);
                }, 0);
            }
        }
    });
})(window.dynCore);