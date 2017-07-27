/*构建htmldom*/
function draw302(myChart,ckey,height,titles,x,y,width,div){
    // var txt_div='<div id="txt_info">\
    //             <ul class="list-unstyled" ></ul>\
    //         </div>';
    // div.html(txt_div);
    // div.find("#txt_info").css('width',width);
    // div.find("#txt_info").css('height',height);
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var data=dataAll.data;
            var datas='';
            for (var i = 0; i < data.length; i++) {
              datas+=data[i];
              var txt_div='<div id="txt_info" style="z-index:2;">'+datas+'</div>';
            }
            div.html(txt_div);
            div.find("#txt_info").css('width',width);
            div.find("#txt_info").css('height',height);
        }
    });
}
   /* src="../images/test3and4_IM_icon_.png"
*/
