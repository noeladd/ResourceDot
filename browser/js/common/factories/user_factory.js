app.factory('UserFactory', function($http, DataFactory){
    let UserFactory = {};

    UserFactory.getAll = function(){
        return $http.get('/api/users')
        .then(DataFactory.getData(response))
    }

    UserFactory.getById = function(id){
        return $http.get('/api/users' + id)
        .then(DataFactory.getData(response))
    }

    UserFactory.addUser = function(info){
        return $http.post('/api/users', info)
        .then(DataFactory.getData(response))
    }
    return UserFactory;
})
