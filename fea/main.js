$(document).ready(function(){
	$("#contentBox2,#contentBox3,#contentBox4,#contentBox5,#contentBox6").hide();
	var clickDialog="";
	var gaoji="";
	var gaoji2="";
	var kf="";
	var userName=$.cookie('userName');
	//var userPass=$.cookie('userPass');
	//console.info(userName);
	$('#userEdit .item1 a span').text(userName);
	//var content=$("#contentBox");
	//var arrow=$(".nr p span");
	var src='index.fh5';
	var frame='<iframe src="'+src+'" frameborder="0" scrolling="auto" height="100%" width="100%";></iframe>';
	$("#contentBox1").html(frame);
	var navLi=$(".menu .nav .list");
	$(".userandfind img").click(function(){
		$('#userEdit').fadeToggle();
	});
	$("#userEdit .item2").click(function(){
		$("#passModal").modal('toggle');
		$(".nav").css("padding-right","0px");
		$("#yhm span").text(userName);
	});
	var showSY=function(){
		var src='index.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" scrolling="auto" height="100%" width="100%";></iframe>';
		$("#contentBox1").html(frame);


	};
	/*$("#passModal").onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	       	changePass();
 		}
	};*/
	var changePass=function(name){
		var newPass=$("#newPass").val();
		var o={
			"name":name,
			"auth_key":newPass
		};
		o=JSON.stringify(o);
		$.ajax({
			type:'post',
			async: true,
			url:'/db/up_auth_key',
			data:{data:o},
			success:function(data){
				$("#passModal").modal('toggle');
				//window.location.href='login.fh5';
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});

	};
	var showKF=function(){
		kf = "one";
		var src='feaA.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%"; width="100%";></iframe>';
		$("#contentBox2").show();
		$("#contentBox2").html(frame);
	};
	var showKA=function(){
		gaoji2="one";
		var src='kibE.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%"; width="100%";></iframe>';
		$("#contentBox3").show();
		$("#contentBox3").html(frame);
	};
	var showGF=function(){
		gaoji="one";
		var src='/static/index0.html';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox4").show();
		$("#contentBox4").html(frame);
	};
	var showDB2=function(){
		var src='dbd2_mgr.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox5").show();
		$("#contentBox5").html(frame);
	};
	var showDB=function(){
		var src='dbd_mgr.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox5").show();
		$("#contentBox5").html(frame);
	};
	var showAM=function(){
		var src='am_mgr.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox5").show();
		$("#contentBox5").html(frame);
	};
	var showNAV=function(){
		var src='nav_mgr.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox5").show();
		$("#contentBox5").html(frame);
	};
	var showDP=function(){
		var src='more_mgr.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox5").show();
		$("#contentBox5").html(frame);
	};
	var showYH=function(){
		var src='user_mgr.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox6").show();
		$("#contentBox6").html(frame);
	};
	var zhuxiao=function(){
		$.ajax({
			type:'get',
			async: true,
			url:'/db/logout',
			success:function(data){
				console.log(data);
				window.location.href='login.fh5';
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	};
	var showSQM=function(){
		var src='sqm.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox6").show();
		$("#contentBox6").html(frame);
	}
	var showLOGO=function(){
		var src='yingyong.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox6").show();
		$("#contentBox6").html(frame);
	}
	var showImage=function(){
		var src='image.fh5';
		var frame='<iframe src="'+src+'" frameborder="0" height="100%" width="100%";></iframe>';
		$("#contentBox6").show();
		$("#contentBox6").html(frame);
	}
	var getDefines=function(a){
		$.ajax({
			type:'get',
			async: true,
			url:'/db/define/'+a,
			success:function(data){
				//console.log(data);
				clickDialog=data;
				$('#'+a).find('iframe').attr('src','http://'+data);
				//console.log(data);
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	};
	var getLan=function(){
		var feaTxt=$("#feaName").val();
		var cs;
		var csArr=[];
		$("#csTable tr:gt(0)").each(function(i,dom){
			var id=$(dom).children().eq(0).find('input').val();
			var value=$(dom).children().eq(1).find('input').val();
			//console.info(value);
			cs=id+'='+value;
			csArr.push(cs);
		});
		csArr1=csArr.join(",");
		return lang='run '+feaTxt+' with ('+csArr1+')';
	};
	var runData=function(){
		var language=getLan();
		//console.info(language);
		/*$("#dateCon").html("");
		$("#message").html("");*/
		$.ajax({
	        type: "get",
	        dataType : 'json',
	        async: true,
	        timeout : 1000*600, //超时时间设置，单位毫秒
	        url: "/exec?prmtv="+language,
	        success: function(response) {
	            //console.info(response);
	            var ST = response["result"][0].ST;
	            var TI = response["result"][0].TI;
	            //console.info(ST);
	            localStorage.st=ST;
				localStorage.ti=TI;
	            check();

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
               	alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
	        }
	    });
	};
	var check=function(){
		//console.info(a);
		$("#message tbody").html("");
		$.ajax({
            type: "get",
            async: true,
            dataType : 'json',
            timeout : 1000*600, //超时时间设置，单位毫秒
            url: "/exec?prmtv=check task by "+localStorage.ti+" with ("+localStorage.st+")",
            success: function(response) {
             // console.info(response);
                var progress=response.result.progress;
                var isAlive=response.result.isAlive;
                var endTime=response.result.end_time;
                var error_count=response.result.error_count;
                var error=response.result.error_info;
                $('#progress').text(progress);
                if(isAlive===true){
				setTimeout(check(),8000);
				//return false;
                }
                else{
                	$("#message .kssj").text(localStorage.st);
                	$("#message .jssj").text(endTime);
                	$("#message .errorCount").text(error_count);
                	$('#progress').text("100%");
                }
                if(error){
                	var tr=$('<tr><td>'+error+'</td></tr>');
                	$('#message tbody').append(tr);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
            }
        });
	};
	var checkZZ=function(dfname){
		//console.info(dfname);
		$("#loadMessage tbody").html("");
		$.ajax({
            type: "get",
            async: true,
            dataType : 'json',
            timeout : 1000*600, //超时时间设置，单位毫秒
            url: "/exec?prmtv=check task by "+localStorage.ti+" with ("+localStorage.st+")",
            success: function(response) {
             // console.info(response);
                var progress=response.result.progress;
                var isAlive=response.result.isAlive;
              	var endTime=response.result.end_time;
               // var error_count=response.result.error_count;
                var error=response.result.error_info;
                $('#LoadProgress').text(progress);
                if(isAlive==true){
					setTimeout(checkZZ(dfname),3000);
					//return false;
                }
                else{
                	$("#loadMessage .kssj").text(localStorage.st);
                	$("#loadMessage .jssj").text(endTime);
                	//$("#loadMessage .errorCount").text(error_count);
                	$('#LoadProgress').text("100%");
                	getDataLength(dfname);
                }
                if(error){
                	var tr=$('<tr><td>'+error+'</td></tr>');
                	$('#loadMessage tbody').append(tr);
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
            }
        });
	};
	var getDataLength=function(dfname){
		$.ajax({
	        type: "get",
	        dataType : 'json',
	        async: true,
	        timeout : 1000*600, //超时时间设置，单位毫秒
	        url: "/exec?prmtv=show tables",
	        success: function(response) {
	          // console.info(dfname);
	        	var result=response.result;
	        	result=JSON.parse(result);
	        	var data=result.data;
	        	var len;
	        	for (var i = 0; i < data.length; i++) {
	        		var d=data[i];
	        		if(d[0]==dfname){
	        			len=d[3];
	        		}
	        	}
	        	//console.info(len);
	        	if(len){
	        		$("#len").text('共'+len+'条数据');
	        	}else{
	        		$("#len").text('共 0 条数据');
	        	}


	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
               	alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
	        }
	    });
	};
	var getFeaTxt=function(){
		$.ajax({
	        type: "get",
	        dataType : 'json',
	        async: true,
	        timeout : 1000*600, //超时时间设置，单位毫秒
	        url: "/list_fea",
	        success: function(response) {
	           //console.info(response);
	           var data=response.data;
	           $("#runList").html("");
	           for (var i = 0; i < data.length; i++) {
	           	var li='<li><a href="#">'+data[i]+'</a></li>';
	           //	console.info(li);
	           	$("#runList").append(li);
	           }

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
               	alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
	        }
	    });
	};
	var addRow=function(){
		var tr='<tr>\
					<td><input class="form-control" type="text"></td>\
					<td><input class="form-control" type="text"></td>\
					<td><a class="glyphicon glyphicon-plus plus" style="color: red;"></a></td>\
					<td><a class="glyphicon glyphicon-minus remove" style="color: green"></a></td>\
				</tr>';
		$("#csTable tbody").append(tr);
	};
	var csShow=function(a){
		if(a=="NOSQL"){
			$("body").find('.csvShow').hide();
			$("#canshu").val('by ssdb0 query poeple:24h');
		}else if(a=="JDBC"){
			$("body").find('.csvShow').hide();
			$("#canshu").val('by jdbc0 with udba213  query "select * from log group by people"');
		}else if(a=="UDB(scan)"){
			$("body").find('.csvShow').hide();
			$("#canshu").val('load udb by udb0 scan (scan语句)');
		}
		else if(a=="UDB(query)"){
			$("body").find('.csvShow').hide();
			$("#canshu").val('load udb by udb0 query (select * from people)');
		}/*else if(a=="ESQL"){
			$("body").find('.csvShow').hide();
			$("#canshu").val('by udb0 query  (select * from people where XM=张)');
		}*/else if(a=="CSV"){
			$("body").find('.csvShow').show();
			$("#canshu").val('with 参数');
		}
		else if(a=="PKL"){
			$("body").find('.csvShow').show();
			$("#canshu").val('with 参数');
		}
	};
	var loadOk=function(a){
		var lan;
		if(a=="NOSQL"){
			lan=$("#loadTxt").val()+' := load ssdb '+$("#canshu").val();
		}else if(a=="JDBC"){
			lan=$("#loadTxt").val()+' := load jdbc '+$("#canshu").val();
		}else if(a=="UDB(scan)"){
			lan=$("#loadTxt").val()+' := load udb '+$("#canshu").val();
		}else if(a=="UDB(query)"){
			lan=$("#loadTxt").val()+' := load udb '+$("#canshu").val();
		}/*else if(a=="ESQL"){
			lan=$("#loadTxt").val()+' := load udb '+$("#canshu").val();
		}*/else if(a=="CSV"){
			lan=$("#loadTxt").val()+' := load csv by '+$('#txttype').val()+' '+$("#canshu").val();
		}
		else if(a=="PKL"){
			lan=$("#loadTxt").val()+' := load pkl by '+$('#txttype').val()+' '+$("#canshu").val();
		}
		$.ajax({
			url:"/exec?prmtv="+lan,
			type:'get',
			cache : false,
			success:function(data){
				//console.info(data);
				var data=JSON.parse(data);
				var error=data.error;
				var ret=data.ret;
				if(error){
                	var tr=$('<tr><td>'+error+'</td></tr>');
                	$('#loadMessage tbody').append(tr);
                }
				var ST = data["result"][0].ST;
	            var TI = data["result"][0].TI;
	            //console.info(ST);
	            localStorage.st=ST;
				localStorage.ti=TI;

	            checkZZ($("#loadTxt").val());
			}
		});
	};
	var shangchuan=function(a,b){
		//console.info(b);
		$.jUploader({
			button: a, // 这里设置按钮id
			action: '/putfile?filetype='+b, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
			cancelable: true, // 可取消上传
			allowedExtensions: ['csv','fea','excel','data','txt','pkl'], // 只允许上传
			messages: {
			upload: '上传文件',
			cancel: '取消上传',
			emptyFile: "{file} 为空，请选择一个文件.",
			invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
			onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
			},
			onUpload:function(fileName){
				console.info(fileName);
			},
			onComplete: function (fileName, response) {
				// response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
				alert("上传成功");

			}
	  	});
	};
	var showData=function(){
		$("#txtType").html('');
		$.ajax({
	        type: "get",
	        dataType : 'json',
	        async: true,
	        timeout : 1000*600, //超时时间设置，单位毫秒
	        url: "/list_data",
	        success: function(response) {
	           //console.info(response);

	           var data=response.data;
	           for (var i = 0; i < data.length; i++) {
	           	var li='<li><a href="#">'+data[i]+'</a></li>';
	           //	console.info(li);
	           	$("#txtType").append(li);
	           }

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
               	alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
	        }
	    });
	};
	$(navLi).eq(0).click(function(){
		$("#contentBox2,#contentBox3,#contentBox4,#contentBox5,#contentBox6").hide();
		$("#contentBox1").show();
		showSY();
	});
	navLi.eq(1).click(function(){
		$("#contentBox1,#contentBox3,#contentBox4,#contentBox5,#contentBox6").hide();
		$("#contentBox2").show();
		if (!kf){
			showKF();
		}
	});
	navLi.eq(2).click(function(){
		$("#contentBox1,#contentBox2,#contentBox4,#contentBox5,#contentBox6").hide();
		$("#contentBox3").show();
		if(!gaoji2){
			showKA();
		}
	});
	navLi.eq(3).click(function(){
		$("#contentBox2,#contentBox1,#contentBox3,#contentBox5,#contentBox6").hide();
		$("#contentBox4").show();
		if(!gaoji){
			showGF();
		}
	});
	navLi.eq(4).find(".sec a").eq(0).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox6").hide();
		$("#contentBox5").show();
		showDB();
	});
	navLi.eq(4).find(".sec a").eq(1).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox6").hide();
		$("#contentBox5").show();
		showDB2();
	});
	navLi.eq(4).find(".sec a").eq(2).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox6").hide();
		$("#contentBox5").show();
		showAM();
	});
	navLi.eq(4).find(".sec a").eq(4).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox6").hide();
		$("#contentBox5").show();
		showNAV();
	});
	navLi.eq(4).find(".sec a").eq(3).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox6").hide();
		$("#contentBox5").show();
		showDP();
	});
	navLi.eq(5).find(".sec a").eq(0).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox5").hide();
		$("#contentBox6").show();
		showYH();
	});
	navLi.eq(5).find(".sec a").eq(1).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox5").hide();
		$("#contentBox6").show();
		showSQM();
	});
	navLi.eq(5).find(".sec a").eq(2).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox5").hide();
		$("#contentBox6").show();
		showLOGO();
	});
	navLi.eq(5).find(".sec a").eq(3).click(function(){
		$("#contentBox2,#contentBox3,#contentBox1,#contentBox4,#contentBox5").hide();
		$("#contentBox6").show();
		showImage();
	});
	$("#submit").click(function(){
		changePass(userName);
	});
	$("#userEdit .item3").click(function(){
		zhuxiao();
	});
	var di_h=parseInt(window.screen.height)*0.8
	var di_w=parseInt(window.screen.width)*0.8
	$(".icon1 .one").click(function(){
		$( "#data" ).dialog({
			height:600,
			width:1000,
			resizable: false
		});
		$("#loadMessage .kssj").text("");
		$("#loadMessage .jssj").text("");
		$("#loadMessage tbody").html("");
		shangchuan('shangchuan','data');
	});
	$(".icon1 .two").click(function(){
		$( "#udb0" ).dialog({
			height:600,
			width:1000,
			resizable: false
		});
		if(!clickDialog){
			getDefines('udb0');
		}

	});
	$(".icon1 .three").click(function(){
		$( "#jdbc0" ).dialog({
			height:di_h,
			width:di_w,
			resizable: false
		});
		if(!clickDialog){
			getDefines('jdbc0');
		}

	});
	$(".icon1 .four").click(function(){
		$( "#ckq" ).dialog({
			height:di_h,
			width:di_w,
			resizable: false
		});
		//getDefines();
	});
	$(".icon1 .five").click(function(){
		$( "#runData" ).dialog({
			height:600,
			width:1000,
			resizable: false
		});
		$("#message .kssj").text("");
		$("#message .jssj").text("");
		$("#message .errorCount").text("");
		$("#message tbody").html("");
		shangchuan('shangchuan2','fea');
	});
	$("#ok").click(function(){
		runData();
	});
	$("#runButton").click(function(){
		getFeaTxt();
	});
	$("body").on('click','.plus',function(){
		addRow();
	})
	$("body").on('click','.remove',function(){
		$(this).parent().parent().remove();
	});
	$("body").on('click','#runList li',function(){
		var a=$(this).find('a').text();
		$("#feaName").val(a);
	});
	$("body").on('click','#loadType li',function(){
		var a=$(this).find('a').text();
		$("#type").val(a);
		csShow(a);
	});
	$("#loadOk").click(function(){
		var b=$("#type").val();
		loadOk(b);
	});
	$("#txtType_btn").click(function(){
		showData();
	});
	$("body").on('click','#txtType li',function(){
		var a=$(this).find('a').text();
		$("#txttype").val(a);
		//csShow(a);
	});
});
