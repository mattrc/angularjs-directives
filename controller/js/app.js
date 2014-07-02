(function () {
	'use strict';

	angular.module('app', [])

	// Controller: AppController
	.controller('AppController', function ($scope) {
		$scope.messages = generateMessages(20);
	})

	// Directive: hsInbox
	.directive('hsInbox', function () {
		return {
			scope: {
				messages: '=hsInbox'
			},
			templateUrl: 'partials/inbox.html',
			controller: function ($scope) {

				// Delete message
				this.remove = function (index) {
					$scope.messages.splice(index, 1);
				};

				// Add new message
				this.add = function (newMessage) {
					$scope.messages.unshift({
						id: $scope.messages.length,
						to: newMessage.to,
						body: newMessage.body
					});
				};

			}
		};
	})

	// Directive: hsMessage
	.directive('hsMessage', function () {
		return {
			scope: true,
			require: '^hsInbox',
			templateUrl: 'partials/message.html',
			link: function (scope, element, attrs, hsInbox) {
				scope.remove = function (index) {
					hsInbox.remove(index);
				};
			}
		};
	})

	// Directive: hsCompose
	.directive('hsCompose', function () {
		return {
			scope: true,
			require: '^hsInbox',
			templateUrl: 'partials/compose.html',
			link: function (scope, element, attrs, hsInbox) {
				scope.add = function (newMessage) {
					hsInbox.add(newMessage);
				};
			}
		};
	});











	// Helper function to build a collection of messages
	function generateMessages(count) {

		var messages = [];

		for ( var i = 0 ; i < count ; i += 1 ) {

			messages.unshift({
				id: i,
				to: window.chance.name(),
				body: window.chance.paragraph()
			});

		}

		return(messages);

	}

})();

