'use strict';

angular.module('app', [])

.directive('logCompile', function ($rootScope) {

	$rootScope.log = '';

	return {
		controller: function ($scope, $attrs) {
			$rootScope.log = $rootScope.log + ($attrs.logCompile + ' (controller)\n');
		},
		compile: function (tElement, tAttrs) {
			$rootScope.log = $rootScope.log + (tAttrs.logCompile + ' (compile)\n');

			// Prepend content
			tElement.prepend(tAttrs.logCompile);

			return {
				pre: function ($scope, $element, $attrs) {
					$rootScope.log = $rootScope.log + ($attrs.logCompile + ' (pre-link)\n');
				},
				post: function ($scope, $element, $attrs) {
					$rootScope.log = $rootScope.log + ($attrs.logCompile + ' (post-link)\n');
				}
			};
		}
	};

});
