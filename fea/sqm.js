$(document).ready(function () {
	$.ajax({
		type:'get',
		async: true,
		dataType:'json',
		url:'/exec?prmtv=show defines',
		success:function(datas){	
		
			var result=datas.result;			
			result=JSON.parse(result);
			var data=result.data;
			var pk=data[8][1];
			var sn=data[9][1];
			$("#pk").text(pk);
			$("#sn").val(sn);
		},
		error:function(XMLHttpRequest,message){
			console.log(message);
		}
	});
	$.ajax({
		type:'get',
		async: true,
		dataType:'json',
		url:'/exec?prmtv=show version',
		success:function(datas){			
			var result=datas.result;			
			result=JSON.parse(result);
			var data=result.data;
			var bb=data[0];

			$("#banben").text(bb);
		},
		error:function(XMLHttpRequest,message){
			console.log(message);
		}
	});
	$("#submit").click(function(){
		var src='define SN as '+$("#sn").val();
		$.ajax({
			type:'get',
			async: true,
			dataType:'json',
			url:'/exec?prmtv='+src,
			success:function(data){			
				console.info(data);
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	});
});