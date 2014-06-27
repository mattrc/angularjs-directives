(function () {
	'use strict';

	var app = angular.module('app', []);

	app.controller('AppController', function ($scope) {

		$scope.friends = buildFriends(1000);

	});

	app.directive('hsFriend', function ($compile) {

		return {
			compile: function (element) {
				var confirm = element.find('.delete').remove();

				var transcludeConfirm = $compile(confirm);

				return function (scope, element) {

					element.on('mousedown', 'button', function (ev) {

						// Transclude confirm element
						transcludeConfirm(scope, function (clone) {
							// Append to element
							element.append(clone);
							// Deregister event
							element.off(ev);
						});

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
