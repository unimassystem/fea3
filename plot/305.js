function draw305(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用305.js');
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
          // console.log(dataAll);
            var columns = dataAll.columns[0];
            var data = dataAll.data;
            var target=dataAll.columns[4];
            var kuan=dataAll.columns[5];
            // console.log(target);
            // console.log(columns);
            // console.log(data);
            var new305 = '<div id="box305'+timeDatas+'" class="box305" style="width:'+width+'px;">'+
                        '<a class="box305-title">'+columns+'</div>'+
                        '<div class="box305-main"></div>'+
                    '</div>';
            $(div).html(new305);
            for(var i=0;i<data.length;i++){
              if(target == 'target' || target == 'targett'){
                if(kuan == 'kuan'){
                  var main305 = '<div class="box305-content">'+
                  '<div class="box305-left">'+data[i][0]+'</div>'+
                  '<div class="box305-right" role="'+data[i][2]+'?'+data[i][3]+'?'+data[i][4]+'?'+data[i][5]+'?'+data[i][6]+'">'+data[i][1]+'</div>'+
                  '</div>';
                  $('.box305-right').click(function() {
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
                }else {
                  var main305 = '<div class="box305-content">'+
                  '<div class="box305-left">'+data[i][0]+'</div>'+
                  '<div class="box305-right" role="'+data[i][2]+'?'+data[i][3]+'?'+data[i][4]+'">'+data[i][1]+'</div>'+
                  '</div>';
                  $('.box305-right').click(function() {
                    var p=myChart;
                    var dataAll=$(this).attr('role');
                  	var data=dataAll.split("?");
                  	var target=data[2];
                  	var dbdK=data[0];
                  	var cs=data[1];
                  	targetC(p,target,dbdK,cs);
                  });
                }
              }else{
                var main305 = '<div class="box305-content">'+
                                    '<div class="box305-left">'+data[i][0]+'</div>'+
                                    '<div class="box305-right">'+data[i][1]+'</div>'+
                            '</div>';
              }
              $('#box305'+timeDatas).append(main305);
            }

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
// function mouseDown_305(tpk_tc){
// 	var p;
// 	var dataAll=$(tpk_tc).attr('role');
// 	var data=dataAll.split("?");
// 	var target=data[2];
// 	var dbdK=data[0];
// 	var cs=data[1];
// 	targetC(p,target,dbdK,cs);
// }
//
// function mouseDown_305s(tpk_tc){
//   var p;
//   var dataAll=$(tpk_tc).attr('role');
//   var data=dataAll.split("?");
//   var target=data[2];
//   var dbdK=data[0];
//   var cs=data[1];
//   var k=data[3];
//   var g=data[4];
//   targetC(p,target,dbdK,cs,k,g);
// }
