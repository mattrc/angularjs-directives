'use strict';

angular.module('app', [])

.controller('AppController', function ($scope) {

	$scope.selectOptions = [
		'Yes',
		'No',
		'Not sure',
		'null'
	];

})

.directive('myDirective', function () {

	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		// priority: 1,
		templateUrl: 'partials/template.html',
		link: function (scope, element, attr, ngModel) {

			var buttons = element.find('.btn');

			var setSelected = function (value) {

				buttons.removeClass('btn-primary');

				angular.forEach(buttons, function (button) {
					button = angular.element(button);
					if (button.text().toLowerCase() === value.toLowerCase()) {
						button.addClass('btn-primary');
					}
				});

			};

			ngModel.$render = function () {
				setSelected(ngModel.$viewValue || 'Not sure');
			};

			ngModel.$formatters.push(function (value) {
				if (typeof value === 'string') {
					return value.toUpperCase();
				} else {
					return value;
				}
			});

			buttons.on('click', function (event) {

				scope.$apply(function () {
					ngModel.$setViewValue(event.target.innerText);
				});

				setSelected(ngModel.$viewValue);

			});

		},

	};

});
