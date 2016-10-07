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
		.then(DataFactory.getData)
	}
	ResourceFactory.getRecommendations = function(resources, currentUser) {
		resources.forEach(function(resource){
			//Formula for calculating how many friends like each resource.
			var currentRating = intersect(currentUser.friend, resource.profile).length - intersect(currentUser.friend, resource.user).length;
			if (currentRating > 0 && (resource.user.indexOf(currentUser.id) === -1) && (resource.profile.indexOf(currentUser.id) === -1)){
				recommended.push({id: resource.id, rating: currentRating})
			}
		})
		//Uses array.sort to sort the recommended resources numerically by rating
		return recommended.sort(compare);
	};

	ResourceFactory.like = function(id) {
		return $http.put('/api/resources/' + id + '/like');
	};

	ResourceFactory.dislike = function(id) {
		return $http.put('/api/resources/' + id + '/dislike');
	};

	return ResourceFactory;
});
