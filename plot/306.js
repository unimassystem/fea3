function draw306(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用306.js');
var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var data = dataAll.data[0];
            var col=dataAll.columns;
              var new306 = '<div class="box306" data="306_'+timeDatas+'" style="width:'+width+'px;">'+data[0]+'</div>';
              var dr306='306_'+timeDatas;
              $(div).html(new306);
            if(col.indexOf('fontSize')!=-1){
              var n1=col.indexOf('fontSize');
              $('div[data="'+dr306+'"]').css('font-size',data[n1]+'px').css('height', height+'px').css('line-height', height+'px');
            }
            if(col.indexOf('color')!=-1){
              var n2=col.indexOf('color');
              $('div[data="'+dr306+'"]').css('color',data[n2]);
            }

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
