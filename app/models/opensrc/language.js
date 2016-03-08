var mongoose = require('mongoose');
var BaseModel = require('../base');
var _         = require('lodash');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LanguageSchema = new Schema({
    name: { type: String },
    total: { type: Number,default: 0 },
    create_at: { type: Date, default: Date.now },
	update_at: { type: Date, default: Date.now }
});
LanguageSchema.plugin(BaseModel);

mongoose.model('Language',LanguageSchema);


