function draw80(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
          var se_key=div.attr('id');
          var data=dataAll.data[0];
          var col=dataAll.columns;
          var lens=col.length;
          var div1='<div id="draw80_'+timeDatas+'" class="draw80"></div>';
          var id='draw80_'+timeDatas;
          if(div.children('div[class="draw80"]').length<1){
            window.sessionStorage.removeItem(se_key);
            div.prepend(div1);
          }
          var font80=16;
          var color80='#000';
          if(col.indexOf('fontSize')!=-1){
            lens=lens-1;
            var m1=col.indexOf('fontSize');
            var font80=data[m1];
          }
          if(col.indexOf('color')!=-1){
            lens=lens-1;
            var m2=col.indexOf('color');
            var color80=data[m2];
          }
          $('div[id="'+id+'"]').css('width', width+'px').css('height', height+'px');
          var div2='<div class="zs_80"><div>'+
                    '<span>0</span>'+
                    '<span>1</span>'+
                    '<span>2</span>'+
                    '<span>3</span>'+
                    '<span>4</span>'+
                    '<span>5</span>'+
                    '<span>6</span>'+
                    '<span>7</span>'+
                    '<span>8</span>'+
                    '<span>9</span>'+
                    '</div></div>';
          function show_num(n){
              var it = div.children('div[class="draw80"]').children('div[class="zs_80"]');
              var len = String(n).length;
              for(var i=0;i<len;i++){
                  var num=String(n).charAt(i);
                  if(it.length<=i){
                    $('#'+id).append(div2);//每一个数字
                  }
                  var yz = -parseInt(num)*height; //y轴位置
                  var obj = div.children('div[class="draw80"]').children('div[class="zs_80"]').eq(i).children('div');
                  obj.animate({
                    marginTop:String(yz)+'px'
                  }, 1500)
              }
              var w80=Number(font80)+Number(5);
              $('#'+id).children('div[class="zs_80"]')
              .css('height', height+'px')
              .css('width', w80+'px')
              .css('overflow', 'hidden')
              .css('float','left');

              $('#'+id).children('div[class="zs_80"]').children('div')
              .css('height', 10*height+'px')
              .css('width',w80+'px');

              $('#'+id).children('div[class="zs_80"]').children('div').children('span')
              .css('display','block')
              .css('width', w80+'px')
              .css('height',height+'px')
              .css('line-height',height+'px')
              .css('text-align','center')
              .css('color',color80);
          }
          if(lens<2){
            if(window.sessionStorage.getItem(se_key)){//上一次的数
              var n1=window.sessionStorage.getItem(se_key);
              var d1=Number(data[0])+Number(n1);
              show_num(d1);
            }else{
              var n1=0;//初始值
              var d1=Number(data[0])+Number(n1);
              show_num(d1);
            }
            window.sessionStorage.setItem(se_key,d1);
          }
        },
        error:function(erroor){
            console.log(error);
        }
    });

}
