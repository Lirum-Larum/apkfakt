(function(app) {

app.controller('linksController',
	['$scope', '$httpBackend', '$http', '$uibModal', '$routeParams',
	 'mockBackend',
	function($scope, $httpBackend, $http, $uibModal, $routeParams,
		     mockBackend) {

		var getLinks = function() {
			$http.get('/api/links').then(function(res) {
				$scope.links = res.data;
			});			
		};

		$scope.open = function(size) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'partials/create-link-modal.html',
				controller: 'CreateLinkModalInstanceCtrl',
				size: size,			
				// resolve: {					
				// }
			});
			modalInstance.result.then(function(link) {
				$http.post('/api/links', link).then(function(succRes) {
//					getLinks();
				}, function(errRes) {
					console.log('POST to /api/links returned error.');
				});
			}, function() {
				console.log('Modal dismissed.');
			});
		};

		$scope.removeLink = function(short) {
			$http.delete('/api/links/' + short);			
		};

		var init = function() {
			mockBackend.init();
			$scope.searchString = '';
			getLinks();			
		};
		init();
	}]);


app.controller('CreateLinkModalInstanceCtrl',
	['$scope', '$uibModalInstance',
	function($scope, $uibModalInstance) {

		$scope.link = {
			url: "http://www.sex.com",
			title: "Sex",
			description: "figge",
			tags: [
				  { text: "penis" }
				, { text: "abehole" }
			]
		};

		$scope.ok = function () {
			$uibModalInstance.close( $scope.link );
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);


})(angular.module(mainApplicationModuleName));
