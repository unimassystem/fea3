function draw59(myChart,ckey,height,titles,x,y,width,div,border,zindex,legends){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
          var div2='<div class="width:'+width+'px;height:'+height+'px;"></div>';
          div.html(div2);
        }
    });

}
