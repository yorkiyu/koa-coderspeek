var models = require('../models');
var uuid = require('node-uuid');
var User = models.User;

/*
	*查找一条记录
	* @param {Object} conditions
	* @param {Object} [fields] optional fields to return (http://bit.ly/1HotzBo)
	* return promise
*/
exports.findOne = function(conditions,fields){
	return User.findOne(conditions,fields).exec(); 
}

exports.updateById = function(id,update){
    return User.findByIdAndUpdate(id,update).exec();    
}
exports.updateGithubUser = function(accessToken,profile,curuser){
	var email = profile.emails && profile.emails[0] && profile.emails[0].value;
	curuser.name = profile.username;
	curuser.email = email;
	curuser.githubUsername = profile.username;
	curuser.githubAccessToken = accessToken;
	curuser.avatar = profile._json.avatar_url;
	curuser.following = profile._json.following;
	curuser.followers = profile._json.followers;
	curuser.update_at = new Date();
	return curuser.save();	
}
exports.insertGithubUser = function(accessToken,profile){
	var email = profile.emails && profile.emails[0] && profile.emails[0].value;
	var userModel = new User();
	userModel.name = profile.username;
	userModel.email = email;
	userModel.active = true;
	userModel.githubId = profile.id;
	userModel.githubUsername = profile.username;
	userModel.githubAccessToken = accessToken;
	userModel.avatar = profile._json.avatar_url;
	userModel.following = profile._json.following;
	userModel.followers = profile._json.followers;
	userModel.accessToken = uuid.v4();
	return userModel.save();
}

