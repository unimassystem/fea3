/*构建htmldom*/
function draw313(myChart,ckey,height,titles,x,y,width,div){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var data=dataAll.data;
            var kuan=dataAll.columns[3];
            // var title=dataAll.columns;
            // console.log(data);
            // console.log(title);
            // for (var i = 0; i < data.length; i++) {
            if(kuan == 'width'){
              var txt_div='<div id="tsk_info" style="z-index:2;overflow:hidden;"><div class="tsk313" role="'+data[0][0]+'?'+data[0][1]+'?'+data[0][2]+'?'+data[0][3]+'?'+data[0][4]+'" onmousedown="mouseDown_313s(this)" style="width:100%;height:100%;overflow:hidden;cursor:pointer;"></div></div>';
              $('.tsk313').click(function() {
                /* Act on the event */
                var p=myChart;
              	var dataAll=$(this).attr('role');
              	var data=dataAll.split("?");
              	var target=data[2];
              	var dbdK=data[0];
              	var cs=data[1];
                var k=data[3];
                var g=data[4];
              	targetC(p,target,dbdK,cs,k,g);
              });
            }else{
              var txt_div='<div id="tsk_info" style="z-index:2;overflow:hidden;"><div class="tsk313" role="'+data[0][0]+'?'+data[0][1]+'?'+data[0][2]+'" onmousedown="mouseDown_313(this)" style="width:100%;height:100%;overflow:hidden;cursor:pointer;"></div></div>';
              $('.tsk313').click(function() {
                /* Act on the event */
                var p=myChart;
                var dataAll=$(tpk_tc).attr('role');
              	var data=dataAll.split("?");
              	var target=data[2];
              	var dbdK=data[0];
              	var cs=data[1];
              	targetC(p,target,dbdK,cs);
              });
            }
              div.html(txt_div);
              div.find("#tsk_info").css('width',width);
              div.find("#tsk_info").css('height',height);
            // }

        }
    });
}
   /* src="../images/test3and4_IM_icon_.png"
*/

// function mouseDown_313(tpk_tc){
// 	var p;
// 	var dataAll=$(tpk_tc).attr('role');
// 	var data=dataAll.split("?");
// 	var target=data[2];
// 	var dbdK=data[0];
// 	var cs=data[1];
// 	targetC(p,target,dbdK,cs);
// }
//
// function mouseDown_313s(tpk_tc){
//
// 	var p;
// 	var dataAll=$(tpk_tc).attr('role');
// 	var data=dataAll.split("?");
// 	var target=data[2];
// 	var dbdK=data[0];
// 	var cs=data[1];
//   var k=data[3];
//   var g=data[4];
// 	targetC(p,target,dbdK,cs,k,g);
// }
