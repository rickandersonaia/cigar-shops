// require.js looks for the following global when initializing
var require = {
    baseUrl: "../src",
    paths: {
        // [Scaffolded bindings will be inserted here. To retain this feature, don't remove this comment.]
        "ignore":           "models/rick-ignore-list",
        "crossroads":       "../node_modules/crossroads/dist/crossroads.min",
        "hasher":           "../node_modules/hasher/dist/js/hasher.min",
        "knockout":         "../node_modules/knockout/build/output/knockout-latest",
        "knockout-mapping": "../node_modules/knockout-mapping/dist/knockout.mapping",
        "signals":          "../node_modules/signals/dist/signals.min",
        "text":             "../node_modules/requirejs-text/text",
        "jquery":           "https://code.jquery.com/jquery-2.2.4.min",
        "jquery.bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
        "extenders":        "app/extenders"
    },
    shim: {
        "jquery.bootstrap": {
            deps: ["jquery"]
        }
    }
};