(function () {
'use strict';

angular.module('app', [])

.config(function ($httpProvider) {

	$httpProvider.interceptors.push('myInterceptor');

})

.factory('User', function () {

	var user = {
		// id: 125
	};

	return {
		get: function () {
			return user;
		}
	};

})

.factory('myInterceptor', function ($q, User) {

	return {
		request: function (config) {

			var def = $q.defer(),
				user = User.get();

			if (user.id) {
				def.resolve(config);
			} else {
				def.reject(config);
			}

			return def.promise;
		}
	};

})

.controller('AppController', function ($scope, $http, User) {

	$scope.user = User.get();

	$http.get('server.php').then(
		function (response) {
			$scope.response = response;
		}, function () {
			$scope.response = 'Login please...';
		});

});

})();

