$(document).ready(function(){
	//$('.nav').height($(window).height());
	$('.nav ul li a').click(function(event){
		//阻止a标签链接跳转
		event.preventDefault(); 
		//console.info($(this).text());
		$(this).parent('li').addClass('navbg').siblings("li").removeClass("navbg");
		var index=$(this).parent('li').index();
		$('.content>div').eq(index).show().siblings().hide();
	});
	$('.content a').click(function(){
		var a_id=$(this).attr('data-id');
		//console.info(a_id);
		$('#types').val(a_id);
		$("#smallChart").modal("toggle");
	});
})
