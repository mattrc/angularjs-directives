'use strict';

angular.module('app', [])

.controller('AppCtrl', function ($scope) {

    // Objects (Array, Object)
    $scope.person = {
        name: 'Peter'
    };

    // Primitives (String, Number, Boolean, null, undefined)
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
