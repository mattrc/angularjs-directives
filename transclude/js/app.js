(function () {
'use strict';

angular.module('app', [])

.controller('AppController', function ($scope) {
    $scope.numbers = [5, 7, 9, 6];
    $scope.parent = {
        foo: ''
    };
})

.directive('hsDirective', function () {
    return {
        scope: {},
        transclude: true,
        templateUrl: 'partials/template.html',
        controller: function ($scope) {
            $scope.letters = ['O', 'N', 'H', 'S'];
        }
    };
});




})();
