app.factory('TagFactory', function($http, DataFactory){
    let TagFactory = {};

    TagFactory.getAll = function(){
        return $http.get('/api/tags')
        .then(DataFactory.getData(response))
    }

    TagFactory.addTag = function(info){
        return $http.post('/api/tags', info)
        .then(DataFactory.getData(response))
    }

    TagFactory.getById = function(id){
        return $http.get('/api/tags/' + id)
        .then(DataFactory.getData(response))
    }
    return TagFactory;
})
