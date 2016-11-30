/**
 * Created by t.blindaruk on 11.11.16.
 */

define('init', ['api', 'jquery', 'userViewModel'], function (api, $, UserViewModel) {
    let userList = $('#userList');

    function _createUserWrapper() {
        var $wrapper = $('<div>');
        userList.append($wrapper);
        return $wrapper;
    }

    function _showUsers(users) {
        for (let i = 0; i < users.length; ++i) {
            let userView = Object.create(UserViewModel);
            let $userWrapper = _createUserWrapper();
            userView.init(users[i]).then(function (value) {
                $userWrapper.append(userView.getUserBlock());
            }, function (error) {

            });
        }
    }

    function init() {
        return api.getUsers()
            .then(function (users) {
                _showUsers(users);
            }, function (error) {
                alert(error);
            });
    }

    return {
        init: init
    };
});