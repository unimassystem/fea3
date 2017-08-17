function draw69(myChart,ckey,height,titles,x,y,width,div){
  var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var cul = dataAll.columns;
            var data = dataAll.data;
            var ind=dataAll.index;
            var lens=cul.length;
            $(div).children('div').remove();
            for (var i = 0; i < data.length; i++) {
              var main=ind[i]+' '+data[i][0];
              var id='box69'+timeDatas+i;
              if(cul.indexOf('target')!=-1){
                if(cul.indexOf('width')!=-1){
                  var m1=cul.indexOf('width');
                  var m2=cul.indexOf('height');
                  $(div).append('<div class="box69" id="'+id+'" onclick="click69(this)" data-id="'+data[i][m1]+'?'+data[i][m2]+'" role="'+data[i][lens-3]+'?'+data[i][lens-2]+'?'+data[i][lens-1]+'" style="width:'+width+'px;">'+main+'</div><br />');
                }else{
                  $(div).append('<div class="box69" id="'+id+'" onclick="click69(this)" role="'+data[i][lens-3]+'?'+data[i][lens-2]+'?'+data[i][lens-1]+'" style="width:'+width+'px;">'+main+'</div><br />');
                }
              }else{
                $(div).append('<div class="box69" id="'+id+'" style="width:'+width+'px;">'+main+'</div><br />');
              }
              if(cul.indexOf('fontSize')!=-1){
                var f=cul.indexOf('fontSize');
                $('#'+id).css('font-size', data[i][f]+'px');
              }
              if(cul.indexOf('color')!=-1){
                var c=cul.indexOf('color');
                $('#'+id).css('color', data[i][c]);
              }
            }
        },
        error:function(erroor){
            console.log(error);
        }
    });
}
function click69(tpk_tc){
  var p;
	var dataAll=$(tpk_tc).attr('role');
	var data=dataAll.split("?");
	var target=data[2];
	var dbdK=data[0];
  var cs=data[1];
  if($(tpk_tc).attr('data-id')!=null){
    var all=$(tpk_tc).attr('data-id');
    var all1=all.split('?');
    var k=all1[0];
    var g=all1[1];
    targetC(p,target,dbdK,cs,k,g);
  }else{
    targetC(p,target,dbdK,cs);
  }
}
