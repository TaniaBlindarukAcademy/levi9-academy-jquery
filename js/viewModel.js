/**
 * Created by tania on 10.11.16.
 */

window.app.viewModel = (function () {
    return {
        readPartial: function (file) {
            return $.get({url: file});
        }
    };
})();