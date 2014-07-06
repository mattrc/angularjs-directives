(function () {
	'use strict';

	var app = angular.module('app', []);

	app.controller('AppController', function ($scope) {
		$scope.friends = buildFriends(1000);
	});

	app.directive('hsFriend', function ($compile) {

		return {
			templateUrl: 'partials/template.html',
			compile: function (element) {

				// Extract the .confirm element
				var confirm = element.find('.confirm').remove();

				// Compile it separeately for cloning later
				var linker = $compile(confirm);

				// Link function
				return function (scope, element) {

					// insert the confirm element when the user clicks, just one time.
					element.one('mousedown', 'button', function () {

						// Link & clone
						linker(scope, function (clone) {
							// Append to element
							element.append(clone);
						});

						// Trigger a $digest
						scope.$apply();

					});

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
