/*构建htmldom*/
function draw318(myChart,ckey,height,titles,x,y,width,div){
  // myChart.setOption(option);
  getData(myChart,ckey,div);
  function getData(myChart,ckey,div){
      $.ajax({
          type : 'get',
          url:'/db/jsonp/ssdb0/'+ckey,
          cache : false,
          dataType : 'jsonp',
          //async : false,
          success:function (dataAll){
              console.info(dataAll);
              var data=dataAll.index;
              var divs='<div class="div_318"></div>';
              var div1='<div class="div1_318" style="float:left;overflow:hidden;"></div>';
              var div2='<div class="div2_318" style="float:left;overflow:hidden;"></div>';
              var div3='<div class="div3_318" style="float:left;overflow:hidden;"></div>';
              var div4='<div class="div4_318" style="float:left;overflow:hidden;"></div>';
              div.html(divs)
              $('.div_318').css('width', width).css('height', height);
              var n=data.length
              if(n<4){
                $('.div_318').append(div1+div2);
                $('.div1_318').css('width', '60%').css('height', '100%');
                $('.div2_318').css('width', '40%').css('height', '100%');
                for (var i = 0; i < data.length; i++) {
                  if(i<1){
                    $('.div1_318').append('<div class="d318_0" style="width:100%;float:left;overflow:hidden;height:100%;text-align:center;line-height:'+height+'px;">'+data[0]+'</div>')
                  }
                  if(i>0){
                    $('.div2_318').append('<div class="d318_'+i+'" style="width:100%;float:left;overflow:hidden;height:50%;text-align:center;line-height:'+height*0.5+'px;">'+data[i]+'</div>')
                  }
                }
              }
              else if(3<n && n<7){
                $('.div_318').append(div1+div2+div3);
                $('.div1_318').css('width', '50%').css('height', '100%');
                $('.div2_318').css('width', '30%').css('height', '100%');
                $('.div3_318').css('width', '20%').css('height', '100%');
                for (var i = 0; i < data.length; i++) {
                  if(i<1){
                    $('.div1_318').append('<div class="d318_0" style="width:100%;float:left;overflow:hidden;height:100%;text-align:center;line-height:'+height+'px;">'+data[0]+'</div>')
                  }
                  if(0<i && i<3){
                    $('.div2_318').append('<div class="d318_'+i+'" style="width:100%;float:left;overflow:hidden;height:50%;text-align:center;line-height:'+height*0.5+'px;">'+data[i]+'</div>')
                  }
                  if(i>2){
                    $('.div3_318').append('<div class="d318_'+i+'" style="width:100%;float:left;overflow:hidden;height:'+height/3+'px;text-align:center;line-height:'+height/3+'px;">'+data[i]+'</div>')
                  }
                }
              }
              else if(n>6){
                $('.div_318').append(div1+div2+div3+div4);
                $('.div1_318').css('width', '40%').css('height', '100%');
                $('.div2_318').css('width', '30%').css('height', '100%');
                $('.div3_318').css('width', '20%').css('height', '100%');
                $('.div4_318').css('width', '10%').css('height', '100%');
                for (var i = 0; i < data.length; i++) {
                  if(i<1){
                    $('.div1_318').append('<div class="d318_0" style="width:100%;float:left;overflow:hidden;height:100%;text-align:center;line-height:'+height+'px;">'+data[0]+'</div>')
                  }
                  if(0<i && i<3){
                    $('.div2_318').append('<div class="d318_'+i+'" style="width:100%;float:left;overflow:hidden;height:50%;text-align:center;line-height:'+height*0.5+'px;">'+data[i]+'</div>')
                  }
                  if(2<i && i<6){
                    $('.div3_318').append('<div class="d318_'+i+'" style="width:100%;float:left;overflow:hidden;height:'+height/3+'px;text-align:center;line-height:'+height/3+'px;">'+data[i]+'</div>')
                  }
                  if(i>5){
                    $('.div4_318').append('<div class="d318_'+i+'" style="width:100%;float:left;overflow:hidden;height:'+height/4+'px;text-align:center;line-height:'+height/4+'px;">'+data[i]+'</div>')
                  }
                }
              }

          }
      });
    }
}
