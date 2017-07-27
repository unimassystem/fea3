/*构建htmldom*/
function draw54(myChart,ckey,height,titles,x,y,width,div){

    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var datas=dataAll.data;
            var div1='<div class="draw54_gjt" style="width:'+width+'px;height:'+height+'px;overflow:hidden;"></div>';
            div.html(div1);
            var len=datas.length;
            var lens=datas[0].length;
            for (var i = 0; i < len; i++) {
              var h1=width/len;
              var div2='<div role="'+datas[i][lens-3]+'?'+datas[i][lens-2]+'?'+datas[i][lens-1]+'" style="width:'+h1+'px;height:'+height+'px;line-height:'+height+'px;text-align:center;">'+datas[i][0]+'</div>';
              $('.draw54_gjt').append(div2);
            };
            $('.draw54_gjt div').eq(0).addClass('draw54_change');
            $('.draw54_gjt div').css('float', 'left');
            $('.draw54_gjt div').click(function() {
              $('.draw54_gjt div').removeClass('draw54_change');
              $(this).addClass('draw54_change');
              var p=myChart;
            	var dataAll=$(this).attr('role');
            	var data=dataAll.split("?");
            	var target=data[2];
            	var dbdK=data[0];
            	var cs=data[1];
            	targetC(p,target,dbdK,cs);
            });
        }
    });
}
// function onclick_tc(tpk_tc){
//   $('.draw54_gjt div').removeClass('draw54_change');
//   $(tpk_tc).addClass('draw54_change');
// 	var p;
// 	var dataAll=$(tpk_tc).attr('role');
// 	var data=dataAll.split("?");
// 	var target=data[2];
// 	var dbdK=data[0];
// 	var cs=data[1];
// 	targetC(p,target,dbdK,cs);
// }
