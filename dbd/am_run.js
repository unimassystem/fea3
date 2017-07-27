$(document).ready(function () {
	$("#dbdView").html("");
	var theRequest ={};
	var data,amCS,csArr1,mh;
	var tb=$("#run_table tbody");
	$('#downLoad').attr("disabled",'disabled');
	function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var a=decodeURI(url);
	if (a.indexOf("?") != -1) {
	    var str = a.substr(1);
	    strs = str.split("&");
	    for(var i = 0; i < strs.length; i ++) {
	        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	    }
	}
	key=theRequest.key;
	atitle=theRequest.atitle;
	mh=theRequest.mh;
	//console.info(atitle);
	return theRequest;
	}
	GetRequest();
	function loadSytle(url) {
	 	//console.info(url);
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    loadSytle('../portal/'+mh+'/'+mh+'_total.css');
	delete theRequest["atitle"];
	delete theRequest["key"];
	delete theRequest["editor"];
	delete theRequest["mh"];
	//console.info($.isEmptyObject(theRequest));


	$.ajax({
		type: "get",
        async: false,
        timeout : 1000*600,
        dataType:"jsonp",
        url: "/db/jsonp/ssdb0/"+key,
        success: function(res) {
        	//console.info(res);
        	if(res.length>0){
        		data=res[0];
        		$("#feaChoose input").val(data.txt);
        		$("#dbdKey").val(data.dbdView);
        		var trArr=data.anum;

        		//console.info(trArr);
        		//刚进入的时候展示勾选的参数;
        		for (var i = 0; i < trArr.length; i++) {
    				if(trArr[i].choose==true){
    					// console.info(trArr[i].union);
    					var unionC=$('<select class="param_select">');
    					getUnion(trArr[i].union,unionC);
    					var upLoad=$('<div id="btn_'+i+'" class="btn up" type="button" ><span>上传文件</span></div>');
        				//dataUpLoad(upLoad);
    					var div1=$('<div data-id="'+trArr[i].id+'" class="param_box">'+
	                				'<div class="param_txt">'+trArr[i].name+'</div>'+
	                				'<input type="text" class="form-control" style="border:0;width:280px;height:35px;float:left;padding:0 10px;" value="'+trArr[i].value+'">'+
	            				'</div>');
    					if(trArr[i].union!='没有关联字典'){
    						div1.append(unionC);
    					}else if (trArr[i].type=='文件上传') {
    						div1.append(upLoad);
    					}
        				$("#runDiv").append(div1);
    				}
    			}
    			//判断是否存在theRequest
    			var dataShow=$(".param_box");
    			//console.info(dataShow);
    			if ($.isEmptyObject(theRequest)==false){
    				for(var j in theRequest){
    					var value=theRequest[j];
    					for (var i = 0; i < dataShow.length; i++) {//遍历显示的参数
    						var dataId=$(dataShow[i]).attr("data-id");
    			//比较两个id，如果相等(表示那个传进来的参数的choose就是true，否则就是false)那就改变显示的默认值
    						if(dataId==j){
    							$(dataShow[i]).find('input').val(value);
    						}else{
    							//console.info(j,trArr[i].id);
    							for (var k = 0; k< trArr.length; k++) {
    								if (j==trArr[k].id){
    									//console.info(j,trArr[i].id)
	    								//alert();
	    								trArr[k].value=value;
	    							}
    							}
    						}
    					}
    				}
    				//console.info(trArr);
    				localStorage.trArrs=JSON.stringify(trArr);
    				runfea();

    			}
    			//console.info(trArr);
    			localStorage.trArrs=JSON.stringify(trArr);
        	}
        }
	});
	function getUnion(union,unionC){
		if(union!='没有关联字典'){
			$.ajax({
				type: "get",
		        async: false,
		        timeout : 1000*600,
		        dataType:"jsonp",
		        url: "/db/jsonp/ssdb0/"+union,
		        success:function(json){
		        	var dataAll=json.data;
		        	var unionOO=[];
		        	for (var j = 0; j < dataAll.length; j++) {
		        		var unionO='<option value="'+dataAll[j][1]+'">'+dataAll[j][0]+'</option>';
		        		unionOO.push(unionO);
		        	}
		        	unionC.html(unionOO);
		        }
			});
		}else{
			return false;
		}
	}
	//文件上传
	$('body').on('click','.up',function(e){
		//console.info(e.currentTarget.id);
		$.jUploader({
			button: e.currentTarget.id, // 这里设置按钮id
			action: '/putfile?filetype=data', // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
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
			onComplete: function (fileName, response) {;
				var i=$('#'+ e.currentTarget.id).prev()
				i.val(fileName);
				// response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
				alert("上传成功");

			}
	  	});
	})
	//console.info($('.unionO').size());
	$("body").on("change",".param_select",function(e){
		//alert();
		 var inp=$(this).prev();
		 var text=$(this).find('option:selected').text();
		 inp.val(text);

		 inp.attr("placeholder",$(this).val());
		 //console.info(text,$(this).val());
	});


	function getLan(){
		var feaTxt=data.txt;
		var cs,cs2,value1;
		var csArr=[];
		$("#runDiv").find(".param_box").each(function(i,dom){
			var id=$(dom).attr("data-id");
			var value=$(dom).find('input').attr("placeholder");
			if(value){
				//console.info(value);
				value1=value;
			}else{
				value1=$(dom).find('input').val();
			}
			//console.info(value1);
			cs=id+'='+value1;
			csArr.push(cs);
		});
		var trArr=JSON.parse(localStorage.trArrs);

		for (var i = 0; i < trArr.length; i++) {
			if(trArr[i].choose==false){
				cs2=trArr[i].id+'='+trArr[i].value;
				csArr.push(cs2);
			}
		}
		//console.info(csArr);
		csArr1=csArr.join(",");
		amCS=csArr.join("&");
		//console.info(csArr1);
		//console.info(amCS);
		return lang='run '+feaTxt+' with ('+csArr1+')';
	};

	function runfea(){
		//alert();
		var language=getLan();
		//console.info(language);
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

	function check(){
		//console.info(check);
		$.ajax({
            type: "get",
            async: true,
            dataType : 'json',
            timeout : 1000*600, //超时时间设置，单位毫秒
            url: "/exec?prmtv=check task by "+localStorage.ti+" with ("+localStorage.st+")",
            success: function(response) {
                var progress=response.result.progress;
                var isAlive=response.result.isAlive;
               // console.info(progress);
                $("#jd").text(progress);
                var ifDp=data.dbdView.split(":");
                ifDp=ifDp[0];
               // console.info(ifDp);
                if(isAlive===true){
									$("#run").addClass("am_unclick");
									setTimeout(function(){check()},3000);
                }
                else{
                	$("#jd").text("100%");
                	$("#run").removeClass("am_unclick");
                	//判断是否为多屏
                	if(ifDp!='dp'){
                		var dbd='<iframe src="dbd2_view.fh5?key='+data.dbdView+'&'+amCS+'&mh='+mh+'" frameborder="0" width="100%" height="1000px" scrolling="auto"></iframe>';

                	}else{
                		var dbd='<iframe src="more_view.fh5?key='+data.dbdView+'&'+amCS+'&mh='+mh+'" frameborder="0" width="100%" height="1000px" scrolling="auto"></iframe>';
                	}
									$("#dbdView").html(dbd);
									$("#downLoad").removeAttr("disabled");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
            }
        });
	};
	function getDpData(id){
		console.info(id);

	};
	var loadDf=function(c,i,title){
		$('#showData ul').html("");
		$.ajax({
			type: "get",
	        async: true,
	        timeout : 1000*600,
	        dataType:"json",
	        url: '/exec?prmtv=xyy_'+i+' = load ssdb by ssdb0 query '+c,
	        success:function(response){
	        	$.ajax({
					type: "get",
			        async: true,
			        timeout : 1000*600,
			        dataType:"json",
			        url: '/exec?prmtv=store xyy_'+i+' to csv by xyy_'+i+'.csv',
			        success:function(response){
			        	$("#showData").dialog({
			        		height:300,
							width:300,
							resizable: false
			        	});

			        	var li='<li><a href="/workspace/xyy_'+i+'.csv">xyy_'+i+' '+title+'</a></li>';
			        	$('#showData ul').append(li);
			        }
		        });
	        }
        });
	};
	var getDbdKey=function(a){
		$.ajax({
			type: "get",
	        async: true,
	        timeout : 1000*600,
	        dataType:"jsonp",
	        url: "/db/jsonp/ssdb0/"+a,
	        success:function(response){
	        //console.info(response);
	        	var dbd=response[0];
	        	var dnum=dbd.dnum;
	        	//console.info(dnum);
	        	var cs=csArr1.split(',');
	        	//console.info(cs);
	        	var css={};
	        	for(var i = 0; i < cs.length; i ++) {
			        css[cs[i].split("=")[0]]=unescape(cs[i].split("=")[1]);
			    }
			   // console.info(css);
	        	for (var i=0;i<dnum.length;i++) {
	        		var df= dnum[i].df;
	        		var dtitle=dnum[i].titles;
					for(var j in css){
						var value=css[j];
					 	d=df.replace(j,value);
					 	df=d;
					}
					//console.info(df);
					loadDf(df,i,dtitle);
    		 	}
	        }
		});
	};
	var downLoad=function(){
		$.ajax({
			type: "get",
	        async: true,
	        timeout : 1000*600,
	        dataType:"jsonp",
	        url: "/db/jsonp/ssdb0/"+key,
	        success:function(response){
	        	var data=response[0];
	        	var dbd_key=data.dbdView;
	        	//console.info(dbd_key);
	        	getDbdKey(dbd_key);
	        }
		});
	};

	function xz(){
		var div='<div id="hover_dh" style="position:fixed;top:0;left:0;width:5px; height:100%;"></div>';
		$('body').prepend(div);
	};
	xz();
	$('body').on('mouseover','#hover_dh',function(){
		$("#run_box").animate({left:"0"});
	});
	var timer;
	$('body').on('mouseleave','#run_box',function(){
		if($("#jd").text() =='100%'){
			timer = setTimeout(function () { $("#run_box").animate({left:"-300px"}); }, 600)
		}
	});

	$("#run").click(function(){
		runfea();
		setInterval(function() {
			if($("#jd").text() =='100%'){
				timer = setTimeout(function () { $("#run_box").animate({left:"-300px"}); }, 600)
				return true;
			}
		},1000)
	});
	/*$('#top').mouseover(function(e){
		$("#run_box").slideToggle();
	})*/
	$("#downLoad").click(function(){
		downLoad();
	})

	function targetC(domName,t,dbdk,cs){
		//console.info(domName);
		if(t=='null'||''){
			return false;
		}else if(t=='up'){
			//var	top11=;
			//top12=$('#main',parent.document).scrollTop();
			// top12=$(window).height();
			// console.info(parseInt(top12)/2);
			$("#two").dialog({
			    height:parseInt(window.screen.height)*0.8,
			    width:parseInt(window.screen.width)*0.8,
			    resizable: false
		  	});
		  	//console.info(parseInt(window.screen.height)/2);
		  	//$(".ui-dialog").css({position:"fixed",top:top12+'px'});
		  	$("#two iframe").attr('src','../portal/dbd2_view_bdown.fh5?key='+dbdk+'&'+cs);
		}else if(t=='down'){
			window.frames[domName].location.href='../portal/dbd2_view_bdown.fh5?key='+dbdk+'&'+cs;
		}else if(t=='blank'){
			parent.window.open('../portal/dbd2_view_lblank.fh5?key='+dbdk+'&'+cs);
		}
		/*else if(t=='link'){
			unionEvent(domName,cs);
		}*/
		else if(t=='top'){
			$.ajax({
				type: "get",
		        async: false,
		        timeout : 1000*600,
		        dataType:"jsonp",
		        url: "/db/jsonp/ssdb0/"+dbdk,
		        success:function(res){
		        	//console.info(res);
		        	var d2=res[0].dtitle;
		        	window.location.href='../portal/dbd2_view.fh5?key='+dbdk+'&'+cs+'&d2title='+d2;
		        }
			});

		}
	}
	function targetT(t,h,domName){
		console.info(t,h);
		if(t=='null'||''){
			return false;
		}else if(t=='up'){
			$("#two").dialog({
			    height:parseInt(window.screen.height)*0.8,
			    width:parseInt(window.screen.width)*0.8,
			    resizable: false
		  	});
		  	//$(".ui-dialog").css({top:top12+'px'});
		  	//$("#two iframe").attr('src','../portal/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs);
		  	$("#two iframe").attr('src','../portal/'+h);
		}else if(t=='down'){
			window.frames[domName].location.href='../portal/'+h;
		}else if(t=='blank'){
			parent.window.open('../portal/'+h);
		}
		/*else if(t=='link'){
			unionEvent(domName,cs);
		}*/
		else if(t=='top'){
			window.location.href='../portal/'+h;
		}
	}

});

function targetUp(dbdk,cs,k,g){
	// var l=parseInt(window.screen.width)*0.1;
	if(k == undefined || k == null){
		var l=parseInt(window.screen.width)*0.1;
		var t=parseInt(window.screen.height)*0.1;
		var l1=-l*0.5;
		var t1=-t*0.5-top12;
		var divs='<div class="target_up" style="width:'+l+'px;height:'+t+'px;position:fixed;top:50%; margin-top:'+t1+'px;left:50%;margin-left:'+l1+'px;"><div class="up_close" onmousedown="up_close(this)" style="cursor:pointer; position:absolute;"></div><iframe src="" frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div>';
	}else {
		var t=-g*0.5-top12;
		var l=-k*0.5;
		var divs='<div class="target_up" style="width:'+k+'px;height:'+g+'px;position:fixed;top:50%; margin-top:'+t+'px;left:50%;margin-left:'+l+'px;"><div class="up_close" onmousedown="up_close(this)" style="cursor:pointer; position:absolute;"></div><iframe src="" frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div>';
	}
	// var divs='<div class="target_up" style="width:'+k+'px;height:'+g+'px;position:fixed;top:'+top12+'px;left:'+l+'px;"><div class="up_close" onmousedown="up_close(this)" style="cursor:pointer; position:absolute;"></div><iframe src="" frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div>';
  $(parent.document.body).prepend(divs);
  if (dbdk.indexOf("dashboard2")!=-1) {
      $(".target_up iframe",parent.document).attr('src','dbd2_view.fh5?key='+dbdk+'&'+cs);
  }else if(dbdk.indexOf("dashboard")!=-1){
      $(".target_up iframe",parent.document).attr('src','dbd_view.fh5?key='+dbdk);
  }else if(dbdk.indexOf("dp")!=-1){
      $(".target_up iframe",parent.document).attr('src','more_view.fh5?key='+dbdk+'&'+cs);
  }
}
function up_close(t){
	$(t).parent().remove();
}
