(function () {
'use strict';

angular.module('app', [])

.directive('parent', function () {

	return {
		restrict: 'E',
		template: '<child></child>',

		link: {
			pre: function (scope, element, attr) {
				console.log( '--- preLink' );
				console.log( element.find('pre').length );
				element.find('pre').html('replaced in preLink function')
			},
			post: function (scope, element, attr) {
				console.log( '--- postLink' );
				console.log( element.find('pre').length );
				element.find('pre').html('replaced in postLink function')
			}
		}
	}

})

.directive('child', function () {

	return {
		restrict: 'E',
		template: '<h3>Child title</h3>',
		link: function (scope, element, attr) {
			element.replaceWith('<pre>' + element.text() + '</pre>');
		}
	}

})

})();
