var myChart, $img,screenBig;	
// 构建dom
var dpContent='<div id="content" style="margin-top: 10px;">'+  
    			'<ul class="banner move" style="width:1000%;padding-left: 0;">'+
        			'<li data-id="dp0" class="active"></li>'+
        			'<li data-id="dp1"></li>'+ 
        			'<li data-id="dp2"></li>'+ 
        			'<li data-id="dp3"></li>'+ 
        			'<li data-id="dp4"></li>'+ 
        			'<li data-id="dp5"></li>'+ 
        			'<li data-id="dp6"></li>'+ 
        			'<li data-id="dp7"></li>'+ 
        			'<li data-id="dp8"></li>'+         
        			'<li data-id="dp9"></li>'+
       				'<li data-id="dp10"></li>'+
    			'</ul>'+
    			'<a id="prev"></a>'+
    			'<a id="behind"></a>'+
    			'<div class="fomW"><div class="jsNav"></div></div>'+
  			'</div>';
$("#main").html(dpContent);

function getContent(key,dcs,mtitle){
	$.ajaxSetup({
    	async : false
    });
	$("#title").text(mtitle);
	$.ajax({
		type: "get",
	   // async: true,
	    timeout : 1000*600,
	    dataType:"jsonp",
	    url: "/db/jsonp/ssdb0/"+key,             
	    success:function(dataAll){
	    	var chartList=dataAll[0].dnum;
	    	success(chartList,dcs);
	    }
	});	
}

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

function success(dataNum,dcs){
	var result="";
	var screenNum=[];
	//console.info(dataNum);
	var longest=[];
	for(var i=0;i<dataNum.length;i++){
		var oo=[];
		var dp_one_height=parseInt(dataNum[i].height)+parseInt(dataNum[i].y)+36;
		longest.push(dp_one_height);
		var dpNum=dataNum[i].dp;
		screenNum.push(dpNum);
		dpNum=dpNum-1;
		var dpDiv=$('li[data-id="dp'+dpNum+'"]');
		//console.info(screenNum);
		var dfa=dataNum[i].df;
		if(dfa.indexOf('@')){
			for(var j in theRequest){
				var value=theRequest[j];
			 	d=dfa.replace(j,value);
			 	dfa=d;
			}						
		}else{
			dfa=dataNum[i].df;
		}
		getOption(dataNum[i]);
		var div=$('<div id="main'+i+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;"></div>');
		$(dpDiv).append(div);
		myChart=echarts.init(document.getElementById('main'+i),'shine');
		$.getScript('../../plot/'+type+'.js',function(data, textStatus, jqxhr){
			//console.info(data, textStatus, jqxhr);
			draw(myChart,dfa,height,titles,xname,yname,width,div);			//console.log(i);			
		});		
	} 
	//获取画的屏数量
	screenBig=Math.max.apply(null,screenNum);
	//画圆点
	for (var i = 0; i < screenBig; i++) {
		var aCircle='<a data-id="'+i+'" href="javascript:;"><img src="../../images/dpicon/portal1_fenye_yuan.png"></a>';
		$('.jsNav').append(aCircle);
	}
	//去掉多余的屏
	screenBig=screenBig-1;
	$('.banner li').css('height',Math.max.apply(null,longest));
	$('.banner li:gt('+screenBig+')').remove();

	$img=$('.jsNav').find('img');
	$img.eq(0).attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
}

	//----------------------------前后换屏---------------------
	var ulMove=0;
	var prev=function(){
		console.info(ulMove);
		ulMove=ulMove-1;
		if (ulMove<0) {
			alert("没有了");
		}else{
			$('#content ul').css('left','-'+ulMove+'00%');
			$img.attr('src','../../images/dpicon/portal1_fenye_yuan.png');
			$('.jsNav').find('a[data-id="'+ulMove+'"] img').attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
		}
	}
	$("#behind").click(function(){
		behind();
	});
	$("#prev").click(function(){
		prev();		
	});
	$(document).keypress(function(e){
		if (e.keyCode==37) {
			prev();	
		}else if(e.keyCode==39){
			behind();
		}
	});
	//--------------原点触发换屏------------
	//定义时间
	var defaults={
	     animateTime:300,
		 delayTime:5000
	};
	//赋值
	var _index=0;
	var $dp=$(".content");
	var $allLi=$dp.find('.banner li');
	var _len=$allLi.length;
	var int=setInterval(function(){
		ulMove=ulMove+1;
		if (ulMove>screenBig) {
			ulMove=0;
			$('.banner').css('left',0);
			$img.attr('src','../../images/dpicon/portal1_fenye_yuan.png');
			$img.eq(0).attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
		}else{
			var n2=-((ulMove+1)*100)+'%';		
			$('#content ul').css('left','-'+ulMove+'00%');
			$img.attr('src','../../images/dpicon/portal1_fenye_yuan.png');
			$img.eq(ulMove).attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
		}
	},10000);
	$('.jsNav').on('click','a',function(){
		$img.attr('src','../../images/dpicon/portal1_fenye_yuan.png');
		$(this).find('img').attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
		_index=$(this).index();	
		//console.info(_index);
		ulMove=_index;	
		showDP(_index);
	});
	//----------------双击返回
	$(document).on('dblclick','li',function(e){
		var _con = $('iframe[name="mypanel"]');   // 设置目标区域
		if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
		   $('.banner').css('left',0);
		}
	});
	function behind(){
		console.info(ulMove);
		ulMove=ulMove+1;
		if (ulMove>screenBig) {
			alert("已到底部，请返回上屏");
		}else{
			$('#content ul').css('left','-'+ulMove+'00%');
			$img.attr('src','../../images/dpicon/portal1_fenye_yuan.png');
			$img.eq(ulMove).attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
		}
	}
	function showDP(n){		
		var n2=-(n*100)+'%';
		//console.info(n2);
		$('.banner').css('left',n2);
	};

function dp(dataId){
	var $img=$('.jsNav').find('img');
	var ulMove;
	var n2=-(dataId*100)+'%';
	$('.banner').css('left',n2);
	ulMove=dataId;
	$img.attr('src','../../images/dpicon/portal1_fenye_yuan.png');
	$('a[data-id="'+dataId+'"]').find('img').attr('src','../../images/dpicon/portal1_fenye_yuan_hover.png');
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
	  	$("#two iframe").attr('src','../portal/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs);
	}else if(t=='down'){
		window.frames[domName].location.href='../portal/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs;			
	}
	// else if(t=='link'){
	// 	unionEvent(domName,cs);
	// }
	else if(t=='blank'){
		parent.window.open('../portal/dbd2_view_lblank.fh5?key='+dbdk+'&'+cs);
	}else if(t=='top'){
		console.info(dbdk);
		$.ajax({
			type: "get",
	        async: false,
	        timeout : 1000*600,
	        dataType:"jsonp",
	        url: "/db/jsonp/ssdb0/"+dbdk, 
	        success:function(res){
	        	//console.info(res);
	        	var d2=res[0].dtitle;
	        	if (dbdk.indexOf("dashboard2")!=-1) {
	        		window.location.href='../portal/dbd2_view_l.fh5?key='+dbdk+'&'+cs+'&d2title='+d2;
	        	}else if(dbdk.indexOf("dashboard")!=-1){
	        		window.location.href='../portal/dbd_view_l.fh5?key='+dbdk+'&dtitle='+d2;
	        	}
	        	
	        }
		});
	}
}
function targetT(t,h,domName){
	//console.info(domName);
	if(t=='null'||''){
		return false;
	}else if(t=='up'){
		$("#two").dialog({
		    height:parseInt(window.screen.height)*0.8,
		    width:parseInt(window.screen.width)*0.8,
		    resizable: false
	  	});
	  	$(".ui-dialog").css({top:top12+'px'});	
	  	//$("#two iframe").attr('src','../portal/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs);
	  	$("#two iframe").attr('src','../portal/'+h)
	}else if(t=='down'){
		window.frames[domName].location.href='../portal/'+h;
	}else if(t=='blank'){
		parent.window.open('../portal/'+h);
	}else if(t=='link'){
		unionEvent(domName,cs);
	}else if(t=='top'){
		window.location.href='../portal/'+h;
	}
}	
