(function () {
'use strict';

var app = angular.module('app', []);

/**
 * Directive: mc-switch
 */
app.directive('mcSwitch', function () {
    return {
        controller: function () {
            // Linker functions object
            this.cases = {};
        },
        link: function (scope, el, attrs, ctrl) {

            var caseElement,
                caseScope;

            // Watch for changes in "rgbColor"
            scope.$watch(attrs.mcSwitch, function (nv) {

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
 * Directive: mc-switch-when
 */
app.directive('mcSwitchWhen', function () {
    return {
        transclude: 'element',
        require: '^mcSwitch',
        link: function (scope, el, attrs, mcSwitchCtrl, linker) {
            mcSwitchCtrl.cases['!' + attrs.mcSwitchWhen] = linker;
        }
    };
});


/**
 * Directive: mc-switch-default
 */
app.directive('mcSwitchDefault', function () {
    return {
        transclude: 'element',
        require: '^mcSwitch',
        link: function (scope, el, attrs, mcSwitchCtrl, linker) {
            mcSwitchCtrl.cases['?'] = linker;
        }
    };
});

})();
