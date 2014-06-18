'use strict';

angular.module('app', ['Services'])

.controller('Ctrl', function ($scope, user, TravelService, WeatherService, $q) {

    $scope.user = user;

    TravelService
        .getDeparture(user)
        .then(function (departure) {
            $scope.departure = departure;

            $q.all([
                TravelService.getFlight(departure.flightId),
                WeatherService.getForecast(departure.date)
            ])
            .then(function (res) {
                $scope.flight = res[0];
                $scope.weather = res[1];
            });

        });

    // function loadDeparture(user) {
    //     return TravelService
    //         .getDeparture(user)
    //         .then(function (departure) {
    //             $scope.departure = departure;

    //             return departure;
    //         });
    // }

    // function loadFlight(departure) {
    //     return TravelService
    //         .getFlight(departure.flightId)
    //         .then(function (flight) {
    //             $scope.flight = flight;

    //             return flight;
    //         });
    // }

    // function loadForecast() {
    //     return WeatherService
    //         .getForecast($scope.departure.date)
    //         .then(function (weather) {
    //             $scope.weather = weather;
    //         });
    // }

    // loadDeparture(user)
    // .then(loadFlight)
    // .then(loadForecast);

});