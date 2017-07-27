var myChart;


function getContent(key,dcs,d2title,domId){
	if (!domId) {
		var main_content=$('<div id="content">');
		$("#main").html(main_content);
	}
	$.ajaxSetup({
    	async : false
    });
    if (d2title!='undefined') $("#title").text(d2title);	
	$.ajax({
		type: "get",
	   // async: true,
	    timeout : 1000*600,
	    dataType:"jsonp",
	    url: "/db/jsonp/ssdb0/"+key,             
	    success:function(dataAll){
	    	var chartList=dataAll[0].dnum;
	    	success(chartList,dcs,domId);
	    }
	});	
}

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
}

function success(chartList,dcs,domId){
	//console.info($(domId).size());
	var hy=[],h_y;
	//参数组装成对象；
	dcs=dcs.split("&");
	var dcs_obj={};
    for (var i = 0; i < dcs.length; i++) {
      dcs_obj[dcs[i].split("=")[0]]=unescape(dcs[i].split("=")[1]);
    }

	for (var i = 0; i < chartList.length; i++) {
		//计算高度
		h_y=parseInt(chartList[i].height)+parseInt(chartList[i].y);
		hy.push(h_y);		
		getOption(chartList[i]);
		
		for(var j in dcs_obj){
			var value=dcs_obj[j];
		 	d=ckey.replace(j,value);
		 	ckey=d;
		}
		if (!domId) {//console.info(ckey);
			var div=$('<div id="'+time+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;"></div>');
			$("#content").append(div);	
			myChart=echarts.init(document.getElementById(time),'shine');
		}else{
			var idLink=$(domId).attr("id");
			var div=$(domId);
			myChart=echarts.init(document.getElementById(idLink),'shine');
			//console.info(myChart);
		}
		$.getScript('../../plot/'+type+'.js',function(data, textStatus, jqxhr){
			//console.info(data, textStatus, jqxhr);
			draw(myChart,ckey,height,titles,xname,yname,width,div);			//console.log(i);			
		});
	}
}	
	
var top12=parseInt(window.screen.height)*0.1;			
function targetC(domName,t,dbdk,cs){
	if(t=='null'||''){
		return false;
	}else if(t=='up'){
		$("#two").dialog({
		    height:parseInt(window.screen.height)*0.8,
		    width:parseInt(window.screen.width)*0.8,
		    resizable: false
	  	});
	  	//console.info(parseInt(window.screen.height)/2);
	  	$(".ui-dialog").css({position:"fixed",top:top12+'px'});	
	  	if (dbdk.indexOf("dashboard2")!=-1) {
    		$("#two iframe").attr('src','../portal/dbd2_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		$("#two iframe").attr('src','../portal/dbd_view.fh5?key='+dbdk);
    	}else if(dbdk.indexOf("dp")!=-1){
    		$("#two iframe").attr('src','../portal/more_view.fh5?key='+dbdk+'&'+cs);
    	}
	}else if(t=='down'){
		if (dbdk.indexOf("dashboard2")!=-1) {
    		window.frames[domName].location.href='../portal/dbd2_view.fh5?key='+dbdk+'&'+cs;
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		window.frames[domName].location.href='../portal/dbd_view.fh5?key='+dbdk
    	}else if(dbdk.indexOf("dp")!=-1){
    		window.frames[domName].location.href='../portal/more_view.fh5?key='+dbdk+'&'+cs;
    	}					
	}
	else if(t=='blank'){
		if (dbdk.indexOf("dashboard2")!=-1) {
    		parent.window.open('../portal/dbd2_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		parent.window.open('../portal/dbd_view.fh5?key='+dbdk);
    	}else if(dbdk.indexOf("dp")!=-1){
    		parent.window.open('../portal/more_view.fh5?key='+dbdk+'&'+cs);
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
	        		window.location.href='../portal/dbd2_view.fh5?key='+dbdk+'&'+cs+'&d2title='+d2;
		    	}else if(dbdk.indexOf("dashboard")!=-1){
		    		var d2=res[0].dtitle;
		    		window.location.href='../portal/dbd2_view.fh5?key='+dbdk+'&dtitle='+d2;
		    	}else if(dbdk.indexOf("dp")!=-1){
		    		var d2=res[0].mtitle;
		    		window.location.href='../portal/more_view.fh5?key='+dbdk+'&'+cs+'&mtitle='+d2;
		    	}
	        	
	        }
		});
	}
}
