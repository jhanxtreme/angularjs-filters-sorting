'use strict';

(function(){
	
	angular.module("searchApp", [])
	
		.controller('SearchCtrl', ['Data', '$scope', function(Data, $scope){
			var scope = this;
			scope.orderByField = scope.orderByField || 'name';
			scope.countries = [];

			Data.getCountries().then(function(data){
				scope.countries = data;
			});
			
			scope.toggleOrder = function(field){
				scope.orderByField = ( scope.orderByField.substr(1, scope.orderByField.length) == field) ? field : '-'+field;
			}
			scope.limits = [{num: 10}, {num: 20}, {num: 30},{num: 50},{num: 100},{num: 200}, {num: 300}];
		}])
		
		.factory('Data', ['$http', '$q', function($http, $q){
			return{

				getCountries: function(){
					var deferred = $q.defer();
					$http.get('core/data.json')
						.success(function(data, status, headers, config){
							deferred.resolve(data);
						})
						.error(function(data, status, headers, config){
							deferred.reject(data);
						});
						
					return deferred.promise;		
				}
			}
			
		}]);
		
	
	
})();