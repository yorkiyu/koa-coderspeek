var config = require("../config");
var models = require("../app/models");
var async = require('async');
var mongoose = require("mongoose");
var Note = mongoose.model("Note"); 
var Project = mongoose.model("Project");

var data = [
    {
        summary: "jquery动画使用技巧",
        like_count: 100,
        visit_count: 5000,
        content: '{html:"<h2>jquery动画使用技巧</h2>",markdown: "## jquery动画使用技巧"}'
    },
    {
        summary: "jquery源码分析",
        like_count: 150,
        visit_count: 500,
        content: '{html:"<h2>jquery源码分析</h2>",markdown: "## jquery源码分析"}'
    },
    {
        summary: "jquery插件开发",
        like_count: 600,
        visit_count: 500,
        content: '{html:"<h2>jquery插件开发</h2>",markdown: "## jquery插件开发"}'
    },
    {
        summary: "jquery事件代理",
        like_count: 759,
        visit_count: 130,
        content: '{html:"<h2>jquery事件代理</h2>",markdown: "## jquery事件代理"}'
    } 
];
Note.remove(function(err,product){
	err && console.log(err);
});
Project.findOne({name: "jquery"},'_id',null,function(error,ret){
    for(var i = 0;i<data.length;i++){
        data[i].projectId = ret._id;
    }
    async.each(data,function(item){
        Note.create(item,function(error,data){
            if(error) console.log(error); 
        });
    });
    mongoose.disconnect();
});

