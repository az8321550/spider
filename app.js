var myUtil = require('./util/myUtil');
var $ = require('cheerio');



var go = function(url){
    var begin=new Date().getTime();
    myUtil.get(url,function(content,status){
        console.log("status:="+status);
        var result=[]
        var body=$(content);

        var tempEle=body.find("tr>td>a[title$=开奖结果]");
        tempEle.each(function(){
            result.push(getDetail(body,$(this)));
        });

        console.log(result);
        console.log(new Date().getTime()-begin)
    });
};

var getDetail=function(body,tempEle){
    var tempArr=[]
    tempEle.parent().parent().find(".s_ball_red").each(function(){
        if(!$(this).text()){
            return false;
        }
        tempArr.push($(this).text())
    })
    return {
        name:tempEle.text(),
        value:tempArr.join(",")
    }
}

go("http://www.touzhuzhan.com/bull/")
