// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    };
    saved = [
      { "id": 1 }
    ]
    //co nsole.log(Saved)
    window.localStorage['Saved'] = JSON.stringify(saved);
    console.log(window.localStorage['Saved']);
    //var list = JSON.parse(window.localStorage['Saved'] || '{}');

     
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'LocationCtrl'
      }
    }
  })

  .state('tab.list', {
      url: '/home/:ID',
      views: {
        'tab-home': {
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
        }
      }
    })
    .state('tab.saved', {
      url: '/saved',
      views: {
        'tab-saved': {
          templateUrl: 'templates/saved.html',
          controller: 'SavedCtrl'
        }
      }
    })
    .state('tab.fish', {
      url: '/fish',
      views: {
        'tab-fish': {
          templateUrl: 'templates/fish.html',
          controller: 'FishCtrl'
        }
      }
    })
  .state('tab.loading', {
    url: '/loading',
    views: {
      'tab-loading': {
        templateUrl: 'templates/loading.html',
        controller: 'LoadCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/fish');

});