
var mongoose=require('../routes/util/MongoUtil');

var Articles = mongoose.Schema({
	art_id:Number,
	title:String,
	content:String,
	ycon:String,
	createTime:String,
	author:String,
	tags:Array
});

var Articles = mongoose.model('articles', Articles);

module.exports=Articles;