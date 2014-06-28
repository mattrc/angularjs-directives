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
				window.log( '_---$render()_' );
				window.log( 'ngModel.$modelValue: [c="color: MediumSeaGreen"]' + ngModel.$modelValue + '[c]' );
				window.log( 'ngModel.$viewValue: [c="color: MediumSeaGreen"]' + ngModel.$viewValue + '[c]' );
				window.log( 'scope.selected: [c="color: MediumSeaGreen"]' + scope.selected + '[c]\n' );
				setSelected(ngModel.$viewValue || 'Not sure');
			};

			ngModel.$formatters.push(function (value) {
				window.log( '_---$formatters(' + value + ')_' );
				if (typeof value === 'string') {
					window.log( 'returns: [c="color: DarkOrchid"]' + value.toUpperCase() + '[c]\n' );
					return value.toUpperCase();
				} else {
					window.log( 'returns: [c="color: DarkOrchid"]' + value + '[c]\n' );
					return value;
				}
			});

			buttons.on('click', function (event) {
				window.log( '_---onClick()_' );
				window.log( 'ngModel.$modelValue: [c="color: OrangeRed"]' + ngModel.$modelValue + '[c]' );
				window.log( 'ngModel.$viewValue: [c="color: OrangeRed"]' + ngModel.$viewValue + '[c]' );
				window.log( 'scope.selected: [c="color: OrangeRed"]' + scope.selected + '[c]\n' );



				scope.$apply(function () {
					window.log('_---$setViewValue()_');
					ngModel.$setViewValue(event.target.innerText);

					// window.log('_scope.selected = value_');
					// scope.selected = event.target.innerText;
				});

				setSelected(ngModel.$viewValue);

				window.log( 'ngModel.$modelValue: [c="color: DodgerBlue"]' + ngModel.$modelValue + '[c]' );
				window.log( 'ngModel.$viewValue: [c="color: DodgerBlue"]' + ngModel.$viewValue + '[c]' );
				window.log( 'scope.selected: [c="color: DodgerBlue"]' + scope.selected + '[c]\n' );
			});

		},

	};

});
