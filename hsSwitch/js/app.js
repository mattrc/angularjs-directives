'use strict';

angular.module('app', [])

.directive('hsSwitch', function () {
    return {
        controller: function () {
            // Transclude functions object
            this.cases = {};
        },
        link: function (scope, element, attrs, ctrl) {

            // Watch for changes in "rgbColor"
            scope.$watch(attrs.hsSwitch, function (newValue) {

                // Transclude function
                var transcludeCase = ctrl.cases[newValue] || ctrl.cases['default'];

                // If the transclude function exists
                if (transcludeCase) {

                    // Empty element
                    element.empty();

                    // Bind scope to linked element
                    transcludeCase(scope.$new(), function (clone) {
                        // Append linked element
                        element.append(clone);
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
