'use strict';

angular.module('Services', [])

// .config()

.service('user', function () {

    return {
        name: 'Matias',
        email: 'info@matiasmancini.com.ar'
    };

})

.service('TravelService', function ($q, $timeout) {

    return {

        getDeparture: function (user) {
            var def = $q.defer();

            $timeout(function () {
                def.resolve({
                    userId: user.id,
                    flightId: 'UA_343223',
                    date: '01/14/2014 8:00 AM'
                });
            }, (Math.random() * 2000));

            return def.promise;
        },

        getFlight: function (flightId) {
            var def = $q.defer();

            $timeout(function () {
                def.resolve({
                    id: flightId,
                    pilot: 'Captain Morgan',
                    plane: {
                        make : 'Boeing 747 RC',
                        model : 'TA-889'
                    },
                    status: 'onTime'
                });
            }, (Math.random() * 2000));

            return def.promise;
        }

    };

})

.service('WeatherService', function ($q, $timeout) {

    return {
        getForecast: function (date) {
            var def = $q.defer();

            $timeout(function () {
                def.resolve({
                    date: date,
                    forecast: 'rain'
                });
            }, (Math.random() * 2000));

            return def.promise;
        }
    };

});
