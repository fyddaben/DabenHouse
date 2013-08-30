
var Constant=function(){}
 
function add_zero(temp)
{
    if(temp<10) return "0"+temp;
    else return temp;
}
 
Constant.prototype={
        DomainUrl:"http://127.0.0.1",
        Db_path:'127.0.0.1',
       // Db_path:'192.168.1.20',
        Db_port:'27017',
        //Db_base:'zen',
        Db_base:'blog',
        username:'',
        pwd:'' ,
        author:"daben",
        staticFile:"http://page.zgenk.com/",
        pageLength:5,//每个页面的数据数量
        currentDate:function(){
 
            var d=new Date();
            var years = d.getYear()+1900;
            var month = add_zero(d.getMonth()+1);
            var days = add_zero(d.getDate());
            var hours = add_zero(d.getHours());
            var minutes = add_zero(d.getMinutes());
            var seconds=add_zero(d.getSeconds());
            var ndate = years+"-"+month+"-"+days+" "+hours+":"+minutes+":"+seconds;
            return ndate;
 
        },
        removeDou:function(summary){//去掉双引号
            if(summary.indexOf("\"")!=-1){
                do{
                    summary=summary.replace("\"","'");
                }while(summary.indexOf("\"")!=-1)
            }
            return summary;
        },
        removeNull:function(summary){//去掉空格
            summary=summary.replace(/\s+/g,'');;
            return summary;
        }
}
var constant=new Constant();
 
module.exports=constant;