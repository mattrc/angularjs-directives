(function () {
'use strict';

angular.module('app', [])

.controller('AppController', function ($scope, $timeout) {

	// $timeout(function () {

		$scope.person = {
			name: 'Matias'
		};

	// }, 500);

})

.directive('hsDirective', function ($parse, $interpolate) {
	return {
		controller: function ($scope, $attrs) {
			// console.log( $scope.person );
			console.log( $attrs.hsDirective );
			console.log( $parse('person.name')($scope) );
			console.log( $interpolate($attrs.hsDirective)($scope) );
			console.log( '-----------------------' );
		},
		link: {
			pre: function (scope, element, attrs) {
				// console.log( scope.person );
				console.log( attrs.hsDirective );
				console.log( '-----------------------' );
			},
			post: function (scope, element, attrs) {
				// console.log( scope.person );
				console.log( attrs.hsDirective );
				console.log( '-----------------------' );
			}
		}
	};
});

})();

