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
            isSaving = false,
			stepCount = 1,
			stepTotal = $(".step-nav > div[data-name]").length;
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
                }else if($target.hasClass("next")){
					nextHandler($target);				
                }else if($target.hasClass("prev")){
					prevHandler($target);				
				}
            });
			$github_input.bind("keyup",function(e){
				$content.find(".step"+stepCount+" .next").addClass("disabled");
			});
		}
		function nextHandler($target){
			if($target.hasClass("disabled")){
				return;	
			}
			var $curStep = $content.find(".step"+stepCount),
				$destStep = $content.find(".step"+(stepCount+1));
			$curStep.removeClass("show").addClass("hide");
			$destStep.removeClass("hide").addClass("show");
			$(".step-nav div[data-name]").removeClass("active-color");
			$(".step-nav div[data-name=step"+(stepCount+1)+"]").addClass("active-color");

			stepCount++;

			if(stepCount == stepTotal){
				var html = '<h3 class="name">'+result.name+'</h3>'+
					'<small >'+result.github_url+'</small>'+
					'<div class="desc">'+result.description+'</div>'; 
				$content.find(".result").html(html);
			}
		}
		function prevHandler($target){
			if($target.hasClass("disabled")){
				return;	
			}
			var $curStep = $content.find(".step"+stepCount),
				$destStep = $content.find(".step"+(stepCount-1));
			$curStep.removeClass("show").addClass("hide");
			$destStep.removeClass("hide").addClass("show");
			$(".step-nav div[data-name]").removeClass("active-color");
			$(".step-nav div[data-name=step"+(stepCount-1)+"]").addClass("active-color");

			stepCount--;
	
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
			result.content = EditorModule.getProDesc();
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
                        }else{
                            $target.siblings(".message").addClass("text-danger").html("操作失败，请重试！"); 
                        }
                    }else {
                        $target.siblings(".message").addClass("text-success").html('保存成功，<a href="/opensrc/notelist/'+ret.data.id+'">点击查看</a>');
                        $target.addClass("disabled");
						$content.find(".step3 .prev").addClass("disabled");
                    }
                    isSaving = false;
                    $target.html("创建");
                },
                error: function(ret){
                    isSaving = false;
                    $target.html("创建");
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
            resetInfo();
            $step1.find(".ret").html("").removeClass("text-danger").removeClass("text-success");
            $step1.find(".save").addClass("disabled");
            $step1.find(".message").remove("text-danger").removeClass("text-success").html("");
            $target.html(constants.load_img);
            $.ajax({
                type: "get",
                url: "/api/opensrc/project/gitpro?giturl="+encodeURIComponent(url),
                dataType: "json",
                success: function(ret){
					if(!ret.status){
						if(ret.count == 0){
							$step1.find(".ret").addClass("text-danger").html("拉取失败，地址错误！");
						}else if(ret.count == 4){
							$step1.find(".ret").addClass("text-danger").html('该项目已被创建，<a style="color: #286090;" href="/opensrc/notelist/'+ret.data._id+'">点击查看！</a>');
						}else if(ret.count == 6){
							$step1.find(".ret").addClass("text-danger").html("拉取失败，地址错误或网络出错！");
						}else {
							$step1.find(".ret").addClass("text-danger").html("拉取失败，请重试！");
						}
					}else {
						if(!ret.data.id){
							$target.html("拉取数据");
							$step1.find(".ret").addClass("text-danger").html("拉取失败,地址错误！")
							return; 
						}
						$info_wrap.find("li:eq(0) .col-xs-4:eq(0) span:eq(1)").text(ret.data.owner.login); 
						$info_wrap.find("li:eq(0) .col-xs-4:eq(1) span:eq(1)").text(ret.data.name); 
						$info_wrap.find("li:eq(0) .col-xs-4:eq(2) span:eq(1)").text(ret.data.stargazers_count); 
						$info_wrap.find("li:eq(1) .col-xs-4:eq(0) span:eq(1)").text(ret.data.watchers_count); 
						$info_wrap.find("li:eq(1) .col-xs-4:eq(1) span:eq(1)").text(ret.data.forks_count); 
						$info_wrap.find("li:eq(1) .col-xs-4:eq(2) span:eq(1)").text(ret.data.language); 
						$info_wrap.find("li:eq(2) .col-xs-4:eq(0) span:eq(1)").text(ret.data.html_url); 
						$info_wrap.find("li:eq(2) .col-xs-4:eq(1) span:eq(1)").text(ret.data.homepage); 
						$info_wrap.find("li:eq(3) .col-xs-12 span:eq(1)").text(ret.data.description); 

						result.author = ret.data.owner.login;
						result.name = ret.data.name;
						result.starred = ret.data.stargazers_count;
						result.watchers = ret.data.watchers_count;
						result.forks = ret.data.forks_count;
						result.language = ret.data.language;
						result.github_url = ret.data.html_url;
						result.home = ret.data.homepage;
						result.description = ret.data.description;

						$step1.find(".ret").addClass("text-success").html("拉取成功！");

						$step1.find(".next").removeClass("disabled");
					}
					$target.html("拉取数据");
                },
                error: function(){
                    $target.html("拉取数据");
                    $step1.find(".ret").addClass("text-danger").html("失败，地址错误或网络问题！")
                }
            });
        }
		function getResult(){
			return result;	
		}
		return {
			run:run,
			getResult: getResult
		}
	}();
	
	//editro module 
	var EditorModule = function(){
		var Editor = require("/src/js/common/editor.js"),
			editor = new Editor({
				id: "markdown",
				upload_url: "/api/upload/images?type=opensrc"
			});
		function run(){
			createEditor();
			//redefine changehandler
			editor.changeHandler = function(){
				if(!editor.value()){
					$content.find(".step2 .next").addClass("disabled");
				}else {
					$content.find(".step2 .next").removeClass("disabled");
				}
			}
		}
		function createEditor(){
            editor.createEditor(function(simplemde){
				
            });	
        }
		function getProDesc(){
			return editor.value();	
		}
		return {
			run: run,
			createEditor: createEditor,
			getProDesc: getProDesc
		}
	}();
    //main module 
    var MainModule = function(){
        function run (){
            AddProModule.run(); 
			EditorModule.run();
        }
        return {
            run: run 
        }
    }();
    MainModule.run();
});
