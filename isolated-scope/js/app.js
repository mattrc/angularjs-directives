(function () {
'use strict';

angular.module('app', []);

.controller('AppCtrl', function ($scope) {
    $scope.title = 'Hello World';
    $scope.colors = ['red', 'green', 'blue'];
    $scope.person = {age: 25, name: 'jack'};

    $scope.updateTitle = function (title) {
        $scope.title = title;
        $scope.newTitle = '';
    }

    $scope.addColor = function (color) {
        $scope.colors.push(color);
        $scope.newColor = '';
    }

    $scope.addPerson = function (key, val) {
        $scope.person[key] = val;
        $scope.key = '';
        $scope.val = '';
    }

});

.directive('oneWayBinding', function () {
    return {
        scope: {
            title: '@',
            subtitle: '@',
            colors: '@',
            person: '@',
            // subtitle: '@foo'
        },
        templateUrl: 'partials/one-way-binding.html'
    }
});

.directive('twoWayBinding', function () {
    return {
        scope: {
            title: '=',
            colors: '=',
            person: '='
        },
        templateUrl: 'partials/two-way-binding.html',
        controller: function ($scope) {

            $scope.updateTitle = function (title) {
                $scope.title = title;
                $scope.newTitle = '';
            }

            $scope.addColor = function (color) {
                $scope.colors.push(color);
                $scope.newColor = '';
            }

            $scope.addPerson = function (key, val) {
                $scope.person[key] = val;
                $scope.key = '';
                $scope.val = '';
            }

        }
    }
});

})();
