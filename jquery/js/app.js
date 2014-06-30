'use strict';

angular.module('app', [])

// jQuery.timepicker
.directive('timepicker', function () {

	return function (scope, element) {

		// Config Object
		var opts = {
			minTime: '9:00am',
			maxTime: '8:00pm',
			timeFormat: 'H:i'
		};

		// Init plugin
		element.timepicker(opts);

	};

})

// jQuery rangeslider
.directive('rangeslider', function () {

	return {
		link: function (scope, element) {

			// Config Object
			var opts = {
				polyfill: false
			};

			// Init plugin
			element.rangeslider(opts);
		}
	};

})

// jQuery.hideShowPassword
.directive('hideShowPassword', function () {

	return {

		compile: function (tElement) {

			// Create checkbox on the fly
			var checkbox = angular.element('<label><input type="checkbox" ng-model="toggle"> Show password</label>');

			// Insert checkbox
			tElement.after(checkbox);

			// Return the post-link fn
			return function (scope, element) {

				// Watch for changes in $scope.toggle
				scope.$watch('toggle', function (newValue) {

					// Run plugin action
					element.hideShowPassword(newValue);
				});
			};
		}
	};

})

// jQuery taggingJS
.directive('tagging', function ($parse) {

	return {
		replace: true,
		scope: {
			tags: '=ngModel',
			// opts: '@'
		},
		// scope: true, FAILS
		template: '<div class="tag-box"></div>',
		link: function (scope, element, attr) {

			var opts, specialKeys;

			// Parse configuration Object
			opts = attr.opts ? ($parse(attr.opts)(scope)) : {};

			// Init plugin
			element.tagging(opts);

			// Speciel keys that trigger insert or remove
			specialKeys = element.tagging('getSpecialKeys');

			// Listen to Enter key
			element.on('keyup', function (ev) {

				// Check if current key creates a new tag
				if ( _.contains(specialKeys, ev.keyCode)) {

					// Call the $digest cycle
					scope.$apply(function () {

						// Bind tags to the scope
						scope.tags = element.tagging('getTags');
					});
				}
			});
		}
	};

});
