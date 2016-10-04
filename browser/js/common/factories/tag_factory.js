app.factory('TagFactory', function($http){
    let TagFactory = {};
    TagFactory.getAll = function(){
        return $http.get('/api/tags')
        .then(function(response){
            return response.data;
        })
    }

    TagFactory.addTag = function(info){
        return $http.post('/api/tags', info)
    }

    TagFactory.getById = function(id){
        return $http.get('/api/tags/' + id)
        .then(function(response){
            return response.data
        })
    }
    return TagFactory;
})
