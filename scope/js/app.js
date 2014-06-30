'use strict';

angular.module('app', [])

.controller('AppCtrl', function ($scope) {
    $scope.person = {
        name: 'Peter'
    };

    $scope.country = 'Argentina';
})

.directive('scopeFalse', function () {
    return {
        // scope: false,
        templateUrl: 'partials/template.html'
    };
})

.directive('scopeTrue', function () {
    return {
        scope: true,
        templateUrl: 'partials/template.html'
    };
});
