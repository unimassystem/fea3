$(document).ready(function(){
	$('.boxinside p input').focus(function(){
		$(this).parent('p').addClass('bder');
	});
	$('.boxinside p input').blur(function(){
		$(this).parent('p').removeClass('bder')
	});
})