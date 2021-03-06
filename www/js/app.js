// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'starter.directives', 'ngFileUpload', 'ImageCropper', 'utils.service'])
    .constant('jquery', window.jQuery)
    .constant('Hammer', window.Hammer)
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })
    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.tabs.style('standard');
      $ionicConfigProvider.navBar.alignTitle('center');
      $ionicConfigProvider.form.toggle('large');
      $ionicConfigProvider.scrolling.jsScrolling(false);
    }])
    .config(function ($stateProvider, $urlRouterProvider) {
      // setup an abstract state for the tabs directive
      $stateProvider
          .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/sign-in.html',
            controller: 'SignInCtrl'
          })
          .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
          })

          .state('tab.home', {
            url: '/home',
            views: {
              'tab-dash': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
              }
            }
          })
          .state('tab.alert', {  // 提醒页签
            url: '/alert',
            views: {
              'tab-alert': {
                templateUrl: 'templates/tab-alert.html',
                controller: 'AlertCtrl'
              }
            }
          })
          .state('tab.contact', { // 联系人页签
            url: '/contact',
            abstract: true,
            views: {
              'tab-contact': {
                template: '<ion-nav-view></ion-nav-view>'
              }
            }
          })
          .state('tab.contact.list', {
            url: '',
            templateUrl: 'templates/contacts.html',
            controller: 'ContactCtrl'
          })
          .state('tab.contact.detail', {
            url: '/:chatId',
            templateUrl: 'templates/contact-detail.html',
            controller: 'ContactDetailCtrl'
          })
          .state('tab.followContacts', {
            url: '/follow-contacts',
            abstract: true,
            views: {
              'tab-contact': {
                template: '<ion-nav-view></ion-nav-view>'
              }
            }
          })
          .state('tab.followContacts.list', {
            url: '',
            templateUrl: 'templates/follow-contacts.html',
            controller: 'FollowContactsCtrl'
          })
          .state('tab.followCompanies', {
            url: '/follow-companies',
            abstract: true,
            views: {
              'tab-contact': {
                template: '<ion-nav-view></ion-nav-view>'
              }
            }
          })
          .state('tab.followCompanies.list', {
            url: '',
            templateUrl: 'templates/follow-companies.html',
            controller: 'FollowCompaniesCtrl'
          })
          .state('tab.contact.add', {
            url: '/contact/add',
            templateUrl: 'templates/contact-add.html',
            controller: 'ContactAddFormCtrl'
          })
          .state('tab.search', {
            url: '/search',
            views: {
              'tab-contact': {
                templateUrl: 'templates/contact-search.html',
                controller: 'ContactSearchCtrl'
              }
            }
          })
          .state('tab.contactDocument', { // 联系人页签
            url: '/doc',
            abstract: true,
            views: {
              'tab-contact': {
                template: '<ion-nav-view></ion-nav-view>'
              }
            }
          })
          .state('tab.contactDocument.list', {
            url: '',
            templateUrl: 'templates/contact-document.html',
            controller: 'ContactDocumentCtrl'
          })
          .state('tab.commentUser', {  // 评价用户
            url: '/comment',
            views: {
              'tab-contact': {
                templateUrl: 'templates/comment-user.html',
                controller: 'CommentUserCtrl'
              }
            }
          })
          .state('tab.companyInfo', {  // 公司信息
            url: '/company',
            views: {
              'tab-contact': {
                templateUrl: 'templates/company-info.html',
                controller: 'CompanyInfoCtrl'
              }
            }
          })
          .state('tab.companyInfoFromProfile', {  // 从档案列表获取的公司信息
            url: '/company-from-profile',
            views: {
              'settings': {
                templateUrl: 'templates/company-info.html',
                controller: 'CompanyInfoCtrl'
              }
            }
          })
          .state('tab.account', {
            url: '/account',
            abstract: true,
            views: {
              'tab-account': {
                template: '<ion-nav-view></ion-nav-view>'
              }
            }
          })
          .state('tab.account.options', {
            url: '',
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          })
          .state('tab.account.selfIntro', {
            url: '/selfIntro',
            template: '<h1>self introduction</h1>'
          })
          .state('tab.settings', {
            url: '/settings',
            abstract: true,
            views: {
              'settings': {
                template: '<ion-nav-view></ion-nav-view>'
              }
            }
          })
          .state('tab.settings.options', {
            url: '',
            templateUrl: 'templates/settings.html',
            controller: 'AccountCtrl'
          })
          .state('tab.settings.editProfile', {
            url: '/editProfile',
            templateUrl: 'templates/edit-profile.html',
            controller: 'EditProfileCtrl'
          })
          .state('tab.settings.editAvatar', {
            url: '/editAvatar',
            templateUrl: 'templates/edit-avatar.html',
            controller: 'EditAvatarCtrl'
          })
          .state('tab.settings.editDocument', {
            url: '/editDocument',
            templateUrl: 'templates/edit-document.html',
            controller: 'EditDocumentCtrl'
          });
// if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/sign-in');
//$urlRouterProvider.otherwise('/tab/home');

    })
    .
    controller('HomeTabCtrl', function ($scope) {
      console.log('HomeTabCtrl');
    })
    .filter('matchUsernameFilter', [function () {
      return function (users, myParam) {
        var result = [];
        var matchReg = new RegExp(myParam, 'i');
        for (var i = 0; i < users.length; i++) {
          if (matchReg.test(users[i].name)) {
            result.push(users[i]);
          }
        }

        return result;
        //angular.forEach(users, function (user, key) {
        //  if (user.name.toLocaleLowerCase().indexOf(myParam) != -1) {
        //    result[key] = user;
        //  }
        //});
        //return result;
      };
    }]);
