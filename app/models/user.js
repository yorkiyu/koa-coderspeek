var mongoose = require('mongoose');
var BaseModel = require('./base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	name: {type: String },
    head_src: {type: String},
	type: {type: Number,default: 2 }, //1=>admin,2=>ordinary
    email: {type: String},
    pass: {type: String},
    active: {type: Boolean,default: false},

    githubId: { type: String},
    githubUsername: {type: String},
    githubAccessToken: {type: String},
	avatar: { type: String },
	followers: { type: Number, default: 0 },
	following: { type: Number, default: 0 },

	score: { type: Number, default: 0 },
	receive_reply_mail: {type: Boolean, default: false },
	receive_at_mail: { type: Boolean, default: false },
	
	accessToken: { type: String },

    create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});

UserSchema.plugin(BaseModel);

UserSchema.virtual('avatar_url').get(function () {
  var url = this.avatar || ('https://gravatar.com/avatar/' + utility.md5(this.email.toLowerCase()) + '?size=48');

  // www.gravatar.com 被墙
  url = url.replace('www.gravatar.com', 'gravatar.com');

  // 让协议自适应 protocol，使用 `//` 开头
  if (url.indexOf('http:') === 0) {
    url = url.slice(5);
  }
  // 如果是 github 的头像，则限制大小
  if (url.indexOf('githubusercontent') !== -1) {
    url += '&s=120';
  }
  return url;
});

mongoose.model('User', UserSchema);
