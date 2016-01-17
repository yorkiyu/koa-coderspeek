var models = require('../../models');
var Project = models.Project;

exports.findAll = function(){
    return Project.find().exec();
}
