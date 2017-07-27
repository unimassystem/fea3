$(document).ready(function () {	
	$(".logbtn").click(function(){
		var name=$("#name").val();
		var pass=$("#password").val();
		var data={
			"name":name,
			"auth_key":pass
		};
		data=JSON.stringify(data);
		$.cookie('userName',name);
		//$.cookie('usePass',pass);
		login(data);
	});	
	document.onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	       	$('.logbtn').click();
 		}
	};
	var login=function(data){
		$.ajax({
			type:'post',
			async: true,
			url:'/db/auth',
			data:{data:data},
			success:function(data){
				var back=eval('('+data+')');
				if(back.success==true){
					//console.info(data.indexOf('success'));
					window.location.href='main.fh5';
				}else{
					alert("验证失败，请重新登录");
				}				
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	};
});