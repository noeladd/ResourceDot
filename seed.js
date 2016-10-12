var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Resource = db.model('resource');
var Tag = db.model('tag');
var Promise = require('sequelize').Promise;
var fs = require('fs');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var faker = require('faker');

converter.on('end_parsed', function (jsonArray) {
    db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedResources(jsonArray);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
});

fs.createReadStream(__dirname + '/csv/seed.csv').pipe(converter);

function seedResources(jsonArray){
    return Promise.map(jsonArray, function(resource){
        var tags = resource.tags.split(',');
        tags = tags.filter(function(tag, i, array){
            return array.indexOf(tag) === i;
        });
        return Resource.findOrCreate({where: {link: resource.link}, defaults: resource})
        .spread(function(newResource){
            return Promise.map(tags, function(tag){
                tag = tag.toLowerCase();
               return Tag.findOrCreate({where: {
                title: tag
               }})
               .spread(function(newTag){
                    return newResource.addTag(newTag);
               })
            });
        });
    });
}

function randomNum(){
    return Math.floor(Math.random() * 16) + 1;
}

function writeUser(){
    var user = {};
    user.name = faker.name.findName();
    user.email = faker.internet.email();
    user.password = 'password';
    user.picture = '/img/avatars/avatar' + randomNum() + '.png';

    return user;
}

function seedUsers() {
    var users = [];
    for (var i = 0; i < 100; i++){
        users.push(writeUser());
    }
    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });
    return Promise.all(creatingUsers);
}
