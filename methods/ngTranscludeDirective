'use strict';

var ngTranscludeDirective = ngDirective({
	link: function(scope, element, attrs, controller, transclude) {
		transclude(function(clone) {
			element.empty();
			element.append(clone);
		});
	}
});
