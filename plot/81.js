function draw81(myChart,ckey,height,titles,x,y,width,div){
  var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
          var tl=dataAll.data[0];
          var tr=tl[1].split(',');
          var lm=dataAll.columns;
         var m ='<div class="wb_81">'+
          '<span class="new_icon"></span>'+
          '<p class="wb_81_1p" id="wb_81_'+timeDatas+'"><span class="green_dot"></span><marquee class="wb_81gun"><span class="wb_81_tl">'+tl[0]+'</span></marquee></p>'+

          '<ul class="wb_81_tb">'+
            '<li>'+
              '<p><span>'+lm[2]+'</span><span>'+tl[2]+'</span></p>'+
              '<p><span>'+lm[3]+'</span><span>'+tl[3]+'</span></p>'+
            '</li>'+
            '<li>'+
              '<p><span>'+lm[4]+'</span><span>'+tl[4]+'</span></p>'+
              '<p><span>'+lm[5]+'</span><span>'+tl[5]+'</span></p>'+
            '</li>'+
          '</ul>'+
        '</div>'
        div.html(m);
        $('#wb_81_'+timeDatas).after('<p class="wb_81_label" id="wb_81_label'+timeDatas+'"></p>')
        for(var i=0;i<tr.length;i++){
          $('#wb_81_label'+timeDatas).append('<span>'+tr[i]+'</span>')
          }
        },
        error:function(erroor){
            console.log(error);
        }
    });
}
