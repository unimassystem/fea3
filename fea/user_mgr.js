$(document).ready(function(){
	var tbody=$("#userManage tbody");
	var user=$("#userManage tbody tr");
	var newTr=$("#userModal");
	var userName=$.cookie('userName');
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
	var mgr=$("#userManage").DataTable({
		'searching':true,
		'language':language,
		'lengthChange': false,
		'ordering':true,
		'info':false,
		"columns": [
		    { "title": "用户名" },
		    { "title": "中文名" },
		    { "title": "分析员" },
		    { "title": "引擎选择" },
		    { "title": "应用选择" },
		    // { "title": "工具选择" },
		    // { "title": "数据属性" },
		    //{ "title": "引擎" },
		    { "title": "操作"}
		  ],
		"columnDefs": [
			{ "width": "11%", "targets": 2 },
			{ "width": "18%", "targets": 5 },
		    {
		      "data": null,
		      "width":"11%",
		      "defaultContent": '<button class="edit btn btn-info">编辑</button><button class="del btn btn-danger">删除</button>',
		      "targets":-1
		    }
		  ],
		"ajax": {
			url: "/db/list_user",
			'dataType':'json',
			'dataSrc':function(res){
        		// console.info(res);
        		var engDataArr=[];

						var yhm,zwm,fxy,yqxz,yyxz,gjxz,sjsx;
        		for (var i = 0; i < res.length; i++) {
							var tds='';
        			var keyAll = [];
        			// if(res[i].length==6){
        			// 	res[i].pop();
        			// }
        				yhm = res[i][0];
        				zwm= res[i][1];
        				fxy = res[i][2];
        				yqxz = res[i][3];
        				yyxz = res[i][4];
								// gjxz = res[i][5];
								// sjsx = res[i][6];
								// console.log(yyxz);
								if(yyxz.indexOf(";") !=-1){
									yyxz=yyxz.split(";");
									for (var k = 0; k < yyxz.length; k++) {
										if(yyxz[k] == ''){
											yyxz.splice(k,1);
										}
									}
									for (var k = 0; k < yyxz.length; k++) {
										var m=yyxz[k].split(":");
										tds=m[1]+';'+tds;
									}
									keyAll.push(yhm,zwm,fxy,yqxz,tds);
								}else{
	        				if(yyxz.indexOf(":")!=-1){
	        					yyxz = yyxz.split(":");
										keyAll.push(yhm,zwm,fxy,yqxz,yyxz[1]);
	        				}else{
	        					keyAll.push(yhm,zwm,fxy,yqxz,yyxz);
	        				}
								}

        			engDataArr.push(keyAll);
        		}
        		// console.info(engDataArr);
				return engDataArr;
			}
	  	},
	});
	$("#userManage")
		.on( 'error.dt', function ( e, settings, techNote, message ) {
		    //console.log( 'An error has been reported by DataTables: ', message );
		    alert('操作超时！点击确定后重新登陆。');
		    window.parent.location.href='login.fh5';
		   // window.close();
		    $('table').dataTable().fnProcessingIndicator( false );
		})
		.DataTable();

	var addData=function(){
		var addTr=[];
		for (var i = 0; i < 5; i++) {
			var text=$('input[data-id="'+i+'"]').val();
			addTr.push(text);
		}
		//console.info(addTr);
		// var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,10}$/;
		// if (!patrn.exec(addTr[0])){
		// 	alert('用户名格式不对');
		// }else{
		var use_a=addTr[0];
		var use_n=use_a.split("");
		var result=use_a.match(/^[\u4e00-\u9fa5]$/);
		if (result != null) {
			alert('用户名格式不对');
			return false;
		}
		if(use_n.indexOf('@') != -1 ||use_n.indexOf('!') != -1 ||use_n.indexOf('~') != -1 ||use_n.indexOf('#') != -1 ||use_n.indexOf('*') != -1||use_n.indexOf(" ") != -1||use_n.indexOf('&') != -1){
			alert('用户名格式不对');
			return false;
		}
		if(use_n.length < 1 || use_n.length > 20){
			alert('用户名格式不对');
			return false;
		}
		else{
			mgr.row.add( [
		        addTr[0],
		        addTr[1],
		        addTr[2],
		        addTr[3],
		        addTr[4],
		        // addTr[5],
		        // addTr[6],
		        '<button class="edit btn btn-primary">编辑</button>'+
		        '<button class="del btn btn-danger">删除</button>'
		    ]).draw();
			saveData();
			$("#addModal").modal("toggle");
		}
	};
	$(".dataTables_wrapper .dataTables_filter").find("input").attr("placeholder","请输入关键字");
	var inputval='<button id="search123" type="button" name=""></button>';
	$(".dataTables_wrapper .dataTables_filter").find("label").append(inputval);
	$("body").find("#search123").addClass("anniu");

	var add='<div class="btn group" style="float: right;margin-right: 4px;padding:0;">\
			<button id="add_btn" class="btn btn-primary" style="padding:4px 12px;">新增</button>\
		</div>';
	$("#userManage_filter").append(add);
	$("#add_btn").click(function(){
		newTr.find('input').val("");
		$('.nav_nav').hide();
		$("#saveOK_btn").css("display","none");
		$("#ok_btn").css("display","inline-block");
		$("#addModal").modal("toggle");
		$("#user").attr('readonly',false);
		$('input[data-id="2"]').val("Y");
		getYq();
		getUse();
		setTimeout(function(){
			var aaa = $("#yq_list li").eq(0).attr("data-id");
			$('input[data-id="3"]').val(aaa);
			var bbb = $("#nav_list li").eq(0).attr("data-id");
			$('input[data-id="4"]').val(bbb);
		},500);
	});
	$("#ok_btn").click(function(){
		$.ajax({
			type: "get",
	        async: true,
	        dataType:"json",
	        cache:false,
		    url: "/db/list_user",
		    success: function(data) {
		    	// console.log(data);
		    	var username = $('input[data-id="0"]').val();
		    	var username2 = [];
		    	for(var i=0;i<data.length;i++){
		    		username2.push(data[i][0]);
		    	}
		    	// console.log(username);
		    	// console.log(username2);
		    	if(username2.indexOf(username) != -1){
		    		alert("用户名重复，请重新设定！");
		    	}else{
					addData();

		    	}
		    },
		    error:function(XMLHttpRequest,message){
				console.log(message);
			}
		});
	});
	$("#saveOK_btn").click(function(){
		saveData();
	});
	$("body").on('click','.edit',function(){
		$("#ok_btn").css("display","none");
		$("#saveOK_btn").css("display","inline-block");
		$("#addModal").modal("toggle");
		$("#user").attr('readonly',true);
		$('.nav_nav').hide();
		editData(this);
	});
	var delData=function(dom){
		var key=$(dom).parent().parent().children(":first").text();
		//console.info(key);
		$.ajax({
			type: "get",
	        async: true,
	        dataType:"json",
	        cache:false,
			url:"/db/deluser/"+key,
			success:function(){}
		});
		mgr
        .row( $(dom).parent().parent())
        .remove()
        .draw();
	};

	$("body").on('click','.del',function(){
		delData(this);
	});
	var saveData=function(){
		var data=getData();
		data=JSON.stringify(data);
		// console.log(data);
		$.ajax({
			type: "post",
		    async: true,
		    dataType:"json",
		    cache:false,
		    url: "/db/adduser/xyy",
		    data:{data:data},
		    success: function(data) {
					// console.log(data);
					user_option();
		    	window.location.reload();
		    },
		    error:function(XMLHttpRequest,message){
				console.log(message)
				console.log(XMLHttpRequest)
			}
		});
	};
	var getData=function(){
		var string={
			"name":$('input[data-id="0"]').val(),
			"realname":$('input[data-id="1"]').val(),
			"isadmin":$('input[data-id="2"]').val(),
			"pot":$('input[data-id="3"]').val(),
			"nav":$('input[data-id="4"]').val(),
		};
		//console.info(string);
		return string;
	};
	var user_option = function(){
		var id=$('input[data-id="0"]').val();
		var dataStr={
			'name':id,
			'tool':$('input[data-id="5"]').val(),
			'datas':$('input[data-id="6"]').val(),
			'analyst':$('input[data-id="2"]').val(),//2017.7.25 ycj 新增分析师
		}
		dataStr=JSON.stringify(dataStr);
		$.ajax({
				type: "post",
				async: true,
				dataType:"json",
				cache:false,
				url:'/db/put/ssdb0/user_option:' + id,
				data:{value:dataStr},
				success: function(data) {
						// window.location.reload();
						console.log(data);
				},
				error:function(error){
						console.log(error);
						// window.location.reload();
				}
		});
	};
	var editData=function(a){
		var tr=$(a).parent().parent();
		var tds='';
		for (var i = 0; i < 5; i++) {
			if(i==4){
				var m=tr.children().eq(i).text();
				if(m.indexOf(";") != -1){
					m=m.split(';');
					for (var k = 0; k < m.length; k++) {
						if(m[k] == ''){
							m.splice(k,1);
						}
					}
					for (var k = 0; k < m.length; k++) {
						tds='use:'+m[k]+';'+tds
					}
					var td=tds;
				}else{
					var td='use:'+tr.children().eq(i).text();
				}
			}else{
				var td=tr.children().eq(i).text();
			}
			newTr.find('input[data-id="'+i+'"]').val(td);
		}
		get_user_option();
	};
	var get_user_option = function(){
		var id=$('input[data-id="0"]').val();
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: "/db/jsonp/ssdb0/user_option:"+id,
	        success: function(data) {
						// console.log(data);
						var tool=data.tool;
						var datas=data.datas;
						$('input[data-id="5"]').val(tool);
						$('input[data-id="6"]').val(datas);
	        },
	        error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
	    });
	}
	var getUse=function(){
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: "/db/scan/ssdb0/use:/use:~/200",
	        success: function(data) {
	        	$("#nav_list").empty();
						var all_d=[];
	            for (var i = 0; i < data.length; i++) {
	                var d=data[i];
									// console.log(d);
									// console.log(data[i]);
	               for(var j in data[i]){
	                   var t=JSON.parse(d[j]);
										 var names=t.name;
	                    var li=$(
	                        '<li data-id="'+j+'"><label></label><span>'+names+'</span></li>'
	                        );
	                    $("#nav_list").append(li);
											all_d.push(j);
	               }
	           }
						 var all=$('input[data-id="4"]').val();
						 if(all.indexOf(";") != -1){
							 var all_a=all.split(";");
							 all_a.pop();
							 for (var i = 0; i < all_a.length; i++) {
								 for(var k=0;k<all_d.length; k++){
									 if(all_a[i] == all_d[k]){
										 $('#nav_list li').eq(k).children('label').addClass('fxk_st');
									 }
								 }
							 }
						 }else{
							 for (var i = 0; i < all_d.length; i++) {
								 if(all_d[i] == all){
									 $('#nav_list li').eq(i).children('label').addClass('fxk_st');
								 }
							 }
						 }
	        },
	        error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
	    });
	};
	var getYq=function(){
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: "/db/jsonp/ssdb0/fea_stats",
	        success: function(data) {
				var engs=data.engs;
				//console.info(engs);
	        	$("#yq_list").empty();
	            for (var i = 1; i < engs.length; i++) {
	               for(var j in engs[i]){
	                    var li=$(
	                        '<li data-id="'+j+'"><a href="#">'+j+'</a></li>'
	                        );
	                    $("#yq_list").append(li);
	               }
	           }
	        },
	        error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
	    });
	}
	$("#nav_btn").click(function(){
		if($('.nav_nav').is(':hidden')){
			$('.nav_nav').slideDown();
			getUse();
		}else{
			$('.nav_nav').slideUp();
		}
	});
	$('#yq_btn,#yn_btn,#tool_btn,#data_btn').click(function() {
		$('.nav_nav').slideUp();
	});
	$("#yq_btn").click(function(){
		getYq();
	});
	$('body').on('click', '.nav_no', function() {
		/* Act on the event */
		$('.nav_nav').slideUp();
	});
	$('body').on('click', '.nav_ok', function() {
		/* Act on the event */
		var n=$(".fxk_st").length;
		if(n==0){
			alert('应用选择不能为空！');
		}else{
			var nav=[],val,vals='';
			for (var i = 0; i < n; i++) {
				var m=$(".fxk_st").eq(i).parent('li').attr('data-id');
				nav.push(m);
			}
			if(n==1){
				val=nav[0];
			}else{
				for (var i = 0; i < nav.length; i++) {
					vals=nav[i]+';'+vals;
				}
				val=vals
			}
			$('input[data-id="4"]').val(val);
			$('.nav_nav').slideUp();
		}
	});

		$('body').on('mouseover', '#nav_list li', function() {
			$('#nav_list li').removeClass('nav_list_a');
			if($(this).hasClass('nav_list_a')){
				$(this).removeClass('nav_list_a');
			}else{
				$(this).addClass('nav_list_a');
			}
		});
    $("body").on("click","#mh_list li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('input[data-id="3"]').val(val);
    });
    $("body").on("click","#yn_list li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('input[data-id="2"]').val(val);
        /*if ($('input[data-id="2"]').val()=='Y') {
			$('#yq_btn').attr('disabled',false);
		}else{
			$('#yq_btn').attr('disabled',true);
		}*/
    });
    $("body").on("click","#yq_list li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('input[data-id="3"]').val(val);
    });
		$("body").on("click","#nav_list li",function(){
			if($(this).children('label').hasClass('fxk_st')){
				$(this).children('label').removeClass('fxk_st');
			}else{
				$(this).children('label').addClass('fxk_st');
			}
    });
		$('body').on('click', '.nav_all', function() {
			if($('#nav_list li').children('label').hasClass('fxk_st')){
				$('#nav_list li').children('label').removeClass('fxk_st');
			}else{
				$('#nav_list li').children('label').addClass('fxk_st');
			}
		});
		$('#data_btn').click(function() {
			var div='<div class="data_zz"><div class="data_main"><div class="data_title"><h4 class="modal-title">数据属性</h4><div class="data_ma_m"></div><div class="data_bottom"><button class="btn btn-success data_ok">确定</button><button class="data_no btn btn-info">关闭</button></div></div></div></div>';
			if($('.data_zz').length>0){
				$('.data_zz').remove();
			}else{
				$('body').prepend(div);
				for (var i = 0; i < 10; i++) {
					$('.data_ma_m').append('<div><label for="la_key_'+i+'">key:</label><input id="la_key_'+i+'"><label for="la_val_'+i+'">value:</label><input id="la_val_'+i+'"></div>')
				}
				if($('input[data-id="6"]').val() != ''){
					var data=$('input[data-id="6"]').val();
					data=data.split(",");
					for (var i = 0; i < data.length; i++) {
						var key=data[i].split(":");
						$('#la_key_'+i).val(key[0]);
						$('#la_val_'+i).val(key[1]);
					}
				}
			}
		});
		$('body').on('click', '.data_no', function() {
			$('.data_zz').remove();
		});
		$('body').on('click', '.data_ok', function() {
			var data=[],keys=[];
			for (var i = 0; i < 10; i++) {
				var data_1=[];
				var key=$('#la_key_'+i).val();
				var val=$('#la_val_'+i).val();
				if(key != '' && val != ''){
					if(keys.indexOf(key) != -1){
						alert('key不能重复!');
						return false;
					}else{
						keys.push(key);
						data_1.push(key+':'+val);
						data.push(data_1);
					}
				}
			}
			$('input[data-id="6"]').val(data);
			$('.data_zz').remove();
		});
		$('#tool_btn').click(function() {
			getNav();
		});
		$("body").on("click","#tool_list li",function(){
        var val=$(this).attr("data-id");
        $('input[data-id="5"]').val(val);
    });
		var getNav=function(){
        $.ajax({
            type: "get",
            async: true,
            dataType:"jsonp",
            cache:false,
            url: "/db/scan/ssdb0/nav:/nav:~/200",
            success: function(data) {
                $("#tool_list").empty();
                for (var i = 0; i < data.length; i++) {
                    var d=data[i];
                   for(var j in data[i]){
                        var t=JSON.parse(d[j]);
                        t=t[0].ntitle;
                        var li=$(
                            '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
                            );
                        $("#tool_list").append(li);
                   }
               }
            },
            error:function(XMLHttpRequest,message){
                console.log(message)
            }
        });
    };
});
