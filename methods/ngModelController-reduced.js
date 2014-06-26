var NgModelController = function($scope, $exceptionHandler, $attr, $element, $parse, $animate) {

	this.$viewValue = Number.NaN;
	this.$modelValue = Number.NaN;
	this.$parsers = [];
	this.$formatters = [];
	this.$viewChangeListeners = [];
	this.$pristine = true;
	this.$dirty = false;
	this.$valid = true;
	this.$invalid = false;
	this.$name = $attr.name;

	var ngModelGet = $parse($attr.ngModel), // Getter
		ngModelSet = ngModelGet.assign; // Setter

	this.$render = noop;

	this.$setViewValue = function(value) {
		this.$viewValue = value;

		forEach(this.$parsers, function(fn) {
			value = fn(value);
		});

		if (this.$modelValue !== value) {
			this.$modelValue = value;
			ngModelSet($scope, value);
			forEach(this.$viewChangeListeners, function(listener) {
				try {
					listener();
				} catch(e) {
					$exceptionHandler(e);
				}
			});
		}
	};

	// model -> value
	var ctrl = this;

	$scope.$watch(function ngModelWatch() {
		var value = ngModelGet($scope);

		// if scope model value and ngModel value are out of sync
		if (ctrl.$modelValue !== value) {

			var formatters = ctrl.$formatters,
			idx = formatters.length;

			ctrl.$modelValue = value;
			while(idx--) {
				value = formatters[idx](value);
			}

			if (ctrl.$viewValue !== value) {
				ctrl.$viewValue = value;
				ctrl.$render();
			}
		}

		return value;
	});
};
