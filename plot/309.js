/*构建htmldom*/
function draw309(myChart,ckey,height,titles,x,y,width,div){
    // var txt_div='<div id="tsk_info">\
    //             <ul class="list-unstyled" ></ul>\
    //         </div>';
    // div.html(txt_div);
    // div.find("#tsk_info").css('width',width);
    // div.find("#tsk_info").css('height',height);
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var data=dataAll.data;
            var title=dataAll.columns;
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
              var txt_div='<div id="tsk_info" style="z-index:2;overflow:hidden;"><div class="tsk" onmousemove="show_tsk_309(this)" onmouseout="hide_tsk_309(this)" style="width:19px;height:21px;float:left;margin-right:5px;overflow:hidden;cursor:pointer;"><img src="../images/deng.png" style="width:100%;height:auto;display:block;"></div><div class="tsk_xs" style="float:left;height:100%;border-left:2px solid #0066ff;border-right:2px solid #0066ff;"><div style="height:25px;width:100%;background:#475a7b;"><span style="color:#fff;font-size:16px;line-height:25px;display:block;margin-left:5px;">'+title[i]+'</span></div><div class="tsk_main" style="width:100%;background:rgba(4,55,85,0.8);color:#00fff6;font-size:14px;">'+data[i]+'</div></div></div>';
              div.html(txt_div);
              $(".tsk_xs").hide();
              div.find("#tsk_info").css('width',width);
              var w_tsk=width-19-5-4;
              div.find("#tsk_info .tsk_xs").css('width',w_tsk);
              div.find("#tsk_info").css('height',height);
              var h_tsk_main=height-25;
              div.find("#tsk_info .tsk_main").css('height',h_tsk_main);
            }

        }
    });
}
   /* src="../images/test3and4_IM_icon_.png"
*/
function show_tsk_309(this_tsk){
  $(this_tsk).next(".tsk_xs").show()
};
function hide_tsk_309(this_tsk){
  $(this_tsk).next(".tsk_xs").hide()
};
