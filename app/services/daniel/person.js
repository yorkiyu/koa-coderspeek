var models = require('../../models');
var Person = models.Person;

exports.findAll = function(){
    return Person.find().exec();
}

exports.updateById = function(id,update){
    return Person.findByIdAndUpdate(id,update).exec();    
}
