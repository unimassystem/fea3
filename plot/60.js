function draw60(myChart,ckey,height,titles,x,y,width,div,border,zindex,legends){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
          var data=dataAll.data[0];
          if(data[0].indexOf('-') =='0'){
            var div2='<div class="draw60_f" style="width:'+width+'px;height:'+height+'px; line-height:'+height+'px; font-size:'+height+'px;"><img src="../images/plug_img/Arrow_icon_f.png">'+data[0]+'('+data[1]+')</div>';
          }else{
            var div2='<div class="draw60_z" style="width:'+width+'px;height:'+height+'px; line-height:'+height+'px; font-size:'+height+'px;"><img src="../images/plug_img/Arrow_icon_z.png">+'+data[0]+'('+data[1]+')</div>';
          }
          div.html(div2);
        }
    });

}
