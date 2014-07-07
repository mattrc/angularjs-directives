(function () {
'use strict';

angular.module('app', [])

.controller('AppController', function () {})

.directive('hsDirective', function () {
    return {
        scope: {},
        transclude: true,
        templateUrl: 'partials/template.html'
    };
});




})();
