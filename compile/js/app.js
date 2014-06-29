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
			compile: function (element, attr, transclude) {

				// Extract the delete confirmation element
				var confirm = element.find('.delete').remove();

				// We need to compile it separeately so that it can be
				// transcluded an linked separately.
				var transcludeConfirm = $compile(confirm);

				// Link function
				return function (scope, element, attr) {

					// Inject the delete confirmation when the user "starts" to click.
					element.on('mousedown', 'button', function (ev) {

						// Transclude and link the DOM tree for the delete confirmation.
						transcludeConfirm(scope, function (clone) {
							// Append to element
							element.append(clone);
							// Deregister event
							element.off(ev);
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

		var names = [ "Jack", "Peter", "Sam", "Danny" ];
		var friends = [];

		for ( var i = 0 ; i < count ; i += 1 ) {

			friends.push({
				id: i,
				name: names[ i % 4 ],
				isShowingConfirmation: false
			});

		}

		return( friends );

	}

})();