var models = require('../../models');
var Person = models.Person;

exports.findAll = function(callback){
    var promise = Person.find({},{},{},function(err,data){
        callback(err,data); 
    });
}

