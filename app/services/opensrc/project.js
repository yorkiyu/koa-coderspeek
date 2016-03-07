var models = require('../../models');
var Project = models.Project;

/* 
	* 根据条件获取数据
	* @param {Object} conditions
	* @param {Object} [fields] optional fields to return (http://bit.ly/1HotzBo)
	* @param {Object} [options] optional
	* return promise;
*/
exports.findAll = function(conditions,fields,options){
    conditions = conditions || null;
	fields = fields || null;
	options = options || null;
    return Project.find(conditions,fields,options).exec();
}
exports.findOne = function(conditions,fields){
	return Project.findOne(conditions,fields).exec(); 
}
exports.findById = function(id,fields){
	return Project.findById(id,fields).exec();
}
exports.insertOpensrc = function *(data,user_id){
    var projectModel = new Project(); 
    projectModel.creatorId = user_id;
    projectModel.author = data.author;
    projectModel.name = data.name;
    projectModel.starred = data.starred;
    projectModel.watchers = data.watchers;
    projectModel.forks = data.forks;
    projectModel.language = data.language;
    projectModel.github_url = data.github_url;
    projectModel.home = data.home;
    projectModel.content = data.content;
    projectModel.description = data.description;
    return projectModel.save();
}

