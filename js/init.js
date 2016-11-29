/**
 * Created by t.blindaruk on 11.11.16.
 */

define('init',['api','jquery','userViewModel'],function (api,$,UserViewModel) {
    let userList = $('#userList');

    function createUserWrapper() {
        var $wrapper = $('<div>');
        userList.append($wrapper);
        return $wrapper;
    }

    function showUsers(users) {
        for (let i = 0; i < users.length; ++i) {
            let userView = Object.create(UserViewModel);
            let $userWrapper = createUserWrapper();
            userView.init(users[i]).then(function (value) {
                $userWrapper.append(userView.getUserBlock());
            }, function (error) {

            });
        }
    }

    var PublicApi = {
        userList: function () {
            api.getUsers()
                .then(function (users) {
                    showUsers(users);
                }, function (error) {
                    alert(error);
                });
        },
        init: function () {
            this.userList();
        }
    };

    return Object.create(PublicApi);
});