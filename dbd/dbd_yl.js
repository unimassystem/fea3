
	$("#content").empty();
	var theRequest ={};
	var key;
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
		 dtitle=theRequest.dtitle;
		return theRequest;
	}
	GetRequest();
	window.localStorage.setItem('mhs','portal1');
	if(dtitle!="undefined"){
		$("#dbdtitle").text(dtitle);
	}else{
		$("#dbdtitle").text("");
	}

	$.ajaxSetup({
    	async : false
    });
	$.ajax({
	    type: "get",
	    timeout : 1000*600,
	    dataType:"jsonp",
	    url: "/db/jsonp/ssdb0/"+key,
	    success: function(response) {
	    	//console.info(response);
	    	var result="";
	    	var hy=[],h_y,myChart;
			if(response.length>0){
				//dataarr=response;
				chartList=response[0].dnum;
				for (var i = 0; i < chartList.length; i++) {
					//console.info(chartList[i]);
					//计算高度
					h_y=parseInt(chartList[i].height)+parseInt(chartList[i].y);
					hy.push(h_y);
					getOption(chartList[i]);
					var div=$('<div id="'+time+'" class="'+border+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;z-index:'+zindex+';"></div>');
					$("#content").append(div);
					//console.info(div);
					myChart=echarts.init(document.getElementById(time),'shine');
					$.getScript('../plot/'+type+'.js',function(data, textStatus, jqxhr){
						//console.info(data, textStatus, jqxhr);
						try{
							eval("draw"+type+"(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legend);");
							if(chartList[i].refresh!=undefined && chartList[i].refresh != "" &&chartList[i].refresh!="0"){
								var refreshs = parseInt(chartList[i].refresh)*1000;
								setInterval(function(type,myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legend){
									eval("draw"+type+"(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legend);");
								},refreshs,type,myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legend)
							}else{}
						}catch(err){
							console.error(err);
						}
						// draw(myChart,ckey,height,titles,xname,yname,width,div);			//console.log(i);
					});
				}
				var heightMax=Math.max.apply(null,hy);//高度
				$("#content").css('height',heightMax);
			}

		 },
		 error:function(XMLHttpRequest,message){
				console.log(message)
			}
	});

//各个配置项 types,width,height,titles,x,y,xname,yname,time,refresh
function getOption(list){
	//console.info(list);
	type=list.types;
	ckey=list.df;
	width=list.width;
	height=list.height;
	titles=list.titles;
	x=list.x;
	y=list.y;
	xname=list.xname;
	yname=list.yname;
	time=list.time;
	refresh=list.refresh;
	if(list.border){
		border=list.border;
	}else{
		border='';
	}
	if(list.zindex){
		zindex=list.zindex;
	}else{
		zindex='0';
	}
	if(list.legend){
		legend=list.legend;
	}else{
		legend='true';
	}
}
var top12=parseInt(window.screen.height)*0.1;
function targetC(domName,t,dbdk,cs,k,g){
	if(t=='null'||''){
		return false;
	}else if(t=='up'){
		if(k != undefined || k != null){
			$("#two").dialog({
					height:g,
					width:k,
					resizable: false
			});

			var t=-g*0.5-top12+'px';
			var l=-k*0.5+'px';
			$(".ui-dialog").css({position:"fixed",top:"50%",left:"50%",marginTop:t,marginLeft:l});
		}else {
			$("#two").dialog({
				height:parseInt(window.screen.height)*0.8,
				width:parseInt(window.screen.width)*0.8,
				resizable: false
			});
			$(".ui-dialog").css({position:"fixed",top:top12+'px'});
		}
			$('.ui-dialog-titlebar button').addClass('up_close');
			//console.info(parseInt(window.screen.height)/2);
			if (dbdk.indexOf("dashboard2")!=-1) {
					$("#two iframe").attr('src','dbd2_view.fh5?key='+dbdk+'&'+cs);
			}else if(dbdk.indexOf("dashboard")!=-1){
					$("#two iframe").attr('src','dbd_view.fh5?key='+dbdk+'&mh='+mh);//+'&mh='+mh
			}else if(dbdk.indexOf("dp")!=-1){
					$("#two iframe").attr('src','more_view.fh5?key='+dbdk+'&'+cs);
			}else if(dbdk.indexOf("am")!=-1){
					$("#two iframe").attr('src','am_run.fh5?key='+dbdk+'&mh='+mh);
			}
	}else if(t=='down'){
		if (dbdk.indexOf("dashboard2")!=-1) {
    		window.frames[domName].location.href='../dbd/dbd2_view.fh5?key='+dbdk+'&'+cs;
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		window.frames[domName].location.href='../dbd/dbd_view.fh5?key='+dbdk
    	}else if(dbdk.indexOf("dp")!=-1){
    		window.frames[domName].location.href='../dbd/more_view.fh5?key='+dbdk+'&'+cs;
    	}
	}
	else if(t=='blank'){
		if (dbdk.indexOf("dashboard2")!=-1) {
    		window.open('dbd2_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		window.open('dbd_view.fh5?key='+dbdk);
    	}else if(dbdk.indexOf("dp")!=-1){
    		window.open('more_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("am")!=-1){
    		window.open('am_run.fh5?key='+dbdk);
    	}
	}else if(t=='top'){
		$.ajax({
			type: "get",
	        async: false,
	        timeout : 1000*600,
	        dataType:"jsonp",
	        url: "/db/jsonp/ssdb0/"+dbdk,
	        success:function(res){
	        	//console.info(res);
	        	if (dbdk.indexOf("dashboard2")!=-1) {
		    		var d2=res[0].dtitle;
	        		window.location.href='dbd2_view.fh5?key='+dbdk+'&'+cs+'&d2title='+d2;
		    	}else if(dbdk.indexOf("dashboard")!=-1){
		    		var d2=res[0].dtitle;
		    		window.location.href='dbd2_view.fh5?key='+dbdk+'&dtitle='+d2;
		    	}else if(dbdk.indexOf("dp")!=-1){
		    		var d2=res[0].mtitle;
		    		window.location.href='more_view.fh5?key='+dbdk+'&'+cs+'&mtitle='+d2;
		    	}else if(dbdk.indexOf("am")!=-1){
		    		var d2=res[0].dtitle;
		    		window.location.href='am_run.fh5?key='+dbdk+'&dtitle='+d2;
		    	}

	        }
		});
	}
}
function targetT(t,h,domName){
	//console.info(a);

	if(t=='null'||''){
		return false;
	}else if(t=='up'){
		$("#two").dialog({
		    height:parseInt(window.screen.height)*0.8,
		    width:parseInt(window.screen.width)*0.8,
		    resizable: false
	  	});
	  	$(".ui-dialog").css({top:top12+'px'});
	  	//$("#two iframe").attr('src','../dbd/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs);
	  	$("#two iframe").attr('src','../dbd/'+h);
	}else if(t=='down'){
		window.frames[domName].location.href='../dbd/'+h;
	}else if(t=='blank'){
		window.open('../dbd/'+h);
	}
	/*else if(t=='link'){
		unionEvent(domName,cs);
	}*/
	else if(t=='top'){
		window.location.href='../dbd/'+h;
	}
}

//link原语触发事件
var stopDefault=function(e){
		if ( e && e.preventDefault ) {
				e.preventDefault();
		}
		else{
				window.event.returnValue = false;
		}
};
$("body").on("click","a",function(e){
		stopDefault(e);
		var t=$(this).attr("targett");
		var h=$(this).attr("href");
		var p =   window.frameElement && window.frameElement.name || '';
		window.targetT(t,h,p);
		// window.parent.targetT(t,h,p);
		return false;
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
