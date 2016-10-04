app.factory('resourceFactory', function($http) {
	return {
		getAll: function() {
			return $http.get('/api/resources')
			.then(function (resources) {
				return resources.data;
			})
		},
		getAllByTag: function(tag) {
			return $http.get('/api/resources?tag=' + tag)
			.then(function (resources) {
				return resources.data;
			})
		},
		getAllByType: function(type) {
			return $http.get('/api/resources?type=' + type)
			.then(function (resources) {
				return resources.data;
			})
		},
		getById: function(id) {
			return $http.get('/api/resources/' + id)
			.then(function (resources) {
				return resources.data;
			})
		},
		post: function(data) {
			return $http.post('/api/resources', data)
			.then(function (createdResource) {
				return createdResource.data;
			})
		}
	}
})
