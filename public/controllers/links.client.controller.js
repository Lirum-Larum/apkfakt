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

		$scope.open = function(short) {

			var link =  $scope.links.filter(l => { return l.short === short; })[0]
			         || {
							url: "http://www.sex.com",
							title: "Sex",
							description: "figge",
							tags: [
								  { text: "penis" }
								, { text: "abehole" }		         	
								]
			         	};

			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'partials/create-link-modal.html',
				controller: 'CreateLinkModalInstanceCtrl',
				resolve: {					
					link: function() { return link; }
				}
			});
			modalInstance.result.then(function(arg) {

				var link = arg.link;
				var createNew = arg.createNew;

				if(createNew) {
					//
					// TODO: assign short
					//
					$http.post('/api/links', link).then(function(res) {
						$scope.links = res.data;
					});
				} else {
					$http.put('/api/links/' + short, link).then(function(res) {
						$scope.links = res.data;
					})
				}
			}, function() {
			});
		};

		$scope.removeLink = function(short) {
			$http.delete('/api/links/' + short).then(function(res) {
				$scope.links = res.data;
			});
		};

		var init = function() {
			mockBackend.init();
			$scope.searchString = '';
			getLinks();			
		};
		init();
	}]);


app.controller('CreateLinkModalInstanceCtrl',
	['$scope', '$uibModalInstance', 'link',
	function($scope, $uibModalInstance, link) {

		$scope.createNew = (typeof link.short === 'undefined');
		$scope.link = angular.copy(link);

		$scope.ok = function () {
			$uibModalInstance.close( {
				link: $scope.link,
				createNew: $scope.createNew
			} );
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);


})(angular.module(mainApplicationModuleName));
