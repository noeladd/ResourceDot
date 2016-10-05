app.factory('UserFactory', function($http){
    let getAll = function(){
        return $http.get('/api/users')
        .then(function(response){
            return response.data;
        })
    }

    let getById = function(id){
        return $http.get('/api/users' + id)
        .then(function(response){
            return response.data;
        })
    }

    let addUser = function(info){
        return $http.post('/api/users', info);
    }
    return {getAll, getById, addUser}
})
