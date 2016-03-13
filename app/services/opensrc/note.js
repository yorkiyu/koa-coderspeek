var models = require('../../models');
var Note = models.Note;

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
    return Note.find(conditions,fields,options).exec();
}

exports.findOne = function(conditions,fields){
	return Note.findOne(conditions,fields).exec(); 
}


exports.findByProjectId = function(projectId,fields){
    return Note.findOne({projectId: projectId},fields).exec();
}

exports.insertNote = function(data){
	var note = new Note();	
	note.title = data.title;
	note.img_src = data.img_src;
	note.content = data.content;
	note.createId= data.user_id;
	note.projectId = data.project_id;
	return note.save();
}
