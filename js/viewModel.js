/**
 * Created by tania on 10.11.16.
 */
define('viewModel',['jquery'],function ($) {
    return {
        readPartial: function (file) {
            return $.get({url: file});
        }
    };
});