var models = require('../../models');
var Person = models.Person;

exports.findAll = function(){
    return Person.find().exec();
}

