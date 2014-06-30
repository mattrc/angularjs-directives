'use strict';

angular.module('app', [])

.directive('hsDirective', function () {

	return {
		scope: true,
		templateUrl: 'partials/template.html',
		controllerAs: 'alias',
		controller: function ($scope) {

			this.foo = 'bar'; // alias.foo == 'bar'

			// Special watcher
			$scope.$watch(angular.bind(this, function () {
				return this.foo;
			}), function (newValue) {
				console.log( newValue );
			});

		}
	};

});
