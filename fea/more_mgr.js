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
		    { "title": "参数" },
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
			url: "/db/scan/ssdb0/dp:/dp:~/200",
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
	        			//console.info(str);
	        			var title=str[0].mtitle;
	        			if (str[0].mcs) {
	        				cs=decodeURIComponent($.param(str[0].mcs));
	        				if (cs.indexOf('---')) {
	        					mcs=cs;
	        				}else{
	        					mcs='---';
	        				}
	        			}else{
	        				mcs='---';
	        			}
	        			if (str[0].editor){
	        				var ss=str[0].editor;
	        			}else{
	        				var ss='admin';
	        			}
	        			var dp_j = j.split(":");//以冒号为界限拆分字符串  dp:cs --> [dp,cs]
				        engData.push(dp_j[1],title,mcs,ss);
				        engDataArr.push(engData);
				        keyAll.push(j);
				        //localStorage.keyAll=JSON.stringify(keyAll);
	        		}
        		}
        		//console.info(engDataArr);
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
		//keyAll=JSON.parse(localStorage.keyAll);
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
				if('dp:'+key==j){
					//console.info(key,j);
					alert("ID重复，请重新设定");
					return false;
				}
			}
		};
		var dk='dp:'+key;
		title=$("#title").val();
		cs=$("#canshu").val();
		if (cs) {
			cs=$("#canshu").val();
		}else{
			cs='---';
		}
		mh=$("#mh").val();
		window.location.href='more_build.fh5?key='+dk+'&mtitle='+title+'&editor='+username+'&'+cs;
			/*mgr.row.add( [
		        'dashboard:'+key,
		        title,
		        username,
		        '<button class="edit btn btn-primary">编辑</button>\
								      <button class="fabu btn btn-success">预览</button>\
								      <button class="del btn btn-danger">删除</button>\
								      <button class="copy btn btn-info">复制</button>',
		    ]).draw();*/

	});
	$("body").on("click",".edit",function(){
		//alert();
		var tr='dp:' + $(this).parent().prev().prev().prev().prev().text();
		var td=$(this).parent().prev().prev().prev().text();
		var tdCs=$(this).parent().prev().prev().text();
		var editor=$(this).parent().prev().text();
		//window.open('dbd_build.fh5?key='+tr+'&dtitle='+td);
		window.location.href='more_build.fh5?key='+tr+'&mtitle='+td+'&'+tdCs+'&editor='+editor;
	});
	$("body").on("click",".fabu",function(){
		tr='dp:' + $(this).parent().prev().prev().prev().prev().text();
		td=$(this).parent().prev().prev().prev().text();
		tdCs=$(this).parent().prev().prev().text();
		editor=$(this).parent().prev().text();
		window.open('../dbd/more_yl.fh5?key='+tr+'&mtitle='+td+'&editor='+editor+'&'+tdCs);
	});
	$("body").on("click",".del",function(){
		var key='dp:' + $(this).parent().prev().prev().prev().prev().text();
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
	var getData=function(id,title,cs){
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
				$('#oldcs span').text(cs);
				localStorage.dataArr=JSON.stringify(res);
				$('#newID').attr('old_id',old_id[0]);
			},
			error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
		});
	};
	$("body").on("click",".copy",function(){
		$("#copyPage").modal('toggle');
		var oldid='dp:' + $(this).parent().prev().prev().prev().prev().text();
		var oldtitle=$(this).parent().prev().prev().prev().text();
		var oldcs=$(this).parent().prev().prev().text();
		$('#newTitle').val(oldtitle);
		getData(oldid,oldtitle,oldcs);
	});

	$('#ok').click(function(){
		var string=JSON.parse(localStorage.dataArr);
		string[0].mtitle=$('#newTitle').val();
		var theRequest ={}
		var csN=[];
		var csn=$('#newcs').val();
		csN.push(csn);
		for(var i = 0; i < csN.length; i ++) {
				theRequest[csN[i].split("=")[0]]=unescape(csN[i].split("=")[1]);
		}
		// string[0].dcs=$('#newcs').val();
		string[0].mcs=theRequest;
	  	//console.info(string);
	  	string=JSON.stringify(string);
	  	var new_id = $('#newID').attr('old_id')+':'+$('#newID').val();
	  	var dataStr = [];
	  	$.ajax({
	  		type: "get",
	  		async: false,
         	dataType:"jsonp",
         	url: "/db/scan/ssdb0/dp:/dp:~/200",
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
