app.factory('ResourceFactory', function($http, DataFactory) {
	let ResourceFactory = {};

	ResourceFactory.getAll = function() {
		return $http.get('/api/resources')
		.then(DataFactory.getData);
	};
	ResourceFactory.getAllByTag = function() {
		var tagIds = [...arguments];
		tagIds = tagIds.join(',');
		//  '/api/resources?tagIds=1,2,3,'
		return $http.get('/api/resources?tagIds=' + tagIds)
		.then(DataFactory.getData);
	};

	ResourceFactory.getAllByType = function(type) {
		return $http.get('/api/resources?type=' + type)
		.then(DataFactory.getData);
	};

	ResourceFactory.getById = function(id) {
		return $http.get('/api/resources/' + id)
		.then(DataFactory.getData);
	};

	ResourceFactory.post = function(data) {
		return $http.post('/api/resources', data)
		.then(DataFactory.getData);
	};

	ResourceFactory.like = function(id) {
		return $http.put('/api/resources/' + id + '/like');
	};

	ResourceFactory.dislike = function(id) {
		return $http.put('/api/resources/' + id + '/dislike');
	};

	return ResourceFactory;
});
