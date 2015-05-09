angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('LocationCtrl', function($scope, $cordovaGeolocation) {

      $scope.getLocation = function() {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            $scope.lat = position.coords.latitude
            $scope.long = position.coords.longitude
          }, function (err) {
            // error
            console.error(err);
          });


      var watchOptions = {
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
      };
    }
})

.controller('ChatsCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
