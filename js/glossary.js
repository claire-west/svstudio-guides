((dynCore) => {
    dynCore.when(dynCore.require('app.container')).done((modules, container) => {
        container('glossary');
    });
})(window.dynCore);