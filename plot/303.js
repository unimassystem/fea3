function draw303(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用303.js');
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var index = dataAll.index[0];
            var col=dataAll.columns;
            var data = dataAll.data[0];

            if(col.indexOf('fontSize')==-1&&col.indexOf('color')==-1){
              var new303 = '<div class="box303" style="width:'+width+'px;">'+
                      '<div class="box303-title">'+index+'</div>'+
                      '<div class="box303-main">'+data+'</div>'+
                  '</div>';
                  $(div).html(new303);
            }else{
              var new303 = '<div class="box303" name="303_'+timeDatas+'" style="width:'+width+'px;">'+
                      '<div class="box303-title">'+index+'</div>'+
                      '<div class="box303-main">'+data[0]+'</div>'+
                  '</div>';
                var ma_303='303_'+timeDatas;
                $(div).html(new303);
              if(col.indexOf('fontSize')!=-1){
                var n1=col.indexOf('fontSize');
                var m1=data[n1];
                if(m1.indexOf(';')!=-1){
                  var m2=m1.split(';');
                }else{
                  var m2=[m1,m1];
                }

                $('div[name="'+ma_303+'"]').children('div').eq(0).css('font-size',m2[0]+'px');
                $('div[name="'+ma_303+'"]').children('div').eq(1).css('font-size',m2[1]+'px');
                $('div[name="'+ma_303+'"]').children('div').eq(0).css('line-height',m2[0]+'px');
                $('div[name="'+ma_303+'"]').children('div').eq(1).css('line-height',m2[1]+'px');
                $('div[name="'+ma_303+'"]').children('div').eq(0).css('height',m2[0]+'px');
                $('div[name="'+ma_303+'"]').children('div').eq(1).css('height',m2[1]+'px');
              }
              if(col.indexOf('color')!=-1){
                var n2=col.indexOf('color');
                var m3=data[n2];
                if(m3.indexOf(';')!=-1){
                  var m4=m3.split(';');
                }else{
                  var m4=[m3,m3];
                }

                $('div[name="'+ma_303+'"]').children('div').eq(0).css('color',m4[0]);
                $('div[name="'+ma_303+'"]').children('div').eq(1).css('color',m4[1]);
              }
            }

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
