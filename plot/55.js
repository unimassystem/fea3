/*构建htmldom*/
function draw55(myChart,ckey,height,titles,x,y,width,div){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
          var div1='<div class="dh" style="width:'+width+'px;height:'+height+'px;"><div class="move"></div></div>';
          div.html(div1);
        }
    });
}
