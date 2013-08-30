
var Cons=require("./util/Constant");
var markdown = require( "markdown" ).markdown;
var Articles=require("../model/article");
var Pk=require("../model/Pk");
var Tags=require("../model/tags");
var pygmentize = require('pygmentize-bundled');
var marked = require("marked");
/*
 * GET home page.
 */
 /*
	定义分页查询方法
 */
var queryArt=function(sql,start,length,sortSql,callback){

	Articles.find(sql).skip(start).limit(length).sort(sortSql).exec(function(err,data){

		callback(data);	

	});
}

exports.index = function(req, res){
  var callback=function(data){
 	var flag=0; 	
  	for(var i in  data){
  		var obj=data[i];
  		if(flag==0){
  			obj.lineFlag=false;
  		}else{
  			obj.lineFlag=true;
  		}
  		flag++;
  	}
  	res.render('index', { arts: data,tag:null});	
  }
  var sql={};
  var start=0;
  var length=Cons.pageLength;
  var sortSql={createTime:-1};

  queryArt(sql,start,length,sortSql,callback);
  
};
exports.queryBytag=function(req,res){

	var name=req.params.tagname;
	
   
	var length=Cons.pageLength;

	var start=0;

	
  	var sql={tags:name};
	
	var sortSql={createTime:-1};

	var callback=function(data){
 		
 		res.render('index', { arts: data,tag:name});	

  	}

 
  

  queryArt(sql,start,length,sortSql,callback);

}

exports.staticPage=function(req,res){
	
	var name=req.params.name;
	res.render(name);

}



exports.query=function(req,res){
	var callback=function(data){
		var flag=0; 	
	  	for(var i in  data){
	  		var ob=data[i];
	  		if(flag==0){
	  			ob.lineFlag=false;
	  		}else{
	  			ob.lineFlag=true;
	  		}
	  		flag++;
	  	}
		var obj={
			code:200,
			data:data
		};
		if(data.length==0){
			obj.code=404;
		}

		res.send(obj);
	}
	//curPage>=1
	var curPage=req.query.curPage;

	var tagname=req.query.tag;



	var length=Cons.pageLength;

	var start=(parseInt(curPage)-1)*length;
  	
  	var sortSql={createTime:-1};
	
	var sql={};
  	
  	if(tagname){
  		sql={tags:tagname};
  	}

  	queryArt(sql,start,length,sortSql,callback);
  
};
exports.queryAllTag=function(req,res){

	Tags.find().exec(function(err,tags){

		if(err)console.log(err);

		res.send(tags);
	
	});


}
exports.queryByArtid=function(req,res){

	var id=req.params.artid;

	var sql={
    	art_id:id
    }
    Articles.findOne(sql,function(err,article){
    	if(err)console.log(err);

    	res.render("content",{art:article});
    });

}

/*
    后台文章编辑逻辑
*/
exports.blog_back=function(req,res){
	res.render('back');
}
exports.articleAdd=function(req,res){
    var title=req.body.title;
    var content= req.body.content;
    var tag=req.body.tags;
 	var tags=[];
 	if(tag.indexOf(",")!=-1){
 		tags=tag.split(",");
 	}else{
 		tags.push(tag);
 	}
 	var contents="";

	var Concallback=function(ok,str){
		contents=str;
		var callback=function(id){
			var sql={
				art_id:id,
				title:title,
				ycon:content,
				content:contents,
				createTime:Cons.currentDate(),
				author:Cons.author,
				tags:tags
			};
			var Article= new Articles(sql);
			Article.save(function(err){
			    if(err)console.log(err);
			    console.log("insert Articles success");
			});
			for(var i=0;i<tags.length;i++){
				var tagg=tags[i];
				Tags.findOneAndUpdate({ name:tagg},{$inc:{count:1}},{new:true, upsert:true},function(err,doc){
					if(err)
					console.log(err);
					
				});	
			}
		};
		 Pk("articles",callback);
	}
	var options={
	  gfm: true,
	  highlight: function (code, lang, callback) {
	    pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
	      if (err) return callback(err);
	      callback(null,result.toString());
	    });
	  },
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: true,
	  smartLists: true,
	  smartypants: false,
	  langPrefix: 'lang-'
	};
	marked(content,options,Concallback);
 	
 	

    res.render("back");
}
exports.backArtQuery=function(req,res){

    var id=req.params.artid;

    var sql={
    	art_id:id
    }
    Articles.findOne(sql,function(err,article){
    	if(err)console.log(err);
    	var arr=article.tags;
    	var line="";
    	var flag=0;

    	for(var i=0;i<arr.length;i++){
    		if(flag==0){
    			line=arr[i];
    		}else{
    			line=line+","+arr[i];
    		}
    		flag++;
    	}
    	article.ytag=line;
    	
    	res.render("back_update",{art:article});
    });


}
exports.articleUpdate=function(req,res){
	
	var title=req.body.title;
	var content=req.body.content;

	var tag=req.body.tags;
	var tags=[];
 	if(tag.indexOf(",")!=-1){
 		tags=tag.split(",");
 	}else{
 		tags.push(tag);
 	}
	var artid=req.body.artid;
	var contents=markdown.toHTML(content);	
	var id={
		art_id:artid
	};
	var obj={
		art_id:artid,
		title:title,
		ycon:content,
		content:contents,
		createTime:Cons.currentDate(),
		author:Cons.author,
		tags:tags
	};

	Articles.update(id,{$set:obj},function(err,article){

		if(err) console.log(err);
		res.send("修改成功");

	});

	
}



/*
  上传插件
*/
exports.upload = function(req, res){


     //var name=req.body.userid;
      
     var fileDesc=req.files;
    
     var imgname=fileDesc.Filedata.name;
     
     var path=fileDesc.Filedata.path;
     
     var index=path.lastIndexOf("/");

     var logPath=Cons.staticFile+"images/"+path.substring(index+1);

     res.send(logPath);
};