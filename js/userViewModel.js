/**
 * Created by t.blindaruk on 11.11.16.
 */

var UserViewModel = (function (viewModel, api) {

    var templateOptionGlobal = {};

    function showUser($userPartialView, user) {
        var templateClassOption = templateOptionGlobal.classNames;
        $userPartialView.find(`.${templateClassOption['login']}`).html( user['login']);
        $userPartialView.find(`.${templateClassOption['avatar']}`).attr('src',user['avatar_url']);
        $userPartialView.find(`.${templateClassOption['avatar']}`).attr('id',user['id']);
        user['site_admin'] ? $userPartialView.find(`.${templateClassOption['admin']}`).html( "Admin") : null;
    }

    function toggle($element) {
        var className = 'hidden';
        var hasClass = $element.hasClass(className);
        if (hasClass === true) {
            $element.removeClass(className);
            return true;
        } else {
            $element.addClass(className);
            return false;
        }
    }

    function appendLinks(self, linksBlockClass, callback, urlParam, nameParam) {
        var user = self.user;
        var $followersListElement = self.userBlock.find(`.${linksBlockClass}`)[0];
        callback(user).then(function (values) {
            for (let i = 0; i < values.length; ++i) {
                var value = values[i];

                var url = urlParam ? value[urlParam] : value['html_url'];

                var name = nameParam ? value[nameParam] : value['login'];

                var $followerElement = $('<a target="_blank">');
                $followerElement.text(name);
                $followerElement.attr('href', url);
                $followerElement.addClass('list-group-item');
                $followersListElement.append($followerElement[0]);

            }
        }, function (error) {

        })
    }

    var UserViewModel = Object.create(viewModel);

    UserViewModel.init = function (user, templateOption) {
        var self = this;
        self.user = user;
        self.htmlDocument = false;
        self.initTemplateOption(templateOption);
        return new Promise(function (resolve, reject) {
            self.readPartial('partial/user.html')
                .then(function (htmlText) {

                    var html = $('<body>');
                    html.html(htmlText);
                    self.htmlDocument = html;

                    showUser(html, self.user);
                    self.onClickHead(self.getUserBlock());

                    resolve(true);
                }, function (error) {
                    reject(error);
                    alert(error);
                });
        })
    };

    UserViewModel.initTemplateOption = function (templateOption) {
        templateOptionGlobal = templateOption;
        if (!templateOptionGlobal) {
            templateOptionGlobal = {};
        }
        if (!templateOptionGlobal.classNames) {
            templateOptionGlobal.classNames = {};
        }
        if (!templateOptionGlobal.classNames['mainBlock']) {
            templateOptionGlobal.classNames['mainBlock'] = 'panel-user';
        }
        if (!templateOptionGlobal.classNames['headingBlock']) {
            templateOptionGlobal.classNames['headingBlock'] = 'panel-user-heading';
        }
        if (!templateOptionGlobal.classNames['userName']) {
            templateOptionGlobal.classNames['userName'] = 'user-name';
        }
        if (!templateOptionGlobal.classNames['userEmail']) {
            templateOptionGlobal.classNames['userEmail'] = 'user-email';
        }
        if (!templateOptionGlobal.classNames['followerLinks']) {
            templateOptionGlobal.classNames['followerLinks'] = 'follower-links';
        }
        if (!templateOptionGlobal.classNames['followingsLinks']) {
            templateOptionGlobal.classNames['followingsLinks'] = 'followings-links';
        }
        if (!templateOptionGlobal.classNames['starredLinks']) {
            templateOptionGlobal.classNames['starredLinks'] = 'starred-links';
        }
        if (!templateOptionGlobal.classNames['subscriptionLinks']) {
            templateOptionGlobal.classNames['subscriptionLinks'] = 'subscription-links';
        }
        if (!templateOptionGlobal.classNames['organizationLinks']) {
            templateOptionGlobal.classNames['organizationLinks'] = 'organization-links';
        }
        if (!templateOptionGlobal.classNames['reposLinks']) {
            templateOptionGlobal.classNames['reposLinks'] = 'repos-links';
        }
        if (!templateOptionGlobal.classNames['login']) {
            templateOptionGlobal.classNames['login'] = 'login';
        }
        if (!templateOptionGlobal.classNames['avatar']) {
            templateOptionGlobal.classNames['avatar'] = 'avatar';
        }
        if (!templateOptionGlobal.classNames['admin']) {
            templateOptionGlobal.classNames['admin'] = 'admin';
        }
        return this;
    };

    UserViewModel.getUserBlock = function ($document, number) {
        if (!this.userBlock) {
            $document = $document ? $document : this.htmlDocument;
            number = number ? number : 0;
            this.userBlock = $($document.find(`.${templateOptionGlobal.classNames['mainBlock']}`)[number]);
        }

        return this.userBlock;
    };

    UserViewModel.onClickHead = function ($element) {
        var self = this;
        $element = $element.find(`.${templateOptionGlobal.classNames['headingBlock']}`);
        $element.on('click', function (value) {
            var show = self.toggleBody($element);
            if (show && !self.isUserLoaded) {
                api.getUser(self.user).then(function (val) {
                    self.user = val;
                    self.addAdditionalInformation();
                    self.isUserLoaded = false;
                }, function (error) {

                });
            }
        });
    };

    UserViewModel.addAdditionalInformation = function () {
        this.appendUserName();
        this.appendUserEmail();
        this.appendUserFollowers();
        this.appendUserFollowings();
        this.appendUserStarred();
        this.appendUserSubscription();
        this.appendUserOrganization();
        this.appendUserRepos();
    };

    UserViewModel.toggleBody = function ($element) {
        return toggle($element.next());
    };

    UserViewModel.appendUserName = function () {
        this.userBlock.find(`.${templateOptionGlobal.classNames['userName']}`).text(this.user['name']);
        return this;

    };

    UserViewModel.appendUserEmail = function () {
        var $emailElement = this.userBlock.find(`.${templateOptionGlobal.classNames['userEmail']}`);
        var email = this.user['email'];
        if (email) {
            $emailElement.text(`(${email})`);
            $emailElement.attr('href', `mailto:${email}`);
        }
    };

    UserViewModel.appendUserFollowers = function () {
        appendLinks(this, templateOptionGlobal.classNames['followerLinks'], api.getUserFollowers);
    };

    UserViewModel.appendUserFollowings = function () {
        appendLinks(this, templateOptionGlobal.classNames['followingsLinks'], api.getUserFollowings);
    };

    UserViewModel.appendUserStarred = function () {
        appendLinks(this, templateOptionGlobal.classNames['starredLinks'], api.getUserStarred, 'html_url', 'name');
    };

    UserViewModel.appendUserSubscription = function () {
        appendLinks(this, templateOptionGlobal.classNames['subscriptionLinks'], api.getUserSubscriptions, 'html_url', 'name');
    };

    UserViewModel.appendUserOrganization = function () {
        appendLinks(this, templateOptionGlobal.classNames['organizationLinks'], api.getUserOrganizations, 'url', 'login');
    };

    UserViewModel.appendUserRepos = function () {
        appendLinks(this, templateOptionGlobal.classNames['reposLinks'], api.getUserRepos, 'html_url', 'full_name')
    };

    return UserViewModel;
})(window.app.viewModel, window.app.api);
