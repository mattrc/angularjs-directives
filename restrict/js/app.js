(function () {
'use strict';

angular.module('app', [])

.directive('hsDirectiveAttribute', function () {
	return {
		// restrict: 'A',
		template: '<h3>ATTR</h3>'
	}
})

.directive('hsDirectiveElement', function () {
	return {
		restrict: 'E',
		template: '<h3>ELEMENT</h3>'
	}
})

.directive('hsDirectiveClass', function () {
	return {
		restrict: 'C',
		template: '<h3>CLASS</h3>'
	}
})

.directive('hsDirectiveComment', function () {
	return {
		restrict: 'M',
		compile: function (element, attr) {
			element.after('<h3>COMMENT</h3>');
		}
	}
})

})();

