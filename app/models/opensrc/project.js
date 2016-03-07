var mongoose = require('mongoose');
var BaseModel = require('../base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
    creatorId: {type: ObjectId},
	name: {type: String },
    author: {type: String},
	starred: { type: Number,default: 0 },
    watchers: {type: Number,default: 0},
    forks: {type: Number,default: 0},
	language: {type: String}, 
    github_url: {type: String},
    home: {type: String},
    description: {type: String},
	content: { type: String },
	like_count: { type: Number,default: 0 },
	visit_count: { type: Number,default: 0 },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});

ProjectSchema.plugin(BaseModel);

mongoose.model('Project', ProjectSchema);
