var mongoose = require('mongoose');
var BaseModel = require('./base');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PersonSchema = new Schema({
	name: { type: String },
	desc: { type: String },
	jobs: { type: String },
	like_count: { type: Number, default: 0 },
	visit_count: { type: Number, default: 0 },
	deleted: { type: Boolean, default false },
	github_url: { type: String },
	blog_url: { type: String },
	open_project: { type: String },
	books: { type: String }
});

PersonSchema.plugin(BaseModel);
mongoose.model('Person', PersonSchema);
