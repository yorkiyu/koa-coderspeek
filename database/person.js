var config = require("../config");
var models = require("../app/models");
var async = require('async');
var mongoose = require("mongoose");

var Person = mongoose.model("Person"); 

var data = [
	{
		name: '玉伯',
		code: 'lifesinger',
		head_src: '/images/lifesinger.jpg',
		desc: '玉伯（王保平），淘宝前端类库 KISSY、前端模块化开发框架SeaJS、前端基础类库Arale的创始人。2003-2006 年，中科院物理所研究生，Fortran 与 C 程序员，喜爱实验模拟和数值计算。 2006-2008 年，在中科院软件所互联网实验室从事项目管理软件的研发，C# 与 Java 爱好者。 2008 年 4 月份加入淘宝，就职于 UED 部门。2009 年起，组建前端架构团队，在首页维护、全网性能优化、类库研发、知识沉淀、工具应用等方面取得了丰硕成果。',
		jobs: '',
		github_url: 'https://github.com/lifesinger',
		open_project: ' KISSY,SeaJS,Araleu',
        followers: 123,
        starred: 39,
        like: 34
	},
	{
		name: '郭家宝',
		code: 'BYVoid',
		head_src: '/images/BYVoid.jpg',
		desc: 'BYVoid（郭家宝），清华大学计算机系2010级本科生，自由意志主义者。《Node.js开发指南》作者',
		github_url: 'https://github.com/BYVoid',
		blog_url: 'http://www.byvoid.com',
		books: '《Node.js开发指南》'
	
	},
	{
		name: '田永强',
		code: 'JacksonTian',
		head_src: '/images/JacksonTian.jpg',
		desc: '田永强，淘宝花名“朴灵”，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。著有《深入浅出Node.js》一书。',
		github_url: 'https://github.com/JacksonTian',
		blog_url: 'http://diveintonode.org/',
		books: '《深入浅出Node.js》'
	},
	{
		name: '谢孟军',
		code: 'astaxie',
		head_src: '/images/astaxie.jpg',
		desc: '谢孟军，《Go Web编程》一书的作者。网名 @astaxie ，现就职于盛大云，高级研究员，技术经理。主要从事盛大云分发的系统研发工作。',
		github_url: 'https://github.com/astaxie',
		books: '《Go Web编程》'
	},
	{
		name: '惠新宸',
		code: 'laruence',
		head_src: '/images/laruence.jpg',
		desc: '惠新宸 ，国内最有影响力的PHP技术专家， PHP开发组核心成员 , PECL开发者 , Zend公司外聘顾问, 曾供职于雅虎，百度。现在新浪微博任平台及数据部总架构师兼首席PHP顾问。 是PHP NG核心开发者，PHP5.4，5.5的主要开发者。作为PECL开发者贡献了Yaf (Yet another framework)，Yar(Yet another RPC framework) 以及Yac(Yet another Cache)、Taint等多个优秀开源作品，同时也是APC ，Opcache，Msgpack等项目的维护者。（百度百科）',
		github_url: 'https://github.com/laruence'
	},
	{
		name: '林建锋',
		code: 'sofish',
		head_src: '/images/sofish.jpg',
		desc: '林建锋，国内资深前端开发工程师，Web 标准布道者，前支付宝前端开发部 CSS 样式库负责人。Trimidea 创始人。',
		github_url: 'https://github.com/sofish',
		blog_url: 'http://sofi.sh'
	}
];
async.each(data,function(item){
	console.log(item);
	Person.create(item);
});
