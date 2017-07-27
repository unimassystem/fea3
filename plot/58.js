function draw58(myChart,ckey,height,titles,x,y,width,div,border,zindex,legends){
    var timeDatas = new Date().getTime();
    // console.log(timeDatas);
    var run_body=$('<div id="box_run58" class="box_runone">'+
                    '<div id="title1'+timeDatas+'" style="font-size:16px;text-align:center;line-height:32px;"></div>'+
                    '<div  class="table-title'+timeDatas+' table-title"><P></P></div>'+
                    '<div class="table-all">'+
                        '<div id="colee" >'+
                            '<div id="colee1'+timeDatas+'"></div>'+
                            '<div id="colee2'+timeDatas+'"></div>'+
                        '</div>'+
                    '</div>'+
                '</div>');

    $(div).css('overflow','hidden');
    div.html(run_body);
    $("#title1"+timeDatas).text(titles);
    $(".table-all,.table-title"+timeDatas).css("width",width);
    var heighT=parseInt(height)-80;
    div.find("#colee").css("height",height);
  //  console.info($("#colee").size());
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            data=dataAll.data;
            var index=dataAll.index;
            var myCol=dataAll.columns;//获取列名
            var chushu=parseInt(myCol.length);
            var liWidth=Math.floor(width/chushu)-15;
          // console.info(liWidth);
            if (index[0]==-31415926) {
                for (var i = 0; i < myCol.length; i++) {
                    var span='<span style="width:'+parseInt(data[0][i]-15)+'px;">'+myCol[i]+'</span>';
                    var p=$(".table-title"+timeDatas+" p");
                    p.append(span);
                }
                for (var i = 1; i < data.length; i++) {
                    var p=$('<p></p>');
                    var tdC=data[i];
                    for (var j = 0; j < tdC.length; j++) {
                        var span='<span style="width:'+parseInt(data[0][j]-15)+'px;">'+tdC[j]+'</span>';
                        p.append(span);
                    }
                    $("#colee1"+timeDatas).append(p);
                }
            }else{
                for (var i = 0; i < myCol.length; i++) {
                    var span='<span style="width:'+liWidth+'px;">'+myCol[i]+'</span>';
                    var p=$(".table-title"+timeDatas+" p");
                    p.append(span);
                }
                for (var i = 0; i < data.length; i++) {
                    var p=$('<p></p>');
                    var tdC=data[i];
                    for (var j = 0; j < tdC.length; j++) {
                        var span='<span style="width:'+liWidth+'px;">'+tdC[j]+'</span>';
                        p.append(span);
                    }
                    $("#colee1"+timeDatas).append(p);
                   // $(run_body).find("#colee2").append(p);
                }
            }
            div.find('#colee').kxbdMarquee({
                direction:'up',
                isEqual:true
            });
        }
    });

}





/*var stopDefault=function(e){
    if ( e && e.preventDefault ) {
        e.preventDefault();
    }
    else{
        window.event.returnValue = false;
    }
};*/
/*$("body").on("click","a",function(e){
    stopDefault(e);
    var t=$(this).attr("targett");
    var h=$(this).attr("href");
    var p =   window.frameElement && window.frameElement.name || '';
    window.parent.targetT(t,h,p);
    return false;
});*/
