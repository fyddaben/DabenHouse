var Controller=function(){}

Controller.prototype.loadAllTags=function(){

    var str=" {{~it:tag:i}}<a class=\"tag\" href=\"/tags/{{=tag.name}}/\">{{=tag.name}}({{=tag.count}})</a>{{~}}";

    $.get("/tags",function(data){

    	var doTtmpl = doT.template(str);

		var conData=doTtmpl(data);

		 
		$(".tag_cloud").append(conData);

    });
    
};

Controller.prototype.scrollbyComment=function(){

	var url=location.href;

	if(url.indexOf("#comments")!=-1){
		
		var top=$(".ds-thread").offset().top;
	
		var obj = (document.all || jQuery.browser.mozilla)? "html":document.body;
	
		$(obj).animate({scrollTop:top},500);
	
	}
	
}
$(function(){
	var control=new Controller();

	control.loadAllTags();

	control.scrollbyComment();

});