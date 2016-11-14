/**
 * Created by tania on 10.11.16.
 */

window.app.viewModel = (function () {
    return {
        readPartial: function (file) {
            return new Promise(function (resolve, reject) {
                $.get({
                    url: file,
                    success: function (response) {
                        resolve(response);
                    },
                    error: function (xhr) {
                        reject(xhr);
                    }
                });
            });
        }
    };
})();