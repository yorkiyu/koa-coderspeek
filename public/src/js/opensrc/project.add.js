define(function(require,exports,module){
    var $ = require('jquery');
	var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
    var constants = require('/src/js/common/constants.js');
	var base = require('/src/js/base.js');
	var login = require('/src/js/login.js');
    
    var $content = $("#content");
    //add project module
	var AddProModule = function(){
            $github_input = $content.find("#github-url"),
            $step1 = $content.find(".step1"),
            $info_wrap = $content.find(".info-wrap");	
        var result = {},
            isSaving = false;
		function run(){
            //event agent
            $content.bind("click",function(e){
                var target = e.target || e.srcElement;
                var $target = $(target);
                if($target.hasClass("fetch")){
                    fetchHandler($target); 
                }else if($target.hasClass("save")){
                    saveHandler($target); 
                }else if($target.hasClass("add-layer") || $target.hasClass("close") || $target.parents(".close").length > 0){
                    closeHandler($target); 
                }     
            });
		}
        function saveHandler($target){
            if($target.hasClass("disabled") || isSaving){
                return; 
            } 
            if(!result){
                return; 
            }
            isSaving = true;
            $target.html(constants.load_img);
            $.ajax({
                type: "post",
                url: "/api/opensrc/project/save",
                data: result,
                dataType: "json",
                success: function(ret){
                    if(!ret.status){
                        if(ret.count == 1){
                            $target.siblings(".message").addClass("text-danger").html("没有权限,请先登陆！");
                        }else if(ret.count == 6){
                            $target.siblings(".message").addClass("text-danger").html('已经存在，<a href="/opensrc/notelist/'+ret.data.id+'">点击查看</a>');
                            $target.addClass("disabled");
                            resetInfo();
                            $github_input.val("");
                            $add_layer.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
                        }else{
                            $target.siblings(".message").addClass("text-danger").html("操作失败，请重试！"); 
                        }
                    }else {
                        $target.siblings(".message").addClass("text-success").html('保存成功，<a href="/opensrc/notelist/'+ret.data.id+'">点击查看</a>');
                        resetInfo();
                        $github_input.val("");
                        $target.addClass("disabled");
                        $add_layer.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
                    }
                    isSaving = false;
                    $target.html("保存");
                },
                error: function(ret){
                    isSaving = false;
                    $target.html("保存");
                }
            });
        }
        function resetInfo (){
            $info_wrap.find("li:eq(0) .col-xs-4:eq(0) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(0) .col-xs-4:eq(1) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(0) .col-xs-4:eq(2) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(1) .col-xs-4:eq(0) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(1) .col-xs-4:eq(1) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(1) .col-xs-4:eq(2) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(2) .col-xs-4:eq(0) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(2) .col-xs-4:eq(1) span:eq(1)").text('-'); 
            $info_wrap.find("li:eq(3) .col-xs-12 span:eq(1)").text('-'); 
            result = {};
        }
        function fetchHandler($target){
            var url = $github_input.val();
            if(!url){
                $github_input.focus();
                return; 
            }
            url = url.replace(/https:\/\/[^\/]+/,"https://api.github.com/repos");
            resetInfo();
            $step1.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
            $step1.find(".save").addClass("disabled");
            $step1.find(".message").remove("text-danger").removeClass("text-success").html("");
            $target.html(constants.load_img);
            $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                success: function(data){
                    if(!data.id){
                        $target.html("拉取数据");
                        $step1.find(".ret").addClass("text-danger").html("失败,地址错误！")
                        return; 
                    }
                    $info_wrap.find("li:eq(0) .col-xs-4:eq(0) span:eq(1)").text(data.owner.login); 
                    $info_wrap.find("li:eq(0) .col-xs-4:eq(1) span:eq(1)").text(data.name); 
                    $info_wrap.find("li:eq(0) .col-xs-4:eq(2) span:eq(1)").text(data.stargazers_count); 
                    $info_wrap.find("li:eq(1) .col-xs-4:eq(0) span:eq(1)").text(data.watchers_count); 
                    $info_wrap.find("li:eq(1) .col-xs-4:eq(1) span:eq(1)").text(data.forks_count); 
                    $info_wrap.find("li:eq(1) .col-xs-4:eq(2) span:eq(1)").text(data.language); 
                    $info_wrap.find("li:eq(2) .col-xs-4:eq(0) span:eq(1)").text(data.html_url); 
                    $info_wrap.find("li:eq(2) .col-xs-4:eq(1) span:eq(1)").text(data.homepage); 
                    $info_wrap.find("li:eq(3) .col-xs-12 span:eq(1)").text(data.description); 

                    result.author = data.owner.login;
                    result.name = data.name;
                    result.starred = data.stargazers_count;
                    result.watchers = data.watchers_count;
                    result.forks = data.forks_count;
                    result.language = data.language;
                    result.github_url = data.html_url;
                    result.home = data.homepage;
                    result.description = data.description;

                    $target.html("拉取数据");
                    $step1.find(".ret").addClass("text-success").html("拉取成功！");
                    $step1.find(".save").removeClass("disabled");
                },
                error: function(){
                    $target.html("拉取数据");
                    $step1.find(".ret").addClass("text-danger").html("失败，地址错误或网络问题！")
                }
            });
        }
		return {
			run:run	
		}
	}();

    //main module 
    var MainModule = function(){
        function run (){
            AddProModule.run(); 
        }
        return {
            run: run 
        }
    }();
    MainModule.run();
});
