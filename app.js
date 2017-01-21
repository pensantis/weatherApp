//MODULE
var weatherApp2 = angular.module('myApp', ['ngRoute', 'ngResource', 'ngMaterial']);

//CONTROLLERS

weatherApp2.controller('appController', function ($scope, cityService, $routeParams, $http, $sce, $location, $resource) {

    $scope.city = cityService.city;
    $scope.cities = [];

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
        console.log($scope.city)
    });

    $scope.addCity = function () {

        if (!$scope.selectedItem) {
            return;
        }

        $scope.weatherAPI = $resource('http://api.wunderground.com/api/92f2c5d6fc556539/conditions/q/zmw:' + $scope.selectedItem.zmw + '.json', {
            get: {
                method: "JSONP"
            }
        });

        $scope.weatherResult = $scope.weatherAPI.get();
        console.log($scope.weatherResult);

        var newCity = {
            name: $scope.selectedItem.name,
            temp: '12',
            hour: ' 14:00',
            city: $scope.weatherResult
        };



        $scope.cities.push(newCity);
        $scope.searchText = '';
        $scope.selectedItem = null;
    };

    $scope.data = '';
    $scope.selectedItem = null;
    $scope.searchText = '';


    $scope.changeCity = function (tte) {
        console.log(tte)
    }


    $scope.dataGet = function () {
        //console.log('details', $scope.data, $scope.selectedItem, $scope.searchText);
        var tempurl = 'http://autocomplete.wunderground.com/aq?query=' + $scope.searchText;
        url = $sce.trustAsResourceUrl(tempurl);

        $http.jsonp(url, {
            jsonpCallbackParam: 'cb'
        })
            .then(function (data) {
                //console.log(data);
                $scope.data = data.data.RESULTS;
            });
        return $scope.data;
    };

    $scope.changeView = function () {
        if ($scope.selectedItem !== null) {
            services.selectedItem = $scope.selectedItem;
            services.city = $scope.selectedItem.name;
            //$location.path('/wunderforecast');
        }
    };
});
