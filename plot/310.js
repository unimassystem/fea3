/*构建htmldom*/
function draw310(myChart,ckey,height,titles,x,y,width,div){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var data=dataAll.data;
            for (var i = 0; i < data.length; i++) {
              var txt_div='<div id="tsk_info" style="z-index:2;overflow:hidden;"><div class="tsk" onmousemove="show_tsk_309(this)" onmouseout="hide_tsk_309(this)" style="width:19px;height:21px;float:left;margin-right:5px;overflow:hidden;cursor:pointer;"></div><div class="tsk_xs" style="float:left;height:100%;border:2px solid #0066ff;"><div class="tsk_main" style="width:100%;background:rgba(4,55,85,0.8);color:#00fff6;font-size:14px;">'+data[i]+'</div></div></div>';
              div.html(txt_div);
              $(".tsk_xs").hide();
              div.find("#tsk_info").css('width',width);
              var w_tsk=width-19-5-4;
              div.find("#tsk_info .tsk_xs").css('width',w_tsk);
              div.find("#tsk_info").css('height',height);
              var h_xsk=height-4;
              div.find("#tsk_info .tsk_main").css('height',h_xsk);
            }

        }
    });
}
function show_tsk_309(this_tsk){
  $(this_tsk).next(".tsk_xs").show()
};
function hide_tsk_309(this_tsk){
  $(this_tsk).next(".tsk_xs").hide()
};
