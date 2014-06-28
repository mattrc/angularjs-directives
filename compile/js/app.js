(function () {
	'use strict';

	var app = angular.module('app', []);

	app.controller('AppController', function ($scope) {

		$scope.friends = buildFriends(1000);

	});

	app.directive('hsFriend', function ($compile) {

		return {
			compile: function (element) {

				// When prepareing the template for the list, we
				// want to extract the "delete confirmation" stuff
				// since it's not going to be used very often.
				var confirm = element.find('.delete').remove();

				// Now that we've extracted the overlay, we need
				// to compile it separeately so that it can be
				// transcluded an linked separately.
				var transcludeConfirm = $compile(confirm);

				// I bind the UI to the scope.
				return function (scope, element) {

					// For this demo, we know that the delete
					// confirmation is triggered when the user
					// goes to click on the delete link. As such,
					// we can inject the delete confirmation overlay
					// when the user "starts" to click.
					element.on('mousedown', 'button', function (ev) {

						// Transclude and link the DOM tree for
						// the delete confirmation.
						transcludeConfirm(scope, function (clone) {
							// Append to element
							element.append(clone);
							// Deregister event
							element.off(ev);
						});

						// Trigger a $digest so all the watchers
						// within the injected DOM tree know to
						// initialize their bindings.
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
