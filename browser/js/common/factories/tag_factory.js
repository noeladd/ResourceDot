app.factory('TagFactory', function($http){
    let getAll = function(){
        return $http.get('/api/tags')
        .then(function(response){
            return response.data;
        })
    }

    let addTag = function(info){
        return $http.post('/api/tags', info)
    }

    let getById = function(id){
        return $http.get('/api/tags/' + id)
        .then(function(response){
            return response.data
        })
    }
    return {getAll, addTag, getById}
})
