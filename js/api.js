/**
 * Created by tania on 10.11.16.
 */

define('api',['jquery'], function ($) {

    function sendRequest(url) {
        return $.ajax({url: url});
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
});