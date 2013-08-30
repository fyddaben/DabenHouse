var Controller=function(){

}
Controller.prototype.getData=function(){
	$.get();
}
Controller.prototype.navCss=function(){
	$("#prev").mouseover(function(){
		$(this).find(".icon").removeClass("gray").addClass("light");
	});
	$("#prev").mouseout(function(){
		$(this).find(".icon").removeClass("light").addClass("gray");
	});
	$("#next").mouseover(function(){
		$(this).find(".icon").removeClass("nextgray").addClass("nextlight");
	});
	$("#next").mouseout(function(){
		$(this).find(".icon").removeClass("nextlight").addClass("nextgray");
	});
}
Controller.prototype.navClick=function(){
	var _this=this;
	var nextFlag=1;
	$("#next").click(function(){

		var page=curPage+1;

		var param={curPage:page};
		var tagname=$("#tagname");
		if(tagname){
			var tagval=tagname.val();
			param={curPage:page,tag:tagval};
		}
		$.get("/article",param,function(datas){

			var code=datas.code;
			if(code==200){

				for(var i=0;i<datas.data.length;i++){

					if(i==0){
						datas.data[i].lineFlag=false;
					}else{
						datas.data[i].lineFlag=true;
					}
				} 

				nextFlag++;
				curPage=page;

				$("#prev").show();

				var tmpl = document.getElementById('J_templ').innerHTML;
				
				var doTtmpl = doT.template(tmpl);

				var conData=doTtmpl(datas);

				_this.flashNextPage(nextFlag,conData);

			}else{
				$("#next").hide();
				return false;
			}
		});
		return false;
	});
	var prevFlag=0;

	 $("#prev").click(function(){

	 	var page=curPage-1;
		if(page<1){
			$("#prev").hide();
			return false;
		}

		var param={curPage:page};

		$.get("/article",param,function(datas){

			var code=datas.code;

			if(code==200){
				for(var i=0;i<datas.data.length;i++){

					if(i==0){
						datas.data[i].lineFlag=false;
					}else{
						datas.data[i].lineFlag=true;
					}
				}

				prevFlag++;
				curPage=page;

				var tmpl = document.getElementById('J_templ').innerHTML;
				
				var doTtmpl = doT.template(tmpl);

				var conData=doTtmpl(datas);

				_this.flashPrevPage(prevFlag,conData);

			}
		});
		return false;
	 });
}
Controller.prototype.flashNextPage=function(curpage,data){

	var attr=$("#page1").css("display");
	var obj1=$("#page1");
	var obj2=$("#page2");
	if(attr==="block"){
		obj1=$("#page2");
		obj2=$("#page1");
	}
		obj1.find(".page").html(data);

		obj2.removeClass().addClass("lastpage").addClass("content");
		var callback1=function(){
				obj2.hide();
				obj1.removeClass().addClass("nextpage").addClass("content");
				obj1.show();
		}
		setTimeout(callback1,1000);
	
}
Controller.prototype.flashPrevPage=function(curpage,data){

	var attr=$("#page1").css("display");
	var obj1=$("#page1");
	var obj2=$("#page2");
	if(attr==="block"){
		obj1=$("#page2");
		obj2=$("#page1");
	}
		obj1.find(".page").html(data);
		obj2.removeClass().addClass("nextpage2").addClass("content");
		var callback1=function(){
				obj2.hide();
				obj1.removeClass().addClass("lastpage2").addClass("content");
				obj1.show();
		}
		setTimeout(callback1,1000);
}
Controller.prototype.loadAllTags=function(){

    var str=" {{~it:tag:i}}<a class=\"tag\" href=\"/tags/{{=tag.name}}/\">{{=tag.name}}({{=tag.count}})</a>{{~}}";

    $.get("/tags",function(data){

    	var doTtmpl = doT.template(str);

		var conData=doTtmpl(data);

		 
		$(".tag_cloud").append(conData);

    });
    
}

var curPage=1;
$(function(){
	
	$("#prev").hide();
	
	var control=new Controller();

	control.navCss();

	control.navClick();

	control.loadAllTags();

});