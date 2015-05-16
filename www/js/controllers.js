var load;

angular.module('starter.controllers', [])

    .controller('MainCtrl', function ($scope) { })

    .controller('LocationCtrl', function ($scope, $http, $cordovaGeolocation, $cordovaDeviceMotion) {
    console.log("In LocationCtrl");
    $scope.everythingLoaded = false;
    $scope.getLocation = function () {
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
            $scope.lat = position.coords.latitude;
            $scope.long = position.coords.longitude;
        }, function (err) {
                // error
            });
        $scope.random = function () {
            return 0.5 - Math.random();
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
        data: '{"query": "<name>Test</name>"}'
    };
    $http(req)
        .success(function (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.data = data;
        console.log('success');
        $scope.everythingLoaded = true;
    })
        .error(function (data, status, headers, config) {
        /* /	// called asynchronously if an error occurs
         */ // or server returns response with an error status.
    });
})

.controller('ListCtrl', function ($scope, $stateParams, $http, $state, $ionicPopup, $window) {
    $scope.contentLoaded = false;
    console.log('listCtrl');
    $scope.ID = $stateParams.ID;
    console.log($stateParams.ID);
    var req = {
        method: 'POST',
        url: 'https://api.clusterpoint.com/658/Promotions/_lookup/' + $stateParams.ID + '.json',
        headers: {
            'Content-Type': undefined,
            'Authorization': 'Basic ' + btoa('yesh0907@hotmail.com:fishook123')
        },
        data: '{"query": "<name>Test</name>"}'
    };
    $http(req)
        .success(function (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.data = data;
        console.log('success');
        $scope.contentLoaded = true;
        $window.localStorage['Saved'] = JSON.stringify(data);
        console.log($window.localStorage['Saved']);
    })
        .error(function (data, status, headers, config) {
        /* /	// called asynchronously if an error occurs
         */ // or server returns response with an error status.
    });
    $scope.save = function () {
        $state.go("tab.saved");
        var list = JSON.parse($window.localStorage['Saved'] || '{}');
        console.log(list);
        list.push({
            id: $scope.ID
        });
        $ionicPopup.alert({
            title: 'Fishook',
            template: 'Coupon Saved'
        });

    };
})

.controller('SavedCtrl', function ($scope, $stateParams, $state, $http, $window) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        console.log('Entered Loading View');
        load();
    });

    load = function () {
        $scope.data = [];
        var items = [];
        var list = JSON.parse($window.localStorage['Saved'] || '{}');
        console.log(list.id);
        for (var i = 0; i < list.length; i++) {
            console.log(list[i].id);
            var req = {
                method: 'POST',
                url: 'https://api.clusterpoint.com/658/Promotions/_lookup/' + list[i].id + '.json',
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Basic ' + btoa('yesh0907@hotmail.com:fishook123')
                },
                data: '{"query": "<name>Test</name>"}'
            }
            $http(req)
                .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data)
                //$scope.data.push({id:1
                items.push(data[i]);
                console.log(items)
            })
                .error(function (data, status, headers, config) {
                /* /	// called asynchronously if an error occurs
                 */ // or server returns response with an error status.
            });
        }
        $scope.data = items;
        //var coupons = []
        //for(i=0; i<items.length; i++) {
        //    console.log(items)
        //    coupons.push(items[i])
        //}
        //$scope.data = coupons
    };
    $scope.fish = function () {
        $state.go('tab.fish')
    }

})

.controller('FishCtrl', function ($scope, $cordovaDeviceMotion, $window, $cordovaVibration, $timeout, $state) {
    var myShakeEvent = new Shake({
        threshold: 15, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });

    myShakeEvent.start();

    $window.addEventListener('shake', shakeEventDidOccur, false);
    //function to call when shake occurs
    function shakeEventDidOccur() {
        $cordovaVibration.vibrate(1000);
        $state.go('tab.loading');
    }

    $window.addEventListener('deviceshake', function () {
        $cordovaVibration.vibrate(1000);
        $state.go('tab.loading')
    }, false);

    $scope.swipe = function () {
        console.log("swiped");
        $cordovaVibration.vibrate(1000);
        $state.go('tab.loading');
    };

})
    .controller('LoadCtrl', function ($scope, $stateParams, $state, $timeout) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        console.log('Entered Loading View');
        load();
    });

    var load = function () {
        console.log('loading')
        $state.go($state.current, {}, { reload: true });
        $timeout(function () {
            $state.transitionTo('tab.home'); //close the popup after 3 seconds for some reason
        }, 2000);
    }
});

