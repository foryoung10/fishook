angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('LocationCtrl', function($scope, $http, $cordovaGeolocation, $cordovaDeviceMotion) {
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
        document.addEventListener("deviceready", function () {

            $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
                var last_X = result.x;
                var last_Y = result.y;
                var last_Z = result.z;
                var timeStamp = result.timestamp;
            }, function(err) {
                // An error occurred. Show a message to the user
            });

        }, false);


        // watch Acceleration
        var options = { frequency: 1000 };

        document.addEventListener("deviceready", function () {

            var watch = $cordovaDeviceMotion.watchAcceleration(options);
            watch.then(
                null,
                function(error) {
                    // An error occurred
                },
                function(result) {
                    var X = result.x;
                    var Y = result.y;
                    var Z = result.z;
                    var timeStamp = result.timestamp;
                    //alert('abc')

                    change_X = Math.abs(last_X - X);
                    change_Y = Math.abs(last_Y - Y);
                    change_Z = Math.abs(last_Z - Z);
                    if (change_X > 0 || change_Y > 0 || change_Z > 0)   {
                        alert('abc');
                    }
                }


            );

            $scope.stopWatch=function(watch) {
                watch.clearWatch();
            }
        //
        //    // OR
        //    $cordovaDeviceMotion.clearWatch(watch)
        //        .then(function(result) {
        //            // success
        //        }, function (error) {
        //            // error
        //        });
        //
        }, false);


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
