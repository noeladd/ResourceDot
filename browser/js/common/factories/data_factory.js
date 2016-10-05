app.factory('DataFactory', function(){
    let DataFactory = {};

    DataFactory.getData = function(response){
        return response.data
    }
    return DataFactory;
})
