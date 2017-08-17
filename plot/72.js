function draw72(myChart,ckey,height,titles,x,y,width,div){
var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var data = dataAll.data[0];
            var ind=dataAll.index;
            var col=dataAll.columns;
            if(col.indexOf('fontSize')==-1&&col.indexOf('color')==-1){
              var new72 = '<div class="box72" style="width:'+width+'px;"><span class="box72_1">'+ind+'</span><span class="box72_2">'+data[0]+'</span></div>';
              $(div).html(new72);
            }else{
              var new72 = '<div class="box72" name="72_'+timeDatas+'" style="width:'+width+'px;"><span class="box72_1">'+ind+'</span><span class="box72_2">'+data[0]+'</span></div>';
              var ma_72='72_'+timeDatas;
              $(div).html(new72);
              if(col.indexOf('fontSize')!=-1){
                var n1=col.indexOf('fontSize');
                var m1=data[n1];
                if(m1.indexOf(';')!=-1){
                  var m2=m1.split(';');
                }else{
                  var m2=[m1,m1];
                }
                $('div[name="'+ma_72+'"]').children('span').eq(0).css('font-size',m2[0]+'px');
                $('div[name="'+ma_72+'"]').children('span').eq(1).css('font-size',m2[1]+'px');
                $('div[name="'+ma_72+'"]').children('span').eq(0).css('line-height',m2[0]+'px');
                $('div[name="'+ma_72+'"]').children('span').eq(1).css('line-height',m2[1]+'px');
                $('div[name="'+ma_72+'"]').children('span').eq(0).css('height',m2[0]+'px');
                $('div[name="'+ma_72+'"]').children('span').eq(1).css('height',m2[1]+'px');
              }
              if(col.indexOf('color')!=-1){
                var n2=col.indexOf('color');
                var m3=data[n2];
                if(m3.indexOf(';')!=-1){
                  var m4=m3.split(';');
                }else{
                  var m4=[m3,m3];
                }
                $('div[name="'+ma_72+'"]').children('span').eq(0).css('color',m4[0]);
                $('div[name="'+ma_72+'"]').children('span').eq(1).css('color',m4[1]);
              }
            }

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
