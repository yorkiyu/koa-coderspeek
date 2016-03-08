var models = require('../../models');
var Language = models.Language;

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
    return Language.find(conditions,fields,options).exec();
}
exports.findOne = function(conditions,fields){
	return Language.findOne(conditions,fields).exec(); 
}

exports.insertLang = function(name){
    var languageModel = new Language();
    languageModel.name = name;
    languageModel.total = 1;
    return languageModel.save();
}

exports.updateById = function(_id,update){
    return Language.findByIdAndUpdate(_id,update).exec();
}
