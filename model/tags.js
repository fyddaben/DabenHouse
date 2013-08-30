var mongoose=require('../routes/util/MongoUtil');

var Tags = mongoose.Schema({
	
	name:String,
	count:Number

});

var Tags = mongoose.model('tags', Tags);

module.exports=Tags;

