var mongoose = require('mongoose');
var BaseModel = require('../base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var NoteSchema = new Schema({
    projectId: { type: ObjectId },
    summary: { type: String },
	like_count: { type: Number,default: 0 },
	visit_count: { type: Number,default: 0 },
    content: { type: String },
	create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});

NoteSchema.plugin(BaseModel);

mongoose.model('Note', NoteSchema);
