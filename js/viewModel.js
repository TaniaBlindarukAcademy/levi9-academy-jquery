/**
 * Created by tania on 10.11.16.
 */
define(['jquery'], function ($) {
    return {
        readPartial: function (file) {
            return $.get({url: file});
        }
    };
});