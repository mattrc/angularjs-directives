'use strict';

angular.module('app', [])

.controller('AppController', function ($scope) {

	$scope.colors = ['Red', 'Green', 'Blue'];

	$scope.add = function (color)  {
		$scope.colors.push(color);
		$scope.newColor = '';
	};
})

.directive('hsRepeat', function () {

	return {
		transclude: 'element',
		link: function (scope, element, attrs, ctrl, transclude) {

			// Parent element
			var parent = element.parent();

			// hsRepeat expression
			var expression = attrs.hsRepeat;

			// Split with regex
			var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)?\s*$/);

			// Matches
			var prop = match[1]; // color
			var collection = match[2]; // colors

			// Watch collection (colors)
			scope.$watchCollection(collection, function (items) {

				// Clear inserted clones
				parent.children().remove();

				// Iterate over all items in collection
				angular.forEach(items, function (item) {

					// Create new scope
					var childScope = scope.$new();

					// Assign current item to the scope
					childScope[prop] = item;

					// Clone transcluded element
					transclude(childScope, function (clone) {

						// insert clone
						element.before(clone);
					});
				});
			});
		}
	};
});
