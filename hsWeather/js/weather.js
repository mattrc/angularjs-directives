
(function () {
'use strict';

/**
 * Module: hsWeather
 */
angular.module('hsWeather', [])

/**
 * Service: Weather
 * http://openweathermap.org/
 */
.factory('Weather', function ($http, $q) {

	// API url
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&cnt=17&callback=JSON_CALLBACK&q=",
		queue = [];

	var execNext = function () {

		var task = queue[0];

		$http(task.c).then(function (data) {
			queue.shift();
			task.d.resolve(data);
			if (queue.length > 0) {
				execNext();
			}
		}, function (error) {
			queue.shift();
			task.d.reject(error);
			if (queue.length > 0) {
				execNext();
			}
		});
	}

	// Service API
	return {
		getForecast: function (city) {

			var d = $q.defer();

			queue.push({
				c: {
					method: 'JSONP',
					url: url + city,
				},
				d: d
			});

			if (queue.length === 1) {
				execNext();
			}

			return d.promise;
		}
	};

})

/**
 * Service: D3 Chart
 * http://d3js.org/
 */
.factory('D3Chart', function () {

	var graph = function(element, data, opts) {

		var width = opts.width || 200,
		    height = opts.height || 80,
		    padding = opts.padding || 30;

		// chart
		var svg = d3.select(element[0])
			.append('svg:svg')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'hs-weather-chart')
			.append('g')
			.attr('transform', 'translate(' + padding + ', ' + padding + ')');

		svg.selectAll('*').remove();

		var maxY = d3.max(data);

		var x = d3.scale.linear()
			.domain([0, data.length])
			.range([0, width]);

		var y = d3.scale.linear()
			.domain([0, maxY])
			.range([height, 0]);

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left')
			.ticks(5);

		svg.append('g')
			.attr('class', 'axis')
			.call(yAxis);

		var line = d3.svg.line()
			.interpolate('linear')
			.x(function(d,i){return x(i);})
			.y(function(d,i){return y(d);});

		var path = svg.append('svg:path')
			.data([data])
			.attr('d', line)
			.attr('fill', 'none')
			.attr('stroke-width', '4')
			.attr('stroke', '#ec4689');
	}

	// Service API
	return {
		graph: graph
	};

})

/**
 * Directive: hsWeather
 */
.directive('hsWeather', function (D3Chart, $parse) {

	return {
		restrict: 'EA',
		replace: true,
		scope: {
			city: '@hsCity'
		},
		template: '<div class="hs-weather">' +
				  	'<h3 ng-show="data.city">Weather for {{ data.city.name }} - {{ data.city.country }}</h3>' +
				  	'<div class="chart"></div>' +
				  '</div>',
		controller: function ($scope, Weather) {

			$scope.$watch('city', function (newValue) {
				if (newValue.length > 2) {
					// Call the getForecast() function in the Weather Service (returns promise)
					Weather.getForecast(newValue).then(function (response) {
						$scope.weather = response.data;
					});
				}
			});

		},
		link: function (scope, element, attr) {

			// Parse D3 Options
			var opts = attr.hsOpts ? $parse(attr.hsOpts)(scope) : {};

			// Cache chart element
			var chart = element.find('.chart');

			// Watch for changes in scope.weather
			scope.$watch('weather', function (newVal) {

				// Empty chart element
				chart.empty();

				// Only if scope.weather has values
				if (newVal) {

					var data = newVal, // Received data from the Weather Service
						maxTemps = []; // Array for max temps

					// Bind data to the scope
					scope.data = data;

					// Iterate over the list of temps
					angular.forEach(data.list, function (value) {
						// Push to max temps Array
						maxTemps.push(value.temp.max);
					});

					// Draw SVG chart in chart element
					D3Chart.graph(chart, maxTemps, opts);
				}

			});
		}

	}

})

})();
