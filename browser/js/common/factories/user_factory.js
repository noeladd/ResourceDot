app.factory('UserFactory', function($http){
    let UserFactory = {};

    UserFactory.getAll = function(){
        return $http.get('/api/users')
        .then(function(response){
            return response.data;
        })
    }

    UserFactory.getById = function(id){
        return $http.get('/api/users' + id)
        .then(function(response){
            return response.data;
        })
    }

    UserFactory.addUser = function(info){
        return $http.post('/api/users', info);
    }
    return UserFactory
})
