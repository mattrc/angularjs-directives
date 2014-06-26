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

			var buttons = element.find('button');

			var setSelected = function (value) {

				buttons.removeClass('btn-primary');

				angular.forEach(buttons, function (button) {
					button = angular.element(button);
					if (button.text() === value) {
						button.addClass('btn-primary');
					}
				});

			};

			ngModel.$render = function () {
				window.log( '_---$render()_' );
				window.log( 'ngModel.$modelValue: [c="color: green"]' + ngModel.$modelValue + '[c]' );
				window.log( 'scope.selected: [c="color: green"]' + scope.selected + '[c]\n' );
				setSelected(ngModel.$viewValue || 'Not sure');
			};

			// Page 466
			// ngModel.$formatters.push(function (value) {
			// 	return value === 'null' ? 'Not sure' : value;
			// });

			element.on('click', function (event) {
				window.log( '_---onClick()_' );
				window.log( 'ngModel.$modelValue: [c="color: magenta"]' + ngModel.$modelValue + '[c]' );
				window.log( 'scope.selected: [c="color: magenta"]' + scope.selected + '[c]\n' );

				setSelected(event.target.innerText);

				scope.$apply(function () {
					window.log('_---$setViewValue()_');
					ngModel.$setViewValue(event.target.innerText);

					// window.log('_scope.selected = value_');
					// scope.selected = event.target.innerText;
				});

				window.log( 'ngModel.$modelValue: [c="color: blue"]' + ngModel.$modelValue + '[c]' );
				window.log( 'scope.selected: [c="color: blue"]' + scope.selected + '[c]\n' );
			});

		},

	};

});
