app.factory('UserFactory', function($http, DataFactory){
    let UserFactory = {};

    UserFactory.getAll = function(){
        return $http.get('/api/users')
        .then(DataFactory.getData);
    }

    UserFactory.getById = function(id){
        return $http.get('/api/users/' + id)
        .then(DataFactory.getData);
    }

    UserFactory.addUser = function(info){
        return $http.post('/api/users', info)
        .then(DataFactory.getData);
    }

    UserFactory.setTags = function(id, tags) {
      return $http.put('/api/users/' + id + '/settags', tags)
      .then(DataFactory.getData);
    }
    return UserFactory;
})
