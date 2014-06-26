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

	if (!ngModelSet) {
		throw minErr('ngModel')('nonassign', "Expression '{0}' is non-assignable. Element: {1}",
			$attr.ngModel, startingTag($element));
	}

	this.$render = noop;

	this.$isEmpty = function(value) {
		return isUndefined(value) || value === '' || value === null || value !== value;
	};

	var parentForm = $element.inheritedData('$formController') || nullFormCtrl,
		invalidCount = 0, // used to easily determine if we are valid
		$error = this.$error = {}; // keep invalid keys here


	// Setup initial state of the control
	$element.addClass(PRISTINE_CLASS);
	toggleValidCss(true);

	// convenience method for easy toggling of classes
	function toggleValidCss(isValid, validationErrorKey) {
		validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
		$animate.removeClass($element, (isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey);
		$animate.addClass($element, (isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
	}

	this.$setValidity = function(validationErrorKey, isValid) {
		// Purposeful use of ! here to cast isValid to boolean in case it is undefined
		// jshint -W018
		if ($error[validationErrorKey] === !isValid) return;
		// jshint +W018

		if (isValid) {
			if ($error[validationErrorKey]) invalidCount--;
			if (!invalidCount) {
				toggleValidCss(true);
				this.$valid = true;
				this.$invalid = false;
			}
		} else {
			toggleValidCss(false);
			this.$invalid = true;
			this.$valid = false;
			invalidCount++;
		}

		$error[validationErrorKey] = !isValid;
		toggleValidCss(isValid, validationErrorKey);

		parentForm.$setValidity(validationErrorKey, isValid, this);
	};

	this.$setPristine = function () {
		this.$dirty = false;
		this.$pristine = true;
		$animate.removeClass($element, DIRTY_CLASS);
		$animate.addClass($element, PRISTINE_CLASS);
	};

	this.$setViewValue = function(value) {
		this.$viewValue = value;

		// change to dirty
		if (this.$pristine) {
			this.$dirty = true;
			this.$pristine = false;
			$animate.removeClass($element, PRISTINE_CLASS);
			$animate.addClass($element, DIRTY_CLASS);
			parentForm.$setDirty();
		}

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
