angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})

.controller('LocationCtrl', function($scope, $http, $cordovaGeolocation, $cordovaDeviceMotion) {
      console.log("In LocationCtrl");
        $scope.everythingLoaded = false;
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
    $scope.random= function() {
        return 0.5-Math.random()
    }

      var watchOptions = {
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
      };
    }

    var req = {
            method: 'POST',
            url: 'https://api.clusterpoint.com/658/Promotions/_list_first/30/0.json',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Basic ' + btoa('yesh0907@hotmail.com:fishook123')
            },
            data      : '{"query": "<name>Test</name>"}'
        }
        $http(req)
            .success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.data = data;
                console.log('success');
                $scope.everythingLoaded = true;
            })
            .error(function(data, status, headers, config) {
                /* /	// called asynchronously if an error occurs
                 */ // or server returns response with an error status.
            });




        //$.ajax({
        //    url       : 'https://api.clusterpoint.com/658/Promotions/_list_first/30/0.json',
        //    type      : 'POST',
        //    dataType  : 'json',
        //    data      : '{"query": "<name>Test</name>"}',
        //    beforeSend: function (xhr) {
        //        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('yesh0907@hotmail.com:fishook123'));
        //        console.log("Logged In");
        //    },
        //    success: function (data) {
        //        console.log(data);
        //        if (typeof success != 'undefined') {
        //            success(data);
        //        }
        //        $scope.data= data
        //    },
        //    fail: function (data) {
        //        alert(data.error);
        //        if (typeof fail != 'undefined') {
        //            fail(data);
        //        }
        //    }
        //});



    })

.controller('ListCtrl', function($scope, $stateParams, $http, $state, $ionicPopup, $window) {
        $scope.contentLoaded = false;
    console.log('listCtrl');
    $scope.ID =  $stateParams.ID;
    console.log($stateParams.ID);
    var req = {
        method: 'POST',
        url: 'https://api.clusterpoint.com/658/Promotions/_lookup/'+$stateParams.ID+'.json',
        headers: {
            'Content-Type': undefined,
            'Authorization': 'Basic ' + btoa('yesh0907@hotmail.com:fishook123')
        },
        data      : '{"query": "<name>Test</name>"}'
    }
    $http(req)
        .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.data = data
            console.log('success')
            $scope.contentLoaded = true;
        })
        .error(function(data, status, headers, config) {
            /* /	// called asynchronously if an error occurs
             */ // or server returns response with an error status.
        });
    $scope.save = function()    {
        $state.go("tab.saved");
        var list = JSON.parse($window.localStorage['Saved'] || '{}');
        console.log(list)
        list.push({
            id: $scope.ID
        });
        $window.localStorage['Saved'] = JSON.stringify(list);


        $ionicPopup.alert({
            title: 'Fishook',
            template: 'Coupon Saved'
        });

    }
})

.controller('SavedCtrl', function($scope, $stateParams, $state, $http,$window) {
        $scope.$on( "$ionicView.enter", function( scopes, states ) {
            console.log('Entered Loading View')
            load()
        });

        load = function() {
            $scope.data=[];
            var items = []
            var list = JSON.parse($window.localStorage['Saved'] || '{}');
            console.log(list.id)
            for (var i = 0; i < list.length; i++) {
                console.log('a')
                console.log(list[i].id)
                var req = {
                    method: 'POST',
                    url: 'https://api.clusterpoint.com/658/Promotions/_lookup/'+list[i].id+'.json',
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Basic ' + btoa('yesh0907@hotmail.com:fishook123')
                    },
                    data      : '{"query": "<name>Test</name>"}'
                }
                $http(req)
                    .success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log(data)
                        //$scope.data.push({id:1
                        items.push(data.documents);
                        console.log(items)
                    })
                    .error(function(data, status, headers, config) {
                        /* /	// called asynchronously if an error occurs
                         */ // or server returns response with an error status.
                    });
            }
            $scope.data = items
            //var coupons = []
            //for(i=0; i<items.length; i++) {
            //    console.log(items)
            //    coupons.push(items[i])
            //}
            //$scope.data = coupons
        }
        $scope.fish = function(){
            $state.go('tab.fish')
        }

})

.controller('FishCtrl', function($scope, $cordovaDeviceMotion, $window, $cordovaVibration, $timeout, $state) {
        var myShakeEvent = new Shake({
            threshold: 15, // optional shake strength threshold
            timeout: 1000 // optional, determines the frequency of event generation
        });

        myShakeEvent.start();

        $window.addEventListener('shake', shakeEventDidOccur, false);
        //function to call when shake occurs
        function shakeEventDidOccur () {
            $cordovaVibration.vibrate(1000);
            //put your own code here etc.
            $state.go('tab.loading')
            //$scope.showRod=true;
            // //close the popup after 3 seconds for some reason
        }

        $scope.swipe = function() {
            console.log("swiped");
            //$cordovaVibration.vibrate(1000);
            $state.go('tab.loading')
        }

})
.controller('LoadCtrl', function($scope, $stateParams, $state, $timeout) {
        $scope.$on( "$ionicView.enter", function( scopes, states ) {
            console.log('Entered Loading View')
            load()
        });

        var load= function() {
            console.log('loading')
            $state.go($state.current, {}, {reload: true});
            $timeout(function () {
                $state.transitionTo('tab.home') //close the popup after 3 seconds for some reason
            }, 2000);
        }
    });

//document.addEventListener("deviceready", function () {
//
//    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
//        var last_X = result.x;
//        var last_Y = result.y;
//        var last_Z = result.z;
//        var timeStamp = result.timestamp;
//    }, function(err) {
//        // An error occurred. Show a message to the user
//    });
//
//}, false);
//
//
//// watch Acceleration
//var options = { frequency: 1000 };
//
//document.addEventListener("deviceready", function () {
//
//    var watch = $cordovaDeviceMotion.watchAcceleration(options);
//    watch.then(
//        null,
//        function(error) {
//            // An error occurred
//        },
//        function(result) {
//            var X = result.x;
//            var Y = result.y;
//            var Z = result.z;
//            var timeStamp = result.timestamp;
//            //alert('abc')
//
//            change_X = Math.abs(last_X - X);
//            change_Y = Math.abs(last_Y - Y);
//            change_Z = Math.abs(last_Z - Z);
//            if (change_X > 0 || change_Y > 0 || change_Z > 0)   {
//                alert('abc');
//            }
//        }
//
//
//    );
//
//    $scope.stopWatch=function(watch) {
//        watch.clearWatch();
//    }
//    //
//    //    // OR
//    //    $cordovaDeviceMotion.clearWatch(watch)
//    //        .then(function(result) {
//    //            // success
//    //        }, function (error) {
//    //            // error
//    //        });
//    //
//}, false);