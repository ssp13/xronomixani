/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('plunker', []);
app.factory('instagram', ['$http', function($http){

	return {
		fetchPopular: function(year,callback){
            
            var endPoint = "https://api.instagram.com/v1/tags/"+year +"/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
            
            $http.jsonp(endPoint).success(function(response){
                callback(response.data);
            });
		}
	}

}]);
app.controller('MainCtrl', function($scope,instagram) {
 
 
  $scope.pics=[];
 
 
  $scope.year;
  $scope.$watch('year',function(){
    instagram.fetchPopular($scope.year,function(data){
    
    $scope.pics=data;
    console.log(data);
  })  })
  
  
});


