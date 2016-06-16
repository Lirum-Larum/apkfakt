(function(app) {

app.factory('mockBackend', 
  ['$httpBackend',
  function($httpBackend) {
	return {

		init: function() {

			var self = this;

			this.links = [
				{
					"short": "68po",
					"url": "http://example.com",
					"title": "Example.com",
					"description": "Just an example link",
					"tags": [ { "text": "gruesel" }
					        , { "text": "penis" }
					        ]
				},
				{
					"short": "68pp",
					"url": "https://encrypted.google.com",
					"title": "Google",
					"description": "The internet",
					"tags": [ { "text": "alphabet" }
					        , { "text": "penis" }
					        ]
				},
				{
					"short": "68pq",
					"url": "https://nodejs.org",
					"title": "NodeJS",
					"description": ".NET suxx C# = fuck off",
					"tags": [ { "text": "alphabet" }
					        , { "text": "gruesel" }
					        ]
				}];		

			$httpBackend.whenGET(/^partials\//).passThrough();		

			$httpBackend.whenGET(/api\/links$/).respond(this.links);

			$httpBackend.whenPOST(/api\/links$/).respond(function(method, url, data, headers) {
				var link = angular.fromJson(data);
				self.links.push(link);
				return [200, self.links, {}];
			});
			$httpBackend.whenDELETE(/api\/links\/(\w+)/).respond(function(method, url, params) {
				var match = /api\/links\/(\w+)/.exec(url);
				if(match && match.length > 1) {
					var short = match[1];
					self.links = self.links.filter(ln => { 
						return ln.short !== short;
					});
					return [200, self.links, {}];
				} else {
					return [400, self.links, {}];
				}			
			});			
		}
	};
}]);


})(angular.module(mainApplicationModuleName));
