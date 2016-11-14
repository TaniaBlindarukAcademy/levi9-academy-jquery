/**
 * Created by tania on 10.11.16.
 */

window.app.api = (function () {

    function sendRequest(url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr) {
                    reject(xhr);
                }
            });
        });
    }

    function getUserLinks(url) {
        return sendRequest(url);
    }

    return {
        getUsers: function () {
            return sendRequest('https://api.github.com/users');
        },
        getUser: function (user) {
            return sendRequest(`https://api.github.com/user/${user['id']}`);
        },
        getUserFollowers: function (user) {
            return getUserLinks(user['followers_url']);
        },
        getUserFollowings: function (user) {
            return getUserLinks(`https://api.github.com/users/${user['login']}/following`);
        },
        getUserStarred: function (user) {
            return getUserLinks(`https://api.github.com/users/${user['login']}/starred`);
        },
        getUserSubscriptions: function (user) {
            return getUserLinks(user['subscriptions_url']);
        },
        getUserOrganizations: function (user) {
            return getUserLinks(user['organizations_url']);
        },
        getUserRepos: function (user) {
            return getUserLinks(user['repos_url']);
        }
    };
})();