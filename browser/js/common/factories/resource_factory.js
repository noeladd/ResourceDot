app.factory('ResourceFactory', function($http, DataFactory) {
	let ResourceFactory = {};
	let	recommended = [];
	let	intersect = function(a, b){
		let ai = 0, bi = 0;
		let result = [];

		while ( ai < a.length && bi < b.length ){
			if (a[ai] < b[bi] ){
				 ai++;
				}
			else if (a[ai] > b[bi] ){
				 bi++;
				}
			else { /* they're equal */
				result.push(a[ai]);
				ai++;
				bi++;
			}
		}
		return result;
	}
	let compare = function(a, b){
		if (a.rating > b.rating) return 1;
		if (a.rating < b.rating) return -1;
		return 0
	};

	ResourceFactory.getAll = function() {
		return $http.get('/api/resources')
		.then(DataFactory.getData)
	}
	ResourceFactory.getAllByTag = function() {
		var tagIds = [...arguments]
		tagIds = tagIds.join(',');
		//  '/api/resources?tagIds=1,2,3,'
		return $http.get('/api/resources?tagIds=' + tagIds)
		.then(DataFactory.getData)
	}
	ResourceFactory.getAllByType = function(type) {
		return $http.get('/api/resources?type=' + type)
		.then(DataFactory.getData)
	}
	ResourceFactory.getById = function(id) {
		return $http.get('/api/resources/' + id)
		.then(DataFactory.getData)
	}
	ResourceFactory.post = function(data) {
		return $http.post('/api/resources', data)
		.then(DataFactory.getData)
	}
	ResourceFactory.getRecommendations = function(resources, currentUser) {
		resources.forEach(function(resource){
			//Formula for calculating how many friends like each resource.
			var currentRating = intersect(currentUser.friend, resource.likeUser).length - intersect(currentUser.friend, resource.dislikeUser).length;
			if (currentRating > 0 && (resource.dislikeUser.indexOf(currentUser.id) === -1) && (resource.likeUser.indexOf(currentUser.id) === -1)){
				recommended.push({id: resource.id, rating: currentRating})
			}
		})
		//Uses array.sort to sort the recommended resources numerically by rating
		return recommended.sort(compare);
	}

	return ResourceFactory;

})
