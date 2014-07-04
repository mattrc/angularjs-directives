/**
 * $interpolate
 * https://code.angularjs.org/1.2.18/docs/api/ng/service/$interpolate
 *
 */
(function () {
'use strict';

angular.module('app', [])

// Interpolate
.controller('AppController', function ($scope, $interpolate, $compile, $element) {

	$scope.friends = buildFriends(5);

	var expression = 'Name: {{ name }}, Age: {{ age }}';
	// var expression = 'function () { console.log( window ) }()';
	var interpolateFn = $interpolate(expression);

	if (typeof interpolateFn === 'function') {
		console.log( interpolateFn($scope.friends[0]) );
	}

	console.log( '\n-----------------------\n' );

	// For expression binding
	$scope.log = function (foo) {
		console.log( foo );
	};

	////////////////////////////////////////////////////////////

	// var html = '<section id="info_faq"><h3>FAQ</h3><h4>May I use your data in my presentation/article/site, etc?</h4> <p> Yes, the support data on this site is free to use under the <a href="http://creativecommons.org/licenses/by-nc/3.0/">CC BY-NC 3.0</a> license. </p> <h4>Do you have the data available in a raw format?</h4> <p> Yes, the raw support data is available on <a href="https://github.com/fyrd/caniuse">GitHub</a> and is updated regularly. </p> <h4>Could you add <i>feature X</i> to the site?</h4> <p> Adding features takes quite some time and there are many requests for additions. Because of this I use <a href="http://www.google.com/moderator/#15/e=ae425&amp;t=ae425.40">Google Moderator</a> to manage requests. Feel free to add/vote for your feature there. </p> <h4>Which features do you choose to add to this list?</h4> <p> I use the following criteria: </p> <ol> <li>Useful to web designers/developers</li> <li>Likely to be eventually implemented by the majority of browsers </li> <li>Currently lacking at least one implementation</li> </ol> <p> Most features are added in priority order from <a href="http://www.google.com/moderator/#15/e=ae425&amp;t=ae425.40">this list</a>. </p> <h4>How do you test support?</h4> <p>I use a hand-crafted test suite to test features, which tests for basic support of each feature. </p> <p>The test suite is publically available at <a href="http://tests.caniuse.com">tests.caniuse.com</a>.</p> <h4>Where do you get your information for upcoming versions?</h4> <p>Most information comes directly from the latest developer/preview/nightly builds as seen in this list:</p> <ul> <li><b>Internet Explorer information</b> is based on any news that comes in (pending public builds for IE10).</li> <li>Future <a href="http://ftp.mozilla.org/pub/firefox/nightly/latest-trunk/">Firefox</a> information is based on features planned for the latest Gecko build.</li> <li>Future <a href="http://nightly.webkit.org/">Safari</a> information is based on the latest Webkit nightly builds.</li> <li><a href="http://dev.chromium.org/getting-involved/dev-channel">Chrome</a> information is based on the latest developer preview.</li> <li>Future <a href="http://my.opera.com/desktopteam/blog/">Opera</a> information is based on any experimental or weekly builds</li> </ul> <h4>When is a feature considered "supported"?</h4> <p>When its primary purpose is largely fulfilled. It does not mean its 100% supported, just that it\'s usable in most cases.</p> <h4>How often is this page updated?</h4> <p>I try to keep it as current as possible, with new information being usually being processed within a few days. Follow the <a href="feed.php">feed</a> if you\'d like keep up with all the changes made.</p></section>';

	$scope.foo = 'BAR';

	var html = '<ul><li ng-repeat="friend in friends"><strong>{{ friend.name }}</strong> - {{ friend.age }} años.</li></ul>';

	// Parsea un string de HTML a DOM
	var template = angular.element(html);

	// Compile el template
	var linkFn = $compile(template);

	// Enlazar el template compilado con un nuevo scope
	var element = linkFn($scope.$new());

	// Insertar elemento en el DOM
	$element.append(element);

	// El elemento enlazado esta vivo
	$scope.friends.push({name: 'Peter Griffin', age: 39});

	console.log( html );
	console.log( template );
	console.log( linkFn );
	console.log( element );

	console.log( '\n-----------------------\n' );


})

// Transclude
.directive('alert', function () {
	return {
		restrict: 'AE',
		scope: {
			fn: '&' // Expression binding
		},
		transclude: true,
		// template: '<div ng-transclude></div>',
		compile: function (element, attrs) {

			var alertType = attrs.alertType || 'info';

			element.addClass('d-block alert alert-' + alertType);

			return function (scope, element, attrs, ctrl, transclude) {

				transclude(function (clone) {
					element.empty();
					element.append(clone);
				});

				scope.fn({something: scope});
				scope.fn({something: element});
				scope.fn({something: attrs});
				scope.fn({something: ctrl});
			};
		}
	};
});





// Helper function to build a collection of friends
function buildFriends (count) {

	var friends = [];

	for ( var i = 0 ; i < count ; i += 1 ) {

		friends.push({
			name: window.chance.first(),
			age: window.chance.age()
		});

	}

	return( friends );

}

})();

