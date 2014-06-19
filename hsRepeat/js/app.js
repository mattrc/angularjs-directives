(function () {
'use strict';

var app = angular.module('app', []);

app.controller('AppCtrl', function ($scope) {
    $scope.persons = ['Ana', 'Laura', 'Javier', 'Marcela', 'Federico'];

    $scope.add = function ()  {
        $scope.persons.push($scope.newPerson);
        $scope.newPerson = '';
    };
});

app.directive('hsRepeat', function () {
    return {
        transclude: 'element',
        priority: 1000,
        terminal: true,
        link: function ($scope, $element, $attr, ctrl, $transclude)  {

            // Repeat expression
            var expression = $attr.hsRepeat;

            // Split with regex
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)?\s*$/);

            // Key
            var key = match[1];
            var values = match[2];

            // Array of inserted clones
            var clones = [];

            $scope.$watchCollection(values, function (collection) {

                // Clear inserted clones
                clearClones(clones);

                // Iterate over all items in collection
                for (var i = 0; i < collection.length; i += 1) {

                    // Create new scope
                    var childScope = $scope.$new();
                    // Assign current item to the scope
                    childScope[key] = collection[i];

                    // Transclude element
                    $transclude(childScope, function (clone) {
                        // Save reference (for deletion)
                        clones.push(clone);
                        // insert clone manually
                        $element.after(clone);
                    });
                }

            });
        }
    };

    function clearClones(clones) {
        angular.forEach(clones, function (el) {
            el.remove();
        });
    }
});

})();
