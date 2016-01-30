var Services = require("../../services");
var config = require("../../../config");
var User = Services.User;

exports.findOrCreate = function *(accessToken,refreshToken,profile){
	var curuser = yield User.findOne({ 'githubId': profile.id });
	//老用户，更新github信息,新用户注册
	if(curuser){
		var ret  = yield User.updateGithubUser(accessToken,profile,curuser);	
		delete curuser;
		if(ret){
			var sesUser = {
				username: ret.name,
				_id: ret._id,
				avatar_url: ret.avatar
			}
			delete ret;
			return yield Promise.resolve(sesUser);
		}else {
			return yield Promise.reject(false);	
		}
	}else {
		var ret = yield User.insertGithubUser(accessToken,profile);	
		if(ret){	
			var sesUser = {
				username: ret.name,
				_id: ret._id,
				avatar_url: ret.avatar
			} 
			delete ret;
			return yield Promise.resolve(sesUser);	
		}else {
			return yield Promise.reject(false);
		}
	}
}
