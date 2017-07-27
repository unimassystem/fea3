//$("#content").empty();
var myChart;
var main_content=$('<div id="content">');
$("#main").html(main_content);

function getContent(key,dtitle){
	$("#title").text(dtitle);

	$.ajax({
		type: "get",
	   // async: true,
	    timeout : 1000*600,
	    dataType:"jsonp",
	    url: "/db/jsonp/ssdb0/"+key,             
	    success:success
	});
	//console.info(main_content);

}

//---------------------------------加载各个图----------------------------

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
//dnum,dtitle
function success(dataAll) {
	//console.info(dataAll);
	var chartList=dataAll[0].dnum;
	var hy=[],h_y;
	$.ajaxSetup({
    	async : false
    });
	for (var i = 0; i < chartList.length; i++) {
		//console.info(chartList[i]);
		//计算高度
		h_y=parseInt(chartList[i].height)+parseInt(chartList[i].y);
		hy.push(h_y);		
		getOption(chartList[i]);
		var div=$('<div id="'+time+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;"></div>');
		$("#content").append(div);
		//console.info(div);
		myChart=echarts.init(document.getElementById(time),'shine');
		$.getScript('../../plot/'+type+'.js',function(data, textStatus, jqxhr){
			//console.info(data, textStatus, jqxhr);
			draw(myChart,ckey,height,titles,xname,yname,width,div);			//console.log(i);			
		});
	}
	var heightMax=Math.max.apply(null,hy);//高度
	$("#content").css('height',heightMax);	
}

var top12=parseInt(window.screen.height)*0.1;

function targetC(domId,t,dbdk,cs){
	//console.info(domName,t,dbdk,cs);
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
		if(dbdk.indexOf("dashboard")!=-1){
    		getContent(dbdk);
    	}
	}else if(t=='down'){
		if (dbdk.indexOf("dashboard2")!=-1) {
			//console.info(domId);
			$.getScript('../../dbd/dbd2_view.js',function(data){
                getContent(dbdk,cs,'undefined',domId);  
              });
    		//window.frames[domName].location.href='../portal/dbd2_view.fh5?key='+dbdk+'&'+cs;
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		getContent(dbdk);
    	}else if(dbdk.indexOf("dp")!=-1){
    		window.frames[domName].location.href='../portal/more_view.fh5?key='+dbdk+'&'+cs;
    	}					
	}
	/*else if(t=='blank'){
		if (dbdk.indexOf("dashboard2")!=-1) {
    		window.open('../portal/dbd2_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		window.open('../portal/dbd_view.fh5?key='+dbdk);
    	}else if(dbdk.indexOf("dp")!=-1){
    		window.open('../portal/more_view.fh5?key='+dbdk+'&'+cs);
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
	}*/
}

function targetT(t,h,domName){
   	var href={};
        var str = h.split('?');
        strs = str[1].split("&");
        for(var i = 0; i < strs.length; i ++) {
            href[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
     t_dkey=href.key;
	if(t=='null'||''){
		return false;
	}else if(t=='up'){
		$("#two").dialog({
		    height:parseInt(window.screen.height)*0.8,
		    width:parseInt(window.screen.width)*0.8,
		    resizable: false
	  	});
	  	$(".ui-dialog").css({top:top12+'px'});	
	  	//console.info(t_dkey);
	  	if(t_dkey.indexOf("dashboard")!=-1){
    		getContent(t_dkey);
    	}
	}
}
