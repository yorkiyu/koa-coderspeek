var mongoose = require('mongoose');
var BaseModel = require('../base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	name: {type: String },
    head_src: {type: String},
	type: {type: Number }, //1=>admin,2=>ordinary
    email: {type: String},
    pass: {type: String},
    githubId: { type: String},
    githubUsername: {type: String},
    githubAccessToken: {type: String},
    active: {type: Boolean,default: false},
    create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});

UserSchema.plugin(BaseModel);

mongoose.model('User', UserSchema);
