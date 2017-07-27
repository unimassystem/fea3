function draw304(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用304.js');
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var columns = dataAll.columns[0];
            var data = dataAll.data[0];
            // console.log(index);
            // console.log(data);
            var new304 = '<div class="box304" style="width:'+width+'px;">'+
                    '<div class="box304-title">'+columns+'</div>'+
                    '<div class="box304-main">'+
                        '<div id="box304'+timeDatas+'" class="box304-content"></div>'+
                        '<div class="box304-tiao">'+data[1]+'</div>'
                    '</div>'+
                '</div>';
            $(div).html(new304);
            var data1 = String(data[0]);
            var data2 = data1.split(":");
            if(data2[1] == '' || data2[1] == null){
              var datashuzu = data2[0].split("");
              for(var i=0;i<datashuzu.length;i++){
                  var box304_content = '<div>'+datashuzu[i][0]+'</div>';
                  $('#box304'+timeDatas).append(box304_content);
              }
            }else{
              var datashuzu = data2[1].split("");
              var box_span = '<span style="display:block;float:left;font-size:24px;padding:0 3px;">'+data2[0]+":"+'</span>'
              $('#box304'+timeDatas).prepend(box_span);
              for(var i=0;i<datashuzu.length;i++){
                  var box304_content = '<div>'+datashuzu[i][0]+'</div>';
                  $('#box304'+timeDatas).append(box304_content);
              }
            }


        },
        error:function(erroor){
            console.log(error);
        }
    });

}
