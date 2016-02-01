var config = require("../config");
var models = require("../app/models");
var async = require('async');
var mongoose = require("mongoose");

var Project = mongoose.model("Project"); 

var data = [
	{
		name: 'jquery',
		language: "javascript",
		starred: 37609,
	},
	{
		name: 'seajs',
		language: "javascript",
		starred: 5020,
	},
	{
		name: 'zepto',
		language: "javascript",
		starred: 9921
	},
	{
		name: 'agileorbit-cookbooks',
		language: "c",
		starred: 240,
	},
	{
		name: 'laravel',
		language: "php",
		starred: 21084,
	},
	{
		name: 'cocos2d-x',
		language: "java",
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
