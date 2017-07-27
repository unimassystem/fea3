$(document).ready(function () {	
	var login=function(data){
		$.ajax({
			type:'get',
			async: true,
			url:'/auth',
			data:{data:data},
			success:function(data){
				//console.info(data);
				var back=eval('('+data+')');
				console.info(back);
				if(back.success=='True'){
					//console.info(data.indexOf('success'));
					window.location.href='sq_mgr.fh5';
				}else{
					alert("验证失败，请重新登录");
				};				
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			},
		});
	};
	$("#login").click(function(){
		var name=$("#name").find('input').val();
		var pass=$("#password").find('input').val();
		var data={
			"user":name,
			"passwd":pass
		};
		data=JSON.stringify(data);
		console.info(data);
		$.cookie('userName',name);
		$.cookie('usePass',pass);
		login(data);
	});	
	document.onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	       	$('#login').click();
 		}
	};

});