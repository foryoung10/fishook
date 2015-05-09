angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('LocationCtrl', function($scope, $http, $cordovaGeolocation) {
      console.log("In LocationCtrl")
      $scope.getLocation = function() {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            $scope.lat = position.coords.latitude
            $scope.long = position.coords.longitude
          }, function (err) {
            // error
          });


      var watchOptions = {
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
      };
    }
    $.ajax({
        url       : 'https://api.clusterpoint.com/658/Promotions/_list_first/30/0.json',
        type      : 'POST',
        dataType  : 'json',
        data      : '{"query": "<name>Test</name>"}',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa('yesh0907@hotmail.com:fishook123'));
            console.log("Logged In");
        },
        success: function (data) {
            console.log(data);
            if (typeof success != 'undefined') {
                success(data);
            }
            $scope.data= data
        },
        fail: function (data) {
            alert(data.error);
            if (typeof fail != 'undefined') {
                fail(data);
            }
        }
    });
    })

.controller('ChatsCtrl', function($scope, $stateParams, Chats) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
