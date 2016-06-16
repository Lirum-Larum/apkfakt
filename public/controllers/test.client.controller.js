(function(app) {

app.controller('testController',
	['$scope',
	function($scope) {
		$scope.bigData = {};
		$scope.bigData.breakfast = false;
		$scope.bigData.lunch = false;
		$scope.bigData.dinner = false;
		$scope.isCollapsed = false;
	}]);

})(angular.module(mainApplicationModuleName));
