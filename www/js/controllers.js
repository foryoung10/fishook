var load;

function saveData(data) {
    var list;

    if (window.localStorage.getItem('Saved') === null) {
        list = [];
    } else {
        list = JSON.parse(window.localStorage.getItem('Saved'));
    }

    list.push(data);
    console.log(list);

    window.localStorage.setItem('Saved', JSON.stringify(list));
}

angular.module('starter.controllers', [])

.filter('orderObjectBy', function () {
    return function (input, attribute) {
        if (!angular.isObject(input)) {
            return input;
        }

        var array = [];
        for (objectKeys in array) {
            array.push(input[objectKeys]);
        }

        array.sort(function (a, b) {
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);

            return a - b;
        });

        return array;
    }
})

.controller('MainCtrl', function ($scope) {})

.controller('LocationCtrl', function ($scope, $http, $cordovaGeolocation, $cordovaDeviceMotion) {
    $scope.everythingLoaded = false;
    $scope.getLocation = function () {
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
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


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var random = getRandomInt(1, 4);

    var req = {
        method: 'POST',
        url: 'https://api.clusterpoint.com/658/Promotions/_list_first/30/' + random + '.json',
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
            $scope.everythingLoaded = true;
        })
    .error(function (data, status, headers, config) {
            /* /	// called asynchronously if an error occurs
             */ // or server returns response with an error status.
         });
})

.controller('ListCtrl', function ($scope, $stateParams, $http, $state, $ionicPopup) {
    $scope.contentLoaded = false;
    $scope.ID = $stateParams.ID;
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
            $scope.contentLoaded = true;
        })
    .error(function (data, status, headers, config) {
            /* /	// called asynchronously if an error occurs
             */ // or server returns response with an error status.
         });
    $scope.save = function () {
        $state.go("tab.saved");
        saveData({
            id: $scope.ID
        });
        $ionicPopup.alert({
            title: 'Fishook',
            template: 'Coupon Saved'
        });
    };
})

.controller('SavedCtrl', function ($scope, $stateParams, $state, $http) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        load();
    });

    load = function () {
        $scope.data = [];
        var list = JSON.parse(window.localStorage.getItem('Saved'));

        for (var i = 0; i < list.length; i++) {
            var req = {
                method: 'POST',
                url: 'https://api.clusterpoint.com/658/Promotions/_lookup/' + list[i].id + '.json',
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Basic ' + btoa('yesh0907@hotmail.com:fishook123')
                },
                data: '{"query": "<name>Test</name>"}'
            };

            $http(req)
            .success(function (data, status, headers, config) {
                console.log(i);
                console.log(data.documents);
                $scope.data.push(data.documents);
                console.log($scope.data);
            })
            .error(function (data, status, headers, config) {});
        }
        
        // for (var j = 0; j < list.length; j++) {
        //     $scope.ID = [];
        //     $scope.ID[j].push(list[j].id);
        //     console.log($scope.ID);
        // }
    };
    $scope.fish = function () {
        $state.go('tab.fish');
    };
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
            $state.go('tab.loading');
        }, false);

        $scope.swipe = function () {
            console.log("swiped");
            $state.go('tab.loading');
        };

    })
.controller('LoadCtrl', function ($scope, $stateParams, $state, $timeout) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        load();
    });

    var load = function () {
        $state.go($state.current, {}, {
            reload: true
        });
        $timeout(function () {
                $state.transitionTo('tab.home'); //close the popup after 3 seconds for some reason
            }, 2000);
    };
});