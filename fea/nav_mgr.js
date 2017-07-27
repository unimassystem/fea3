$(document).ready(function(){
	function check_portal(){
		$(".radio").remove();
		$.getJSON("../portal/portal.json",function(data){
			$.each(data,function(name,value){
				//console.info(name);
				var div='<div class="radio" style="padding-left: 38%;">\
						    <label>\
						      	<input type="radio" name="bag" data-id="'+name+'">'+value+'\
						    </label>\
					  	</div>';
				$("#choose").append(div);
			})
		});
	};
	check_portal();
	$("#key").val("");$("#title").val("");
	var username=$.cookie('userName');
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
		    {
		      "data": null,
		      "defaultContent": '<button class="edit btn btn-primary">编辑</button>\
	      						 <button class="fabu btn btn-success">预览</button>\
							      <button class="del btn btn-danger">删除</button>',
		      "targets":-1
		    }
		  ],
		"ajax": {
			url: "/db/scan/ssdb0/nav:/nav:~/200",
			'dataType':'jsonp',
			'dataSrc':function(data){
				localStorage.data=JSON.stringify(data);
				var engDataArr=[];
				for (var i = 0; i < data.length; i++) {
	        		var arr=data[i];
	        		for(var j in data[i]){
	        			var engData=[];
	        			var str=JSON.parse(arr[j]);
	        			var title=str[0].ntitle;
	        			//var ss='0';
	        			if (str[0].editor) {
	        				var ss=str[0].editor;
	        			}else{
	        				var ss='admin';
	        			}
	        			var nav_j = j.split(":");//以冒号为界限拆分字符串  nav:cs --> [nav,cs]
				        engData.push(nav_j[1],title,ss);
				        engDataArr.push(engData);
	        		}
        		}
        		//console.info(engData);
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
				if('nav:'+key==j){
					//console.info(key,j);
					alert("ID重复，请重新设定");
					return false;
				}
			}
		};
		title=$("#title").val();
		mh=$("#mh").val();
		window.location.href='nav_build.fh5?key=nav:'+key+'&ntitle='+title+'&editor='+username;

	});//end add click

	$("body").on("click",".edit",function(){
		//alert();
		var tr='nav:' + $(this).parent().prev().prev().prev().text();
		var td=$(this).parent().prev().prev().text();
		var editor=$(this).parent().prev().text();
		//window.open('nav_build.fh5?key='+tr+'&ntitle='+td);
		window.location.href='nav_build.fh5?key='+tr+'&ntitle='+td+'&editor='+editor;
	});
	$("body").on("click",".fabu",function(){
		$("#bcgChoose").modal("toggle");
		tr='nav:' + $(this).parent().prev().prev().prev().text();
		//console.info(tr);
		td=$(this).parent().prev().prev().text();
		editor=$(this).parent().prev().text();
	});
	$("#submit").click(function(){
		var inp=$("#choose").find('input');
		var mh;
		for (var i = 0; i < inp.length; i++) {
			if(inp[i].checked==true){
				mh=$(inp[i]).attr('data-id');
				var pmh='portal'+mh;
				window.localStorage.setItem('mhs',pmh);
			}
		}
		//console.info(mhC);
		//mh=mh+1;
		$.getJSON("../portal/portal.json",function(data){
			$.each(data,function(name,value){
				if(mh==name) {
					//console.info(mh);
					window.open('../portal/portal'+mh+'/portal'+mh+'.fh5?key='+tr+'&ntitle='+td);
					return true;
				}
			})
		});
		$("#bcgChoose").modal("toggle");
	});
	$("body").on("click",".del",function(){
		var key='nav:' + $(this).parent().prev().prev().prev().text();
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
});//end doxument
