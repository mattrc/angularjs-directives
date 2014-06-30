'use strict';

angular.module('app', [])

.controller('AppCtrl', function ($scope) {
    $scope.colors = ['red', 'green', 'blue'];

    $scope.add = function (color) {
        $scope.colors.push(color);
        $scope.color = ''; // Doesn't wor on isolated scope
    };
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
})

.directive('scopeIsolated', function () {
    return {
        scope: {
            colors: '=',
            add: '&'
        },
        templateUrl: 'partials/template2.html'
    };
});
