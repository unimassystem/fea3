$(document).ready(function(){
	//var username=$.cookie('userName');
	var mgr=$("#mgr tbody");
	
	var language = {
			"emptyTable" : "表中数据为空",
			//'search':'搜索',
			"paginate" : {
				"first" : "首页",
				"previous" : "上页",
				"next" : "下页",
				"last" : "末页"
			}
		};
	// var mgr=$("#mgr").DataTable({
	// 	'searching':false,
	// 	'language':language,
	// 	'lengthChange': false,
	// 	'ordering':true,
	// 	'info':false,
	// 	"columns": [
	// 	    { "title": "PK" },
	// 	    { "title": "SN" },
	// 	    { "title": "E-mail" },
	// 	    { "title": "会员ID" },
	// 	    { "title": "公司或者组织" },
	// 	    { "title": "项目名称" },
	// 	    { "title": "用户名" },
	// 	    { "title": "授权时间" },
	// 	    { "title": "授权IP" }
	// 	  ],
	// 	"data":dataArr
	// });	
	//生成SN
	$('#produce').click(function(){
		var id=$("#id").val();
		var name=$("#name").val();
		var pk=$("#pk").val();
		var email=$("#email").val();
		var ou=$("#org").val();
		var pname=$("#pname").val();
		var tel=$("#tel").val();		
		if (email&&pk&&id) {
			var data={
				"email":email,
				"fid":id,
				"pk":pk,
				"ou":ou,
				"pname":pname,
				"people":name,				
				"tel":tel
			};
			data=JSON.stringify(data);
			//console.info(data);
		}else{
			alert("邮箱，会员id，pk不能同时为空。");
			return false;
		};		
	  	$.ajax({
		 	type: "get",
         	async: false,
         	dataType:"json",
         	url: "/mksn",
         	data: {data:data},         
         	success: function(response) {  
         		//console.info(response);
         		var sn=response.sn;
         		$("#snShow").modal("toggle");
         		$("#sn span").text(sn);
         		//console.info(sn);
         	}
    	});
	});
	//显示数据
	$("#search").click(function(){
		var id=$("#id").val();
		var name=$("#name").val();
		var pk=$("#pk").val();
		var email=$("#email").val();
		var ou=$("#org").val();
		var pname=$("#pname").val();
		var tel=$("#tel").val();
		var data={
			"email":email,
			"fid":id,
			"pk":pk
			/*"ou":ou,
			"pname":pname,
			"people":name,				
			"tel":tel*/
		};
		data=JSON.stringify(data);	
		$.ajax({
		 	type: "get",
         	async: false,
         	dataType:"json",
         	url: "/search",
         	data: {data:data},         
         	success: function(res) {  
         		//console.info(res);
         		mgr.html("");
         		$(".blank").remove();
         		for (var i = 0; i < res.length; i++) {
         			var tr=$('<tr>');
         			//存放每个td值
         			for (var j = 0; j <10; j++) {
         				var td='<td>'+res[i][j]+'</td>';
         				tr.append(td);
         			}
         			mgr.append(tr);         			
         		}         		
         	},
         	error:function(XMLHttpRequest,message){
	           // console.log(XMLHttpRequest);
	           if (XMLHttpRequest.status=='401') {
	           		alert("操作超时，请重新登录！")
	           		window.location.href='sq_login.fh5';
	           }
	        }
    	});		
	});
});//end doxument