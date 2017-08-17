/*构建htmldom*/
function draw57(myChart,ckey,height,titles,x,y,width,div){
	
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
          var div1='<div class="dh2" style="width:'+width+'px;height:'+height+'px;"><div class="move3"><img src="../images/logo/light4.png"></div></div>';
          div.html(div1);
          setInterval('date_2();', 0);  //每隔3秒循环执行过程函数！
        }
    });
}
function date_1()
          {
              $('.move3 img').css('animation-play-state','running');
          }

  function date_2() {
      $('.move3 img').css('animation-play-state','paused');
       setTimeout('date_1();', 1000);
  }