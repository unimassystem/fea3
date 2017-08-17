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
            var col=dataAll.columns;
            var new304 = '<div class="box304" style="width:'+width+'px;">'+
                    '<div class="box304-title" name="304_'+timeDatas+'">'+columns+'</div>'+
                    '<div class="box304-main">'+
                        '<div id="box304'+timeDatas+'" class="box304-content"></div>'+
                        '<div class="box304-tiao" name="3041_'+timeDatas+'">'+data[1]+'</div>'
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
            var ma_304='304_'+timeDatas;
            var ma_3041='3041_'+timeDatas;
            if(col.indexOf('fontSize')!=-1){
              var n1=col.indexOf('fontSize');
              var m1=data[n1];
              if(m1.indexOf(';')!=-1){
                var m2=m1.split(';');
              }else{
                var m2=[m1,m1,m1];
              }
              $('#box304'+timeDatas).css('font-size',m2[0]+'px');
              $('div[name="'+ma_304+'"]').css('font-size',m2[1]+'px');
              $('div[name="'+ma_3041+'"]').css('font-size',m2[2]+'px');
              $('div[name="'+ma_304+'"]').css('height',m2[1]+'px');
              $('div[name="'+ma_3041+'"]').css('height',m2[2]+'px');
              $('div[name="'+ma_304+'"]').css('line-height',m2[1]+'px');
              $('div[name="'+ma_3041+'"]').css('line-height',m2[2]+'px');
            }
            if(col.indexOf('color')!=-1){
              var n2=col.indexOf('color');
              var m3=data[n2];
              if(m3.indexOf(';')!=-1){
                var m4=m3.split(';');
              }else{
                var m4=[m3,m3,m3];
              }
              $('#box304'+timeDatas).css('color',m4[0]);
              $('div[name="'+ma_304+'"]').css('color',m4[1]);
              $('div[name="'+ma_3041+'"]').css('color',m4[2]);
            }


        },
        error:function(erroor){
            console.log(error);
        }
    });

}
