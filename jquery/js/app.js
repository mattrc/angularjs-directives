(function () {
'use strict';

angular.module('app', [])

// jQuery.timepicker
.directive('timepicker', function () {

	return function (scope, element) {

		element.timepicker({
			minTime: '9:00am',
			maxTime: '8:00pm',
			timeFormat: 'H:i'
		});

	}

})

// jQuery rangeslider
.directive('rangeslider', function () {

	return {
		link: function (scope, element, attr) {
			element.rangeslider({
				polyfill: false
			});
		}
	}

})

// jQuery.hideShowPassword
.directive('hideShowPassword', function () {

	return {

		compile: function (tElement, tAttr) {

			// Create checkbox on the fly
			var checkbox = angular.element('<label><input type="checkbox" ng-model="toggle">Show password</label>');

			// Insert checkbox
			tElement.after(checkbox);

			// Return the post-link fn
			return function (scope, element, attr) {

				// Watch for changes in $scope.toggle
				scope.$watch('toggle', function (newValue) {

					// Run plugin action
					element.hideShowPassword(newValue);
				});
			}
		}
	}

})

})();
