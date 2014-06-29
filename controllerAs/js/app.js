'use strict';

angular.module('app', [])

.controller('AppController', function ($scope) {
	$scope.foo = 'bar';
})

.directive('hsDirective', function () {

	return {
		templateUrl: 'partials/template.html',
		scope: true,
		controllerAs: 'ctrl',
		controller: function ($scope) {

			this.foo = 'bar'; // ctrl.foo == 'bar'

			// Special watcher
			$scope.$watch(angular.bind(this, function () {
				return this.foo;
			}), function (newValue) {
				console.log( newValue );
			});

		}
	};

});
