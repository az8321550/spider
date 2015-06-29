var myUtil = require('./util/myUtil');
var $ = require('cheerio');
var schedule = require('node-schedule');

/*定时任务*/
var rule = new schedule.RecurrenceRule();
rule.minute = 0;
var j = schedule.scheduleJob(rule, function(){
    console.log('The answer to life, the universe, and everything!');
});

/*19个种类*/
var needResult=[
    '重庆时时彩',
    '黑龙江时时彩',
    '江西时时彩',
    '时时乐',
    '山东11运',
    '新疆时时彩',
    '江西11选5',
    '广东11选5',
    '北京快乐彩',
    '重庆11选5',
    '福彩3D',
    '体彩P3',
    '台湾时时彩',
    '极速时时彩',
    '台湾11选5',
    '天津时时彩',
    '澳门时时彩',
    '澳门11选5',
    '香港时时彩'
]


var go = function(url){
    var begin=new Date().getTime();
    myUtil.get(url,function(content,status){
        console.log("status:="+status);
        var result=[]
        var body=$(content);


        var tempEle=body.find("tr>td>a[title$=开奖结果]");

        for(var i=0;i<needResult.length;i++){
            //console.log(tempEle.find(":contains("+needResult[i]+")").text());
            tempEle.each(function(){
                if($(this).text()==needResult[i]){
                    result.push(getDetail(body,$(this)));
                }
            });
        }

        /*tempEle.each(function(){
            result.push(getDetail(body,$(this)));
        });*/

        console.log(result);
        console.log(new Date().getTime()-begin);
    });
};

var getDetail=function(body,tempEle){
    var tempArr=[],
        parent=tempEle.parent().parent();
    parent.find(".s_ball_red").each(function(){
        if(!$(this).text()){
            return false;
        }
        tempArr.push($(this).text())
    })
    return {
        name:tempEle.text(),
        value:tempArr.join(","),
        version:parent.find("td").eq(1).text()
    }
}

go("http://www.touzhuzhan.com/bull/")
