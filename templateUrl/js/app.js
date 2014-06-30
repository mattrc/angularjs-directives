(function () {
'use strict';

angular.module('app', [])

.directive('hsDirective', function () {
	return {
		restrict: 'E',
		templateUrl: function (element, attr) {
			var tpl = attr.hsTpl || 'paragraph';
			return 'partials/' + tpl + '.html';
		}
	};
});

})();

