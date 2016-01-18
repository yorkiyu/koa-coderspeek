define(function(require,exports,module){
	var $ = require('jquery');
	var bootstrap = require('/lib/bootstrap/3.3.6/js/bootstrap.js');
	var lazyload = require('/src/js/common/lazyload.js');
	lazyload.push($(".img-box"));
	lazyload.emit();

    var $content_panel = $(".content-panel");
    //event agent
    $content_panel.bind("click",function(e){
        var target = e.target || e.srcElement,
            $target = $(target);
        if($target.hasClass('like-wrap')){
            LikeModule.clickAction(e,$target); 
        }else {
        
        }   
    });

    //like module
    var LikeModule = function(){ 
        function clickAction(e,$target){
            e.stopPropagation();
            $target.removeClass('icon-thumbs-up');
            (function($target){
                var data_count = parseInt($target.attr('data-count'))+1,
                    timer;
                var temp_count = data_count - 7;
                timer = setInterval(function(){
                    $target.text(++temp_count);
                    if(temp_count >= data_count){
                        clearInterval(timer); 
                        setTimeout(function(){
                            $target.text('')
                            .addClass('icon-thumbs-up');
                        },1200); 
                    } 
                },1000/60);
            })($target);
            addService($target.attr('data-id'));
        }
        function addService(person_id){
            $.ajax({
                type: 'get',
                url: '/api/daniel/person/addLike?perid='+person_id,
                dataType: 'json',
                success: function(data){
                     
                },
                error: function(data){
                
                }
            }); 
        } 
        return {
            clickAction: clickAction 
        }
    }();
});
