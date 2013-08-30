var mongoose=require('../routes/util/MongoUtil');
 
var mainKey = mongoose.Schema({
    _id: String,
    seq:Number
});

var Pk = mongoose.model('mainKeys', mainKey);
 
var AutoIdUtil=function(tablename,callback){
 
    Pk.findOneAndUpdate({ _id:tablename},{$inc:{seq:1}},{new:true, upsert:true},function(err,doc){
         if(err)
         console.log(err);
 
         if(callback){
             callback(doc.seq);
         }
 
     });
}
 
module.exports=AutoIdUtil;