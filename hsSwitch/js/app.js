(function () {
'use strict';

var app = angular.module('app', []);

/**
 * Directive: hs-switch
 */
app.directive('hsSwitch', function () {
    return {
        controller: function () {
            // Linker functions object
            this.cases = {};
        },
        link: function (scope, el, attrs, ctrl) {

            var caseElement,
                caseScope;

            // Watch for changes in "rgbColor"
            scope.$watch(attrs.hsSwitch, function (nv) {

                // Linker function
                var caseLinker = ctrl.cases['!' + nv] || ctrl.cases['?'];

                // If found previos element
                if (caseElement) {
                    // Destroy scope
                    caseScope.$destroy();
                    // Remove element
                    caseElement.remove();
                    // Clear vars
                    caseElement = caseScope = null;
                }

                // If the linker function exists
                if (caseLinker) {
                    // Create new scope
                    caseScope = scope.$new();
                    // Bind scope to linked element
                    caseLinker(caseScope, function (element) {
                        // Store linked element reference
                        caseElement = element;
                        // Append linked element
                        el.append(caseElement);
                    });
                }

            });
        }
    };
});


/**
 * Directive: hs-switch-when
 */
app.directive('hsSwitchWhen', function () {
    return {
        transclude: 'element',
        require: '^hsSwitch',
        link: function (scope, el, attrs, hsSwitchCtrl, linker) {
            hsSwitchCtrl.cases['!' + attrs.hsSwitchWhen] = linker;
        }
    };
});


/**
 * Directive: hs-switch-default
 */
app.directive('hsSwitchDefault', function () {
    return {
        transclude: 'element',
        require: '^hsSwitch',
        link: function (scope, el, attrs, hsSwitchCtrl, linker) {
            hsSwitchCtrl.cases['?'] = linker;
        }
    };
});

})();
