app.factory('ResourceFactory', function($http) {
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
		.then(function (resources) {
			return resources.data;
		})
	}
	ResourceFactory.getAllByTag = function(tag) {
		return $http.get('/api/resources?tag=' + tag)
		.then(function (resources) {
			return resources.data;
		})
	}
	ResourceFactory.getAllByType = function(type) {
		return $http.get('/api/resources?type=' + type)
		.then(function (resources) {
			return resources.data;
		})
	}
	ResourceFactory.getById = function(id) {
		return $http.get('/api/resources/' + id)
		.then(function (resources) {
			return resources.data;
		})
	}
	ResourceFactory.post = function(data) {
		return $http.post('/api/resources', data)
		.then(function (createdResource) {
			return createdResource.data;
		})
	}
	ResourceFactory.getRecommendations = function(resources, user) {
		resources.forEach(function(resource){
			//Formula for calculating how many friends like each resource.
			var currentRating = intersect(user.friend, resource.profile).length - intersect(user.friend, resource.user)
			if (currentRating > 0){
				recommended.push({id: resource.id, rating: currentRating})
			}
		})
		//Uses array.sort to sort the recommended resources numerically by rating
		return recommended.sort(compare);
	}

	return ResourceFactory;

})