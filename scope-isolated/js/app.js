'use strict';

angular.module('app', [])

.controller('AppController', function ($scope) {

    $scope.day = 'Lunes';
    $scope.month = 'Noviembre';

    $scope.updateDay = function (day) {
        $scope.day = day;
    };
})

.directive('hsDirective', function () {
    return {
        restrict: 'E',
        scope: {
            day: '@',
            month: '=',
            update: '&',
        },
        templateUrl: 'partials/template.html'
    };
});
