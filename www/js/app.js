// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

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
    $stateProvider.
      state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('tab.contact', {
        url: '/contact',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-contact.html',
            controller: 'ContactCtrl'
          }
        }
      })
      .state('tab.contact-detail', {
        url: '/contact/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/contact-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })
      .state('tab.contact-document', {
        url: '/contact/:chatId/document',
        views: {
          'tab-chats': {
            templateUrl: 'templates/contact-document.html',
            controller: 'ContactDocumentCtrl'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('tab.avatar', {
        url: '/avatar',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-avatar.html',
            controller: 'AvatarCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  })
  .controller('HomeTabCtrl', function ($scope) {
    console.log('HomeTabCtrl');
  });
