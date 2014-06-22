(function () {
'use strict';

var app = angular.module('app', []);

app.controller('AppCtrl', function ($scope) {
    $scope.colors = ['red', 'green', 'blue'];

    $scope.add = function (color) {
        $scope.colors.push(color);
        $scope.color = '';
    }
});

app.directive('scopeFalse', function () {
    return {
        // scope: false,
        templateUrl: 'partials/template.html',
        controller: function ($scope) {

        }
    }
});

app.directive('scopeTrue', function () {
    return {
        scope: true,
        templateUrl: 'partials/template.html',
        controller: function ($scope) {

        }
    }
});

app.directive('scopeIsolated', function () {
    return {
        scope: {},
        templateUrl: 'partials/template.html',
        controller: function ($scope) {

        }
    }
});

})();
