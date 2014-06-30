'use strict';

angular.module('app', [])

.controller('AppCtrl', function ($scope) {
    $scope.person = {
        name: 'John'
    };
})

.directive('oneWayBinding', function () {
    return {
        scope: {
            name: '@personName'
        },
        templateUrl: 'partials/template.html'
    };
})

.directive('twoWayBinding', function () {
    return {
        scope: {
            name: '=personName'
        },
        templateUrl: 'partials/template.html'
    };
});
