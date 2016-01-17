var config = require("../config");
var models = require("../app/models");
var async = require('async');
var mongoose = require("mongoose");

var Project = mongoose.model("Project"); 

var data = [
	{
		name: 'jquery',
		type: 1,
		starred: 37609,
	},
	{
		name: 'seajs',
		type: 1,
		starred: 5020,
	},
	{
		name: 'zepto',
		type: 2,
		starred: 9921
	},
	{
		name: 'agileorbit-cookbooks',
		type: 2,
		starred: 240,
	},
	{
		name: 'laravel',
		type: 3,
		starred: 21084,
	},
	{
		name: 'cocos2d-x',
		type: 2,
		starred: 7273 
	}

];
Project.remove(function(err,product){
	err && console.log(err);
});
async.each(data,function(item){
	console.log(item);
	Project.create(item);
});
mongoose.disconnect();
