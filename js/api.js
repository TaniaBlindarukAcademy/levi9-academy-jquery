/**
 * Created by tania on 10.11.16.
 */

define('api', ['jquery'], function ($) {

    'use strict';

    function _sendRequest(url) {
        return $.ajax({url: url});
    }

    function _getUserLinks(url) {
        return _sendRequest(url);
    }

    function getUsers() {
        return _sendRequest('https://api.github.com/users');
    }

    function getUser(user) {
        return _sendRequest(`https://api.github.com/user/${user['id']}`);
    }

    function getUserFollowers(user) {
        return _getUserLinks(user['followers_url']);
    }

    function getUserFollowings(user) {
        return _getUserLinks(`https://api.github.com/users/${user['login']}/following`);
    }

    function getUserStarred(user) {
        return _getUserLinks(`https://api.github.com/users/${user['login']}/starred`);
    }

    function getUserSubscriptions(user) {
        return _getUserLinks(user['subscriptions_url']);
    }

    function getUserOrganizations(user) {
        return _getUserLinks(user['organizations_url']);
    }

    function getUserRepos(user) {
        return _getUserLinks(user['repos_url']);
    }

    return {
        getUsers: getUsers,
        getUser: getUser,
        getUserFollowers: getUserFollowers,
        getUserFollowings: getUserFollowings,
        getUserStarred: getUserStarred,
        getUserSubscriptions: getUserSubscriptions,
        getUserOrganizations: getUserOrganizations,
        getUserRepos: getUserRepos
    };
});