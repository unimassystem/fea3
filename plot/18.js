/*构建dom*/

function draw18(myChart,ckey,height,titles,x,y,width,div){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var data=dataAll.data;
            var cul=dataAll.columns;
            var lens=cul.length;
            if(cul.indexOf('target')!=-1){
              for (var i = 0; i < data.length; i++) {
                if(cul.indexOf('width')!=-1){
                  var m1=cul.indexOf('width');
                  var m2=cul.indexOf('height');
                  var txt_div='<div id="txt_info" role="'+data[0][lens-3]+'?'+data[0][lens-2]+'?'+data[0][lens-1]+'?'+data[0][m1]+'?'+data[0][m2]+'">'+data[i][0]+'</div>';
                }else{
                  var txt_div='<div id="txt_info" role="'+data[0][lens-3]+'?'+data[0][lens-2]+'?'+data[0][lens-1]+'">'+data[i][0]+'</div>';
                }
	            }
            }else{
              for (var i = 0; i < data.length; i++) {
	              var txt_div='<div id="txt_info">'+data[i]+'</div>';
	            }
            }


            div.html(txt_div);
            div.find("#txt_info").css('width',width);
            div.find("#txt_info").css('overflow','hidden');
            div.find("#txt_info img").css('display','block');
            div.find("#txt_info img").css('width',width);
            div.find("#txt_info img").css('height','auto');
            div.find("#txt_info").css('height',height);
            // div.find("#txt_info").css('z-index', '-1');
            // div.css('z-index', '-2');
        }

    });

}

function mouseDown_tc(tpk_tc){
	var p;
	var dataAll=$(tpk_tc).attr('role');
	var data=dataAll.split("?");
	var target=data[2];
	var dbdK=data[0];
	var cs=data[1];
	targetC(p,target,dbdK,cs);
}
function mouseDown_tc18(tpk_tc){
  var p;
  var dataAll=$(tpk_tc).attr('role');
  var data=dataAll.split("?");
  var target=data[2];
  var dbdK=data[0];
  var cs=data[1];
  var k=data[3];
  var g=data[4];
  targetC(p,target,dbdK,cs,k,g);
}
