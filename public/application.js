var mainApplicationModuleName = 'apkfakt';

var mainApplicationModule = angular.module(mainApplicationModuleName,
	['ngMockE2E', 'ui.bootstrap', 'ngTagsInput', 'ngRoute']);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});
