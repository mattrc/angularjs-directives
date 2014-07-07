'use strict';

angular.module('app', [])

.directive('hsSwitch', function () {
    return {
        controller: function () {
            // Transclude functions object
            this.cases = {};
        },
        link: function (scope, element, attrs, ctrl) {

            var caseElement,
                caseScope;

            // Watch for changes in "rgbColor"
            scope.$watch(attrs.hsSwitch, function (newValue) {

                // Transclude function
                var caseTransclude = ctrl.cases[newValue] || ctrl.cases['default'];

                // If found previos element
                if (caseElement) {
                    // Destroy scope
                    caseScope.$destroy();
                    // Remove element
                    caseElement.remove();
                    // Clear vars
                    caseElement = caseScope = null;
                }

                // If the transclude function exists
                if (caseTransclude) {
                    // Create new scope
                    caseScope = scope.$new();
                    // Bind scope to linked element
                    caseTransclude(caseScope, function (clone) {
                        // Store linked element reference
                        caseElement = clone;
                        // Append linked element
                        element.append(caseElement);
                    });
                }

            });
        }
    };
})

.directive('hsSwitchWhen', function () {
    return {
        transclude: 'element',
        require: '^hsSwitch',
        link: function (scope, element, attrs, hsSwitchCtrl, transclude) {
            hsSwitchCtrl.cases[attrs.hsSwitchWhen] = transclude;
        }
    };
})

.directive('hsSwitchDefault', function () {
    return {
        transclude: 'element',
        require: '^hsSwitch',
        link: function (scope, element, attrs, hsSwitchCtrl, transclude) {
            hsSwitchCtrl.cases['default'] = transclude;
        }
    };
});
