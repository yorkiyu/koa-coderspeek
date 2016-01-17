var mongoose = require('mongoose');
var BaseModel = require('../base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
	name: {type: String },
	type: {type: Number }, //1=>javascript,2=>java,3=>php,4=>python,5=>c++/c,6=>css
	starred: { type: Number,default: 0 },
	like: { type: Number,default: 0 },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});

ProjectSchema.plugin(BaseModel);

mongoose.model('Project', ProjectSchema);
