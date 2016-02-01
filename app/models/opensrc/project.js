var mongoose = require('mongoose');
var BaseModel = require('../base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
	name: {type: String },
	language: {type: String}, 
	starred: { type: Number,default: 0 },
	like_count: { type: Number,default: 0 },
	visit_count: { type: Number,default: 0 },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});

ProjectSchema.plugin(BaseModel);

mongoose.model('Project', ProjectSchema);
