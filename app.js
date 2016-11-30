/**
 * Created by t.blindaruk on 29.11.16.
 */

requirejs.config({
    baseUrl: '/levi9-academy-jquery/js',
    paths: {
        jquery: '../node_modules/jquery/dist/jquery.min',
        api: 'api',
        userViewModel: 'userViewModel',
        viewModel:'viewModel',
        init: 'init'
    }
});


require(['init'],function (init) {
    init.init();
});