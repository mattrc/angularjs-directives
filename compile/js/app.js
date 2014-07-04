(function () {
	'use strict';

	var app = angular.module('app', []);

	// Controller: AppController
	app.controller('AppController', function ($scope) {
		$scope.friends = buildFriends(1000);
	});

	// Directive: hsFriend
	app.directive('hsFriend', function ($compile) {

		return {
			restrict: 'EA',
			templateUrl: 'partials/template.html',
			compile: function (element) {

				// Extract the delete confirmation element
				var confirm = element.find('.delete').remove();

				// We need to compile it separeately so that it can be
				// transcluded an linked separately.
				var transcludeConfirm = $compile(confirm);

				// Link function
				return function (scope, element) {

					// Inject the delete confirmation when the user clicks, just one time.
					element.one('mousedown', 'button', function () {

						// Transclude and link the DOM tree for the delete confirmation.
						transcludeConfirm(scope, function (clone) {
							// Append to element
							element.append(clone);
						});

						// Trigger a $digest
						scope.$apply();

					});

					scope.showConfirmation = function () {
						scope.friend.deleting = true;
					};

					scope.hideConfirmation = function () {
						scope.friend.deleting = false;
					};

				};
			}
		};

	});












	// Helper function to build a collection of friends
	function buildFriends (count) {

		var friends = [];

		for ( var i = 0 ; i < count ; i += 1 ) {

			friends.push({
				id: i,
				name: window.chance.first()
			});

		}

		return( friends );

	}

})();
