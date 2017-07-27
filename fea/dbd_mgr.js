$(document).ready(function(){
	$("#key").val("");$("#title").val("");
	$(".xglm_box").hide();
	var username=$.cookie('userName');
	var content=$("#contentBox");
	var mgr=$("#mgr tbody");
	var language = {
		"emptyTable" : "表中数据为空",
		'search':'搜索',
		"paginate" : {
			"first" : "首页",
			"previous" : "上页",
			"next" : "下页",
			"last" : "末页"
		}
	};
	var mgr=$("#mgr").DataTable({
		'searching':true,
		'language':language,
		'lengthChange': false,
		'ordering':true,
		'info':false,
		"columns": [
		    { "title": "ID" },
		    { "title": "中文描述" },
		    { "title": "创建者" },
		    { "title": "操作" }
		  ],
		"columnDefs": [
			{ "width": "10%", "targets": 2 },
			{ "width": "18%", "targets": 1 },
			/*{ "width": "10%", "targets": 0 },*/
		    {

		      "data": null,
		      "defaultContent": '<button class="edit btn btn-primary">编辑</button>\
							      <button class="fabu btn btn-success">预览</button>\
							      <button class="del btn btn-danger">删除</button>\
							      <button class="copy btn btn-info">复制</button>',
		      "targets":-1
		    }
		  ],
		"ajax": {
			url: "/db/scan/ssdb0/dashboard:/dashboard:~/200",
			'dataType':'jsonp',
			'dataSrc':function(data){
				localStorage.data=JSON.stringify(data);
				var engDataArr=[];
				var keyAll=[];
				for (var i = 0; i < data.length; i++) {
	        		var arr=data[i];
	        		for(var j in data[i]){
	        			var engData=[];
	        			var str=JSON.parse(arr[j]);
	        			var title=str[0].dtitle;
	        			if (str[0].editor) {
	        				var ss=str[0].editor;
	        			}else{
	        				var ss='admin';
	        			}
	        			// console.log(j);//
	        			var dashboard_j = j.split(":");//以冒号为界限拆分字符串  dashboard:cs --> [dashboad,cs]
				        engData.push(dashboard_j[1],title,ss);
				        engDataArr.push(engData);
				        keyAll.push(j);				    	
				        //localStorage.keyAll=JSON.stringify(keyAll);
	        		}
        		}
        		//console.info(JSON.parse(localStorage.keyAll));
				return engDataArr;							
			}
	  	}
	});	
	$("#mgr")
		.on( 'error.dt', function ( e, settings, techNote, message ) {	    	
		    //console.log( 'An error has been reported by DataTables: ', message );
		    alert('操作超时！点击确定后重新登陆。');
		    window.parent.location.href='login.fh5'; 
		   // window.close();	  
		    $('table').dataTable().fnProcessingIndicator( false ); 
		})
		.DataTable();
	$(".dataTables_wrapper .dataTables_filter").find("input").attr("placeholder","请输入关键字");
	var inputval='<button id="search123" type="button" name=""></button>';
	$(".dataTables_wrapper .dataTables_filter").find("label").append(inputval);
	$("body").find("#search123").addClass("anniu");
	$("body").on("click","#mh_list li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('#mh').val(val);
    });
	$("#add").click(function(){
		var dataAll=JSON.parse(localStorage.data);
		//console.info(dataAll);		
		key=$("#key").val();
		//判断key是否由中英构成；
		var result=key.match(/^[A-Za-z0-9_-]+$/); 
		if (result==null) {
			alert('请输入仅由英文字母、数字、减号和下划线组合的key');
			return false;
		};
		//判断新添加的key是否跟原来的重复
		for (var i = 0; i < dataAll.length; i++) {
			for(j in dataAll[i]){
				if('dashboard:'+key==j){
					//console.info(key,j);
					alert("ID重复，请重新设定");
					return false;
				}
			}
		};
		var dk='dashboard:'+key;
		title=$("#title").val();
		mh=$("#mh").val();
		window.location.href='dbd_build.fh5?key='+dk+'&dtitle='+title+'&editor='+username;		
	});
	$("body").on("click",".edit",function(){
		//alert();
		var tr='dashboard:' + $(this).parent().prev().prev().prev().text();
		var td=$(this).parent().prev().prev().text();
		var editor=$(this).parent().prev().text();
		//window.open('dbd_build.fh5?key='+tr+'&dtitle='+td);
		window.location.href='dbd_build.fh5?key='+tr+'&dtitle='+td+'&editor='+editor;
	});
	$("body").on("click",".fabu",function(){
		
		tr='dashboard:' + $(this).parent().prev().prev().prev().text();
		td=$(this).parent().prev().prev().text();
		editor=$(this).parent().prev().text();
		window.open('../dbd/dbd_yl.fh5?key='+tr+'&dtitle='+td+'&editor='+editor);
	});
	$("body").on("click",".del",function(){
		var key='dashboard:' + $(this).parent().prev().prev().prev().text();
		//console.info(key);
		$.ajax({
			type: "get",
	        async: false,
	        dataType:"json",
	        cache:false,
			url:"/db/del/ssdb0/"+key,
			success:function(){}
		});
		mgr
        .row( $(this).parent().parent())
        .remove()
        .draw();
        window.location.reload();
	});
	var getData=function(id,title){
		$.ajax({
			type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
			url:"/db/jsonp/ssdb0/"+id,
			success:function(res){
				//console.info(res);
				var old_id = id.split(":");
				$('#oldID span').text(old_id[1]);
				$('#oldTitle span').text(title);
				localStorage.dataArr=JSON.stringify(res);
				$('#newID').attr('old_id',old_id[0]); 
			},
			error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
		});
	};
	// console.log(id);
	$("body").on("click",".copy",function(){
		$("#copyPage").modal('toggle');
		var oldid='dashboard:' + $(this).parent().prev().prev().prev().text();
		var oldtitle=$(this).parent().prev().prev().text();
		$('#newTitle').val(oldtitle);
		getData(oldid,oldtitle);		
	});

	$('#ok').click(function(){		
		var string=JSON.parse(localStorage.dataArr);
		string[0].dtitle=$('#newTitle').val();
	  	//console.info(string);
	  	string=JSON.stringify(string);
	  	var new_id = $('#newID').attr('old_id')+':'+$('#newID').val();
	  	var dataStr = [];
	  	$.ajax({
	  		type: "get",
	  		async: false,
         	dataType:"jsonp",
         	url: "/db/scan/ssdb0/dashboard:/dashboard:~/200",
         	success:function(data){
         		// console.log(data);
         		for(var i=0;i<data.length;i++){
         			for(var j in data[i]){
	         			dataStr.push(j);
	         		}
         		}
         		if(dataStr.indexOf(new_id) != -1){
         			alert("ID重复，请重新设定");
         		}else{
         			$.ajax({
					 	type: "post",
			         	async: false,
			         	dataType:"json",
			         	url: "/db/put/ssdb0/"+new_id,
			         	data: {value:string},         
			         	success: function(response) {  
			         		alert("复制成功"); 

			         	}
			    	});
			    	$("#copyPage").modal('toggle');
			    	window.location.reload();
         		}
         		
         	},	
         	error:function(error){
         		console.log(error);
         	}
	  	});
	
	});
});//end doxument