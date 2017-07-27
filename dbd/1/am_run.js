// 构建dom
var runBox=$('<div  id="top"></div>'+
			'<div id="run_box" style="background:transparent;background-color:rgba(255,255,255,0);">'+        
        		'<div id="runDiv" style="overflow: hidden;"></div>'+
       			'<div class="col-md-12 mar" >'+
            		'<button id="downLoad" class="btn" disabled="disabled">导出数据</button>'+
            		'<button id="run" class="btn">查询</button>'+
            		'<button id="jd" class="btn">0</button>'+           
       			'</div>'+          
    		'</div>'+
    		'<div id="dbdView"></div>'+
    		'<div id="showData">'+
        		'<ul class="list-unstyled"></ul>'+
    		'</div>');

//$("#main").html(runBox);

$("#dbdView").html("");
$("#main").html(runBox);
var data,amCS,csArr1;;
var tb=$("#run_table tbody");
$('#downLoad').attr("disabled",'disabled');

function getContent(key,atitle,dbdcs){
	$("#title").text(atitle);
	$.ajax({
		type: "get",
        async: false,
        dataType:"jsonp",
        url: "/db/jsonp/ssdb0/"+key,             
        success: function(res) {
        	if (res)
        	success(res,dbdcs);       	
        }
    });
}

function success(res,dcs){
	//console.info(res,dcs_obj);
	if(res.length>0){
		data=res[0];
		$("#feaChoose input").val(data.txt);
		$("#dbdKey").val(data.dbdView);
		var trArr=data.anum; 		
		//console.info(trArr);      		
		//刚进入的时候展示勾选的参数;
		for (var i = 0; i < trArr.length; i++) { 
			if(trArr[i].choose==true){
				console.info(trArr[i].union);
				var unionC=$('<select class="unionO">');    					
				getUnion(trArr[i].union,unionC);  
				var upLoad=$('<div id="btn_'+i+'" class="btn up" type="button" ><span>上传文件</span></div>');
				//dataUpLoad(upLoad);  					
				var div1=$('<div data-id="'+trArr[i].id+'" class="cv" style="width:480px;float:left;margin-right:20px;margin-bottom:5px;">'+
            				'<div class="cvu">'+trArr[i].name+'</div>'+ 
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
		//判断是否存在dcs_obj
		var dataShow=$(".cv");
		//console.info(dataShow);
		if(dcs){
			dcs=dcs.split("&");
			var dcs_obj={};
		    for (var i = 0; i < dcs.length; i++) {
		      dcs_obj[dcs[i].split("=")[0]]=unescape(dcs[i].split("=")[1]);
		    }
		    for(var j in dcs_obj){
				var value=dcs_obj[j];
				for (var i = 0; i < dataShow.length; i++) {//遍历显示的参数
					var dataId=$(dataShow[i]).attr("data-id");
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
	$("body").on("change",".unionO",function(e){
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
		$("#runDiv").find(".cv").each(function(i,dom){
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
            //async: fal,
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
					$("#run").addClass("gray");
					setTimeout(function(){check()},3000);
                }
                else{
                	$("#jd").text("100%");
                	$("#run").removeClass("gray");
                	//判断是否为多屏
                	if(ifDp!='dp'){
                		$.ajaxSetup({
					    	async : false
					    });
                		$.getScript('../../dbd/dbd2_view.js',function(datas){
                			//console.info(data.dbdView);
			                getContent(data.dbdView,amCS);  
			            });                              		
                	}else{
                		var dbd='<iframe src="../portal/more_view.fh5?key='+data.dbdView+'&'+amCS+'" frameborder="0" width="100%" height="1000px" scrolling="auto"></iframe>';
                	}
					
					//console.info('key='+data.dbdView+'&'+amCS);
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
	$("#run").click(function(){
		runfea();
		/*$("#run_box").slideToggle();*/
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


