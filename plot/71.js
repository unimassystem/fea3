function draw71(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var index = dataAll.index[0];
            var data = dataAll.data[0];
            var a1=data[0];
            var a2=data[1];
            var col=dataAll.columns;
            if(isNaN(index)==false){
              index=reverseNum(index);
            }
            if(isNaN(a1)==false){
              a1=reverseNum(a1);
            }
            if(isNaN(a2)==false){
              a2=reverseNum(a2);
            }
            function reverseNum(num){
                if(typeof num !== "undefined"){
                    var arr = (num + "").split(""),
                        arr = arr.reverse();
                    for(var i=0, len=arr.length/3; i<len; i++){
                        arr.splice(i*3+i, 0, "-");
                    }
                    arr.reverse();
                    var str = arr.join("");
                    str = str.substring(0, str.length-1);
                    str = str.replace(/-/g,",");
                    return str;
                }
            }

            if(col.indexOf('fontSize')==-1&&col.indexOf('color')==-1){
            var new71 = '<div class="box71" style="width:'+width+'px; text-align:center;>'+
                            '<div class="box71-main"style="text-align:center;height:'+height+'px;line-height:'+height+'px;"><span class="box71_1">'+index+'</span><span class="box71_2">'+a1+'</span><span class="box71_3">'+a2+'</span></div>'+
                        '</div>';
            $(div).children('div[class="box71"]').remove();
            $(div).prepend(new71);
          }else{
            var new71 = '<div class="box71" style="width:'+width+'px;text-align:center;>'+
                            '<div class="box71-main" name="71_'+timeDatas+'" style="text-align:center;height:'+height+'px;line-height:'+height+'px;"><span class="box71_1">'+index+'</span><span class="box71_2">'+a1+'</span><span class="box71_3">'+a2+'</span></div>'+
                        '</div>';
            var ma_71='71_'+timeDatas;
            $(div).children('div[class="box71"]').remove();
            $(div).prepend(new71);
            if(col.indexOf('fontSize')!=-1){
              var n1=col.indexOf('fontSize');
              var m1=data[n1];
              if(m1.indexOf(';')!=-1){
                var m2=m1.split(';');
              }else{
                var m2=[m1,m1,m1];
              }
              $('div[name="'+ma_71+'"]').children('span').eq(0).css('font-size',m2[0]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(1).css('font-size',m2[1]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(2).css('font-size',m2[2]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(0).css('line-height',m2[0]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(1).css('line-height',m2[1]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(2).css('line-height',m2[2]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(0).css('height',m2[0]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(1).css('height',m2[1]+'px');
              $('div[name="'+ma_71+'"]').children('span').eq(2).css('height',m2[2]+'px');
            }
            if(col.indexOf('color')!=-1){
              var n2=col.indexOf('color');
              var m3=data[n2];
              if(m3.indexOf(';')!=-1){
                var m4=m3.split(';');
              }else{
                var m4=[m3,m3,m3];
              }
              $('div[name="'+ma_71+'"]').children('span').eq(0).css('color',m4[0]);
              $('div[name="'+ma_71+'"]').children('span').eq(1).css('color',m4[1]);
              $('div[name="'+ma_71+'"]').children('span').eq(2).css('color',m4[2]);
            }

          }
        },
        error:function(erroor){
            console.log(error);
        }
    });

}
