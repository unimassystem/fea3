
//var dataArr=eval($.cookie('dataArr'));
var dataArr=eval(localStorage.dataArr);
//console.info(dataArr);
$("body").on('mouseenter','.navC',function(){
  $('#box .secondList span').text("");
  //var num=$(this).attr('data-name');
  $(this).css('background-image','url(../../images/portal02/portal_3_nav_hover_bg_0.png)');
  $('.navC').not(this).css('background-image','url(../../images/portal02/portal_3_nav_hover_bg_0_try.png)');
  $(this).find('a').css('color','#ddbd2a');
  $('.navC').not(this).find('a').css('color','#def4f4');
  getChildren(this);
}).on('mouseleave','.navC',function(){
 // var num=$(this).attr('data-name');
  leave(this);
});
var getChildren=function(dom){
  var pKey=$(dom).find('a').attr('data-key');
  var pPosition=$(dom).find('a').attr('data-id');
  //console.info(pKey);
  for (var i = 0; i < dataArr.length; i++) {
    if(pKey==dataArr[i].key){
      if (dataArr[i].children) {
        var child=dataArr[i].children;
        var len=parseInt(pPosition)+parseInt(child.length);
       // console.info(pPosition,child);
        var x=[];
        var a=[0,1,2,3,4,5,6,7];
        for(var i=pPosition;i<len;i++){
          if(i>8||i==8){
            x.push(a[i-8]);//当数组超过7的时候，遍历从0开始；
          }else{
            x.push(parseInt(i));
          }
        }
       // console.info(x);
        for (var j = 0; j < child.length; j++) {
          var a='<a href="#" onclick=getAjax("'+child[j].key+'","'+child[j].tit+'");>'+child[j].name+'</a>'
          $('#box').find('div[data-id="'+x[j]+'"] span').append(a);
          $('#box').find('div[data-id="'+x[j]+'"]').fadeIn();      
        }
      }else{return false}
    }
  }  
};
var leave=function(dom){
  var pKey=$(dom).find('a').attr('data-key');
  var pPosition=$(dom).find('a').attr('data-id');
  for (var i = 0; i < dataArr.length; i++) {
    if(pKey==dataArr[i].key){
      if (dataArr[i].children) {
        chilEvent(dom);
      }else{
        $(dom).css('background-image','url(../../images/portal02/portal_3_nav_hover_bg_0_try.png)');
        $(dom).find('a').css('color','#def4f4');
        $("#box .secondList").fadeOut();
      }
    }
  } 
};
var chilEvent=function(dom){
  //console.info("ok");
  $('.secondList').hover(function(){
    $(this).css('background-image','url(../../images/portal04/portal_4navD2-hover.png)');
  },function(){
    $(this).css('background-image','url(../../images/portal04/portal_4navD2.png)');
  });
}