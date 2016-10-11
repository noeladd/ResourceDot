app.factory('GuideFactory', function($http, DataFactory) {
    let GuideFactory = {};

    GuideFactory.getAll = function() {
        return $http.get('/api/guides')
        .then(DataFactory.getData);
    }
    GuideFactory.getAllByTag = function() {
        var tagIds = [...arguments]
        tagIds = tagIds.join(',');
        // 'api/guides?tagIds=1,2,3'
        return $http.get('/api/guides?tagIds=' + tagIds)
        .then(DataFactory.getData);
    }
   GuideFactory.getById = function(id){
       return $http.get('/api/guides/' + id)
       .then(DataFactory.getData);
   }
   GuideFactory.addNewGuide = function(data){
       return $http.post('/api/guides', data)
       .then(DataFactory.getData);
   }
   GuideFactory.addResource = function(id, data){
       return $http.put('/api/guides/' + id + '/add', data)
   }
   GuideFactory.removeResource = function(id, data){
       return $http.put('/api/guides/' + id + '/delete', data)
   }
   GuideFactory.like = function(id) {
       return $http.put('/api/guides/' + id + '/like');
   }
   GuideFactory.dislike = function(id){
       return $http.put('/api/guides/' + id + '/dislike');
   }
   return GuideFactory
})
