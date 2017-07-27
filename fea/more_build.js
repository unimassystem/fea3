
$(document).ready(function(){
	//清空配置项
$("#key").val("");$("#width").val("800");
$("#height").val("480");$("#types").val("01");
$("#title").val("");$("#x").val("0");$("#refresh").val("");
$("#y").val("0");$("#yname").val("");$("#xname").val("");
$("#t_zindex").val("5");
$('#t_legend').attr('data-id','false');
$('#t_border').attr('data-id','无');

$("#screenName").val('1');
//2017.7.25 ycj 修改构建页面标尺
	function bc_csh() {
		var w=$(window).width();
		var h=$(window).height();
		if(w>4096){
			$('#maint').css('width', w);
		}
		if(h>2160){
			$('#maint').css('height', h);
		}
		$('#zxxScaleBox').css('top','353px');
	}
	bc_csh();
$("#czIcon a").eq(3).hover(function(){
	$(this).find('img').attr('src','img/icon/draw-hover.png');
},function(){
	$(this).find('img').attr('src','img/icon/draw.png');
});
$("#czIcon a").eq(2).hover(function(){
	$(this).find('img').attr('src','img/icon/save-hover.png');
},function(){
	$(this).find('img').attr('src','img/icon/save.png');
});
$("#czIcon a").eq(1).hover(function(){
	$(this).find('img').attr('src','img/icon/yulan-hover.png');
},function(){
	$(this).find('img').attr('src','img/icon/yulan.png');
});
$("#czIcon a").eq(0).hover(function(){
	$(this).find('img').attr('src','img/icon/back-hover.png');
},function(){
	$(this).find('img').attr('src','img/icon/back.png');
});

$('.box_false').hide();
$('.box').css('height','350px');
$('#maint').css('top','330px');

$('.box_bottom').click(function() {
	if($('.box_bottom').hasClass('one_click_box')){
		$('.box_bottom').removeClass('one_click_box');
		$('.box').animate({'height':'350px'}, 1000);
		$('.box_false').slideUp(1000);
		$('#maint').animate({'top':'330px'}, 1000)
		$('#zxxScaleBox').animate({'top':'353px'}, 1000)
	}else{
		$('.box_bottom').addClass('one_click_box')
		$('.box').animate({'height':'445px'}, 1000);
		$('.box_false').slideDown(1000);
		$('#maint').animate({'top':'430px'}, 1000);
		$('#zxxScaleBox').animate({'top':'453px'}, 1000);
	}
});

var theRequest ={},oNum={},oNumArr=[],df,dfEnd;
var dataNum=[],dataTitle,divFrame,allKey=[],allDiv;
//获取地址栏里的key以及dtitle;
GetRequest();
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
	mtitle=theRequest.mtitle;
	editor=theRequest.editor;
	return theRequest;
}
delete theRequest["mtitle"];
delete theRequest["key"];
delete theRequest["editor"];

	dfEnd=theRequest;


//console.info(theRequest);
dataTitle=mtitle;


$("#build_top").text(mtitle);
//初始化图
var oo=[],hy=[],h_y,myChart,cs;
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
    	//.info(response.length);
    	var oo=[];
    	var result="";
    	$('#maint').ruler();
		if(response.length>0){
			//dataarr=response;
			dataNum=response[0].dnum;
			for(var i=0;i<dataNum.length;i++){
				var keyObj={
					name:dataNum[i].df+'+'+dataNum[i].types,
					value:dataNum[i].time
				};
				allKey.push(keyObj);
				var dpNum=dataNum[i].dp;
				dpNum=dpNum-1;
				var dpDiv=$('li[data-id="dp'+dpNum+'"]');
				var dfa=dataNum[i].df;
				//console.info(dfa);
				if(dfa.indexOf('@')!=-1){
					//console.info(theRequest);
					for(var j in theRequest){
						var value=theRequest[j];
					 	d=dfa.replace(j,value);
					 	dfa=d;
					}
				}else{
					//console.info(dfa.indexOf('@'));
					dfa=dataNum[i].df;
				}
				//console.info(dfa);
				// var xx=parseInt(dataNum[i].x)+18;
				// var yy=parseInt(dataNum[i].y)+18;
				h_y=parseInt(dataNum[i].height)+parseInt(dataNum[i].y);
				hy.push(h_y);
				getOption(dataNum[i]);
				var xx=parseInt(dataNum[i].x);
				var yy=parseInt(dataNum[i].y);
				oo.push("key="+dfa,"width="+width,"height="+height,"types="+type,"title="+titles,"refresh="+refresh,"xname="+xname,"yname="+yname,"border="+border,"zindex="+zindex,"legend="+legend);
				cs=oo.join("&");
				var div=$('<div id="main'+i+'" class="'+border+'" data-id="'+time+'" data-src="'+cs+'" name="mypanel" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+yy+'px;left:'+xx+'px;outline: 1px solid #000;outline-offset:-1px;z-index:'+zindex+';"></div>');
				$(dpDiv).append(div);
				myChart=echarts.init(document.getElementById('main'+i),'shine');
				$.getScript('../plot/'+type+'.js',function(data, textStatus, jqxhr){
					try{
						eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
						if(refresh!=undefined && refresh != "" &&refresh!="0"){
							var refreshs = parseInt(dataNum[i].refresh)*1000;
							setInterval(function(type,myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend){
								eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
								if(div.find($(".icon")).length == 0){
									var result=	'<div class="icon" style="width:'+width+'px;background-color:rgba(37,40,42,0.2);position:absolute;top:0;left:0;z-index:0;">'+
						  						'<img class="delete" src="img/icon/close_X_01.png" alt="删除" style="cursor:pointer;float:right;">'+
						  						'<img class="drag" src="img/icon/tuodong_icon.png" alt="拖拽" style="cursor:pointer;float:right;">'+
						  					'</div>';
										//console.info(result);
									$(div).append(result);
								}
							},refreshs,type,myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend)
						}else{}
					}catch(err){
						console.error(err);
					}
					var result=	'<div class="icon" style="width:'+dataNum[i].width+'px;background-color:rgba(37,40,42,0.2);position:absolute;top:0;left:0;z-index:0;">'+
		  						'<img class="delete" src="img/icon/close_X_01.png" alt="删除" style="cursor:pointer;float:right;">'+
		  						'<img class="drag" src="img/icon/tuodong_icon.png" alt="拖拽" style="cursor:pointer;float:right;">'+
		  					'</div>';
						//console.info(result);
					$(div).append(result);
				});

			}
			// $('div[data-id="dp0"]').css('display','block');
			var last=dataNum[0];
			if(last.border == undefined){
				last.border='';
				last.zindex='0';
				last.legend='true';
			}
			$("#key").val(last.df);$("#width").val(last.width);
			$("#height").val(last.height);$("#types").val(last.types);
			$("#title").val(last.titles);$("#x").val(last.x);$("#refresh").val(last.refresh);
			$("#y").val(last.y);$("#xname").val(last.xname);$("#yname").val(last.yname);
			$("#t_border").attr('data-id',last.border);
			$("#t_zindex").val(last.zindex);
			$("#t_legend").attr('data-id',last.legend);
			//$("#main").html("");
			$('#maint').ruler();
		}
		//拖动的对象和配置对应

		tuozhuai();
	 }
});
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
 //$('#main').unslider();
var liWidth=$("#maint").width();
var ulWidth=liWidth*10;
$("#maint ul").css('width',ulWidth);
//console.info(ulWidth);
var y1;
//---------------所有门户选择菜单按钮-------------------------
//选择图类型
$(".navul").html('');
$(".content").html('');
$('#close_tb_select,#tb_select').click(function() {
	$("#smallChart").slideUp();
});
$("#chartButton").click(function(){
  $(".content").html('');
	$(".navul").html('');
	// $("#smallChart").modal("toggle");
	$("#smallChart").slideDown();
	for(var i=0;i<menu_data.length;i++){
		$(".navul").append('<li><a href="#" target="_self">'+menu_data[i].name+'</a></li>');
      //判断选择框内时候没有数字
      if($('#types').val() == null){
      	// alert(0)
        $(".navul li:first").addClass('navbg');
        var n=0;
  			$(".navul li").removeClass('navbg')

  			$(".navul li:first").addClass('navbg').siblings("li").removeClass("navbg");
  			var div4='<div class="ajq">',div3='';
        for(var j=0;j<menu_data[n].title.length;j++){
          var div2='<a href="#" role="'+n+'" data-id="'+menu_data[n].title[j].type+'"><p>'+menu_data[n].title[j].name+'</p><img src="'+menu_data[n].title[j].img+'"></a>'
          div3+=div2
        }
        var div1='<div class="'+menu_data[n].class+'" id="">';
        var p1='<p class="title">'+menu_data[n].name+'</p>';
        var content=div1+p1+div4+div3+'</div>'+'</div>'
				$(".content").html('')
				$(".content").append(content);
  			$('.content a').click(function(){
  				var a_id=$(this).attr('data-id');
          var a_role=$(this).attr('role');
  				//console.info(a_id);
  				$('#types').val(a_id);
          $('#types').attr('role',a_role);
  				// $("#smallChart").modal("toggle");
$("#smallChart").slideUp();
  			});
      }else{
        if($('#types').attr('role') == null){
        	// alert(1)
          $(".navul li:first").addClass('navbg');
          var n=0;
    			$(".navul li").removeClass('navbg')
    			$(".navul li:first").addClass('navbg').siblings("li").removeClass("navbg");
    			var div4='<div class="ajq">',div3='';
          for(var j=0;j<menu_data[n].title.length;j++){
            var div2='<a href="#" role="'+n+'" data-id="'+menu_data[n].title[j].type+'"><p>'+menu_data[n].title[j].name+'</p><img src="'+menu_data[n].title[j].img+'"></a>'
            div3+=div2;
          }
          var div1='<div class="'+menu_data[n].class+'" id="">';
          var p1='<p class="title">'+menu_data[n].name+'</p>';
          var content=div1+p1+div4+div3+'</div>'+'</div>'
					$(".content").html('')
          $(".content").append(content);
					// console.log(content);
					// // $(".content").not('div[class="'+menu_data[n].class+'"].second').html('')
					// console.log(content);
    			$('.content a').click(function(){
    				var a_id=$(this).attr('data-id');
            var a_role=$(this).attr('role');
    				//console.info(a_id);
    				$('#types').val(a_id);
            $('#types').attr('role',a_role);
    				// $("#smallChart").modal("toggle");
$("#smallChart").slideUp();
    			});
        }else{
        	// alert(2)
        	//$(".content").html('');
          var n=$('#types').attr('role');
          $(".navul li").removeClass('navbg')
          $(".navul li").eq(n).addClass('navbg')
    			$(".navul li").eq(n).addClass('navbg').siblings("li").removeClass("navbg");
    			var div4='<div class="ajq">',div3='';
          for(var j=0;j<menu_data[n].title.length;j++){
            var div2='<a href="#" role="'+n+'" data-id="'+menu_data[n].title[j].type+'"><p>'+menu_data[n].title[j].name+'</p><img src="'+menu_data[n].title[j].img+'"></a>'
            div3+=div2
          }
          var div1='<div class="'+menu_data[n].class+'" id="">';
          var p1='<p class="title">'+menu_data[n].name+'</p>';
          var content=div1+p1+div4+div3+'</div>'+'</div>'
					$(".content").html('')
          $(".content").append(content);
    			$('.content a').click(function(){
    				var a_id=$(this).attr('data-id');
            var a_role=$(this).attr('role');
    				//console.info(a_id);
    				$('#types').val(a_id);
            $('#types').attr('role',a_role);
    				// $("#smallChart").modal("toggle");
$("#smallChart").slideUp();
    			});
        }
      }

		// $(".navul li:first").addClass('navbg');
		$(".navul li").click(function() {
			$(".content div").show();
			$(".content").html('');
			var n=$(".navul li").index(this)
			$(".navul li").removeClass('navbg')
			$(this).addClass('navbg').siblings("li").removeClass("navbg");
			var div4='<div class="ajq">',div3='';
      for(var j=0;j<menu_data[n].title.length;j++){
        var div2='<a href="#" role="'+n+'"  data-id="'+menu_data[n].title[j].type+'"><p>'+menu_data[n].title[j].name+'</p><img src="'+menu_data[n].title[j].img+'"></a>'
        div3+=div2
      }
      var div1='<div class="'+menu_data[n].class+'" id="">';
      var p1='<p class="title">'+menu_data[n].name+'</p>';
      var content=div1+p1+div4+div3+'</div>'+'</div>'
      $(".content").append(content);
			$('.content a').click(function(){
				var a_id=$(this).attr('data-id');
        var a_role=$(this).attr('role');
        //console.info(a_id);
        $('#types').val(a_id);
        $('#types').attr('role',a_role);
				// $("#smallChart").modal("toggle");
$("#smallChart").slideUp();
			});
		});
	}
	//鼠标移开时触发
	$('body').on('mouseleave', '.content a', function(event) {
		$('.tb_xz_tc').remove();
	})
	//鼠标移入图表选择之后触发
	$('body').on('mouseenter', '.content a', function(event) {
		// event.preventDefault();
		/* Act on the event */
		if($('.tb_xz_tc')){
			$('.tb_xz_tc').remove();
		}
		var a_id=$(this).attr('data-id');
		var a_role=$(this).attr('role');

		var H=$(window).height();
		var W=$(window).width();


				if($('#key').val() != ''){
						var key=$('#key').val();
						for(var j in dfEnd){
							var value=dfEnd[j];
						 	d=key.replace(j,value);
						 	key=d;
						}
						// $.ajaxSetup({
						// 	async : false
						// });
						$.ajax({
								type: "get",
								cache : false,
								dataType:"jsonp",
								url: "/db/jsonp/ssdb0/"+key,
								success: function(response) {
									// console.info(response);
									if(response){
										var oEvent=event;
										var oDiv=document.createElement('div');
										if((H-oEvent.clientY)<350){
											oDiv.style.top=oEvent.clientY-350+'px';  // 指定创建的DIV在文档中距离顶部的位置
										}else{
											oDiv.style.top=oEvent.clientY+'px';  // 指定创建的DIV在文档中距离顶部的位置
										}
										if((W-oEvent.clientX)<350){
											oDiv.style.left=oEvent.clientX-350+'px';  // 指定创建的DIV在文档中距离左侧的位置
										}else{
											oDiv.style.left=oEvent.clientX+'px';  // 指定创建的DIV在文档中距离左侧的位置
										}
								        // oDiv.style.border='1px solid #FF0000'; // 设置边框
								        oDiv.style.position='fixed'; // 为新创建的DIV指定绝对定位
								        oDiv.style.width='350px'; // 指定宽度
								        oDiv.style.height='350px'; // 指定高度
								        oDiv.style.zIndex =1050; //
								        oDiv.style.backgroundColor ='#fff'; //
												oDiv.classList.add("tb_xz_tc");
								        document.body.appendChild(oDiv);
												$('.tb_xz_tc').css('overflow', 'hidden').css('box-shadow', '0px 1px 1px 2px #ccc').css('padding', '15px');
										var width=$('.tb_xz_tc').width();
										var height=$('.tb_xz_tc').height();
										var titles='预览';
										var x='',y='';
										//获取创建的时间，作为唯一标识
										var time=new Date();
										time=time.getTime();
										//获取配置项内容
										var oo=[];
										var border='';
										var zindex='1050';
										var legend='true';
										oo.push("key="+key,"width="+width,"height="+height,"types="+a_id);
										var cs=oo.join("&");
									  	//创建dom
								  	var div1=$('<div id="'+time+'" class="'+border+'" name="mypanel" data-id="'+time+'" data-src="'+cs+'" name="mypanel" style="width:'+width+'px;height:'+height+'px;margin:auto;overflow:hidden;z-index:'+zindex+';"></div>');
										$(".tb_xz_tc").append(div1);
										myChart=echarts.init(document.getElementById(time),'shine');
										$.getScript('../plot/'+a_id+'.js',function(data, textStatus, jqxhr){
											try{
												eval("draw"+a_id+"(myChart,key,height,titles,x,y,width,div1,border,zindex,legend);");
											}catch(err){
												console.error(err);
											}
										});
									}
							 },
							 error:function(error){
									 console.log(error);
							 }
						});
					}
	});
});

//绘图
$("#huitu").on('click',function(){
	//判断是哪一屏and获取该screen的div
	var whichScreen=$("#screenName").val();
	whichScreen=whichScreen-1;
	/*$('.dpArr').css('display','none');*/
	var whichDiv=$('li[data-id="dp'+whichScreen+'"]');
	var two=-(whichScreen*100)+'%';
	//console.info(two);
	//$('.dpArr').css('display','none');
	$('.banner-ul').css('left',two);
	//获取创建的时间，作为唯一标识
	var time=new Date();
	time=time.getTime();
	//获取配置项内容;
	peizhi();
	allKey.push({name:oNum.df+'+'+oNum.types,value:time});
	oNum.time=time;
	oNum.df=$("#key").val();
	//console.info(oNum);
    if(oNum.x == ''){
        oNum.x=0;
    }
    if(oNum.y == ''){
        oNum.y=0;
    }
	yy=parseInt(oNum.y);
	xx=parseInt(oNum.x);
	dataNum.push(oNum);
	//console.info(dataNum);
	var oo=[];
	//console.info(df);
	/*$(whichDiv).css({'display':'block','width':oNum.width,'height':oNum.height});*/
	oo.push("key="+df,"width="+oNum.width,"height="+oNum.height,"types="+oNum.types,"title="+oNum.titles,"refresh="+oNum.refresh,"xname="+oNum.xname,"yname="+oNum.yname,"border="+oNum.border,"zindex="+oNum.zindex,"legend="+oNum.legend);
	var cs=oo.join("&");

  	var div=$('<div id="'+time+'" class="'+oNum.border+'" data-id="'+time+'" data-src="'+cs+'" name="mypanel" style="width:'+oNum.width+'px;height:'+oNum.height+'px;position:absolute;top:'+yy+'px;left:'+xx+'px;outline: 1px solid #000;outline-offset:-1px;z-index:'+oNum.zindex+';"></div>');
	$(whichDiv).append(div);
	myChart=echarts.init(document.getElementById(time),'shine');
	$.getScript('../plot/'+oNum.types+'.js',function(data, textStatus, jqxhr){
		try{
			eval("draw"+oNum.types+"(myChart,df,oNum.height,oNum.titles,oNum.xname,oNum.yname,oNum.width,div,oNum.border,oNum.zindex,oNum.legend);");
			if(oNum.refresh!=undefined && oNum.refresh != "" && oNum.refresh!="0"){
				var refreshs = parseInt(oNum.refresh)*1000;
				setInterval(function(type,myChart,df,height,titles,xname,yname,width,div,border,zindex,legend){
					eval("draw"+type+"(myChart,df,height,titles,xname,yname,width,div,border,zindex,legend);");
					if(div.find($(".icon")).length == 0){
						var result=	'<div class="icon" style="width:'+width+'px;background-color:rgba(37,40,42,0.2);position:absolute;top:0;left:0;z-index:0;">'+
										'<img class="delete" src="img/icon/close_X_01.png" alt="删除" style="cursor:pointer;float:right;">'+
										'<img class="drag" src="img/icon/tuodong_icon.png" alt="拖拽" style="cursor:pointer;float:right;">'+
									'</div>';
							//console.info(result);
						$(div).append(result);
					}
				},refreshs,oNum.type,myChart,df,oNum.height,oNum.titles,oNum.xname,oNum.yname,oNum.width,div,oNum.border,oNum.zindex,oNum.legend)
			}else{}
		}catch(err){
			console.error(err);
		}
		var result=	'<div class="icon" style="width:'+oNum.width+'px;background-color:rgba(37,40,42,0.2);position:absolute;top:0;left:0;z-index:0;">'+
						'<img class="delete" src="img/icon/close_X_01.png" alt="删除" style="cursor:pointer;float:right;">'+
						'<img class="drag" src="img/icon/tuodong_icon.png" alt="拖拽" style="cursor:pointer;float:right;">'+
					'</div>';
			//console.info(result);
		$(div).append(result);
		tuozhuai();
	});

});

function peizhi(){
	df=$("#key").val();
	for(var j in dfEnd){
		var value=dfEnd[j];
	 	d=df.replace(j,value);
	 	df=d;
	}
	if($("#t_border").attr('data-id') == '无'){
		var borders='';
	}else{
		var borders=$("#t_border").attr('data-id');
	}
	oNum={
		"df":df,
		"width":$("#width").val(),
		"height":$("#height").val(),
		"types":$("#types").val(),
		"titles":$("#title").val(),
		"x":$("#x").val(),
		"y":$("#y").val(),
		"xname":$("#xname").val(),
		"yname":$("#yname").val(),
		"time":"",
		"refresh":$("#refresh").val(),
		"dp":$("#screenName").val(),
		"border":borders,
		"zindex":$("#t_zindex").val(),
		"legend":$("#t_legend").attr('data-id')
	};
	//dataNum.push({dnum:oNum});
	//console.info(dataNum);
}
function tuozhuai(){
	$('div[name="mypanel"]').each(function(i,dom){
		var csObj={};
	  	$(dom).draggable({
		  drag: function(event,ui) {
		  	//console.info(ui);
		  	$(this).find('.icon').css("background-color","#3ecfff");
			$("div[name='mypanel']").not(this).find('.icon').css("background-color","#cfdce4");
		  	var obj=$(dom).attr("data-src");
			var csStr=obj.split("&");
			for(var i = 0; i < csStr.length; i ++) {
		        csObj[csStr[i].split("=")[0]]=unescape(csStr[i].split("=")[1]);
		    }
		    $.each(csObj,function(id,value){
		    	if (id=='key'){
		    		$('#'+id).val($("#key").val());
		    	}else{
		    		$('#'+id).val(value);
		    	}

		    });
			 $("#x").val(parseInt((ui.position).left));
			 $("#y").val(parseInt((ui.position).top));
			 border_legend();
		  },
		  stop:function(event,ui){
		  	//$("div[name='mypanel']").not(this).css("background-color","#cfdce4");
		  	var t=$(this).attr("data-id");
		  	peizhi();
		  	oNum.time=t;
		  	oNum.df=$("#key").val();
		  	//console.info(oNum.df);
		  	//oNum.titles=$("#title").val();
		  	//console.info(o);
		  	//console.info(dataarr);
		  	for (var i = 0; i < dataNum.length; i++) {
				if (t==dataNum[i].time) {
					//alert();
					dataNum.splice($.inArray(dataNum[i],dataNum),1);
					dataNum.push(oNum);
				}
			}
			border_legend();
		  		//console.info(dataarr);
		  }
	  });
  });
}
//多屏之间的切换
$("#screenList a").click(function(){
	var one=$(this).text();
	$("#screenName").val(one);
	one=one-1;
	var two=-(one*100)+'%';
	//console.info(two);
	//$('.dpArr').css('display','none');
	$('.banner-ul').css('left',two);
});
//保存
$("#save").on('click',function(){
	//console.info(dataNum);
	//console.info(dataarr);
	if(dataNum.length ===0){
		alert("数据为空");
		return false;
	}
	//if(dataNum.length !=0){
		var oo={
			dnum:dataNum,
			mtitle:dataTitle,
			mcs:dfEnd,
			editor:editor
		};
		dataarr=[];
		dataarr.push(oo);
	  	var string=JSON.stringify(dataarr);
	  //	console.info(dataNum);
	  	$.ajax({
		 	type: "post",
         	async: true,
         	dataType:"json",
         	url: "/db/put/ssdb0/"+key,
         	data: {value:string},
         	success: function(response) {
         		alert("保存成功");
         	}
    	});
    	alert("保存成功");
	//}
});
//删除
$("body").on("click",'div[name="mypanel"] .delete',function(){
	$(this).parent().parent().remove();
	var t=$(this).parent().parent().attr("data-id");
	for (var i = 0; i < dataNum.length; i++) {
		if (t==dataNum[i].time) {
			//alert();
			dataNum.splice($.inArray(dataNum[i],dataNum),1);
		}
	}
	for (var i = 0; i < allKey.length; i++) {
		if (t==allKey[i].value) {
			//alert();
			allKey.splice($.inArray(allKey[i],allKey),1);
		}
	}
});
$("#runButton").click(function(e){
	$("#runList").empty();
	for (var i = 0; i < allKey.length; i++) {
		var li='<li data-id="'+allKey[i].value+'"><a href="#">'+allKey[i].name+'</a></li>';
		$("#runList").append(li);
	}
});
$("body").on('click','#runList li',function(){
	var a=$(this).find('a').text();
	$("#feaName").val(a);
	var uniqe=$(this).attr('data-id');
	var csObj={};
	allDiv=$('div[name="mypanel"]');
	for (var i = 0; i < allDiv.length; i++) {
		if(uniqe==$(allDiv[i]).attr('data-id')){
			$(allDiv).removeClass('maxZ');
			$(allDiv[i]).addClass('maxZ');
			$(allDiv).find('.icon').css("background-color","#cfdce4");
			$(allDiv[i]).find('.icon').css("background-color","#3ecfff");
		}
	}
	for (var i = 0; i < dataNum.length; i++) {

	 	if(uniqe==dataNum[i].time){
			if(dataNum[i].border == undefined){
				dataNum[i].border='';
				dataNum[i].zindex='0';
				dataNum[i].legend='true';
			}
		 	$("#key").val(dataNum[i].df);
		 	$("#width").val(dataNum[i].width);
			$("#height").val(dataNum[i].height);
			$("#types").val(dataNum[i].types);
			$("#title").val(dataNum[i].titles);
			$("#x").val(dataNum[i].x);
			$("#y").val(dataNum[i].y);
			$("#xname").val(dataNum[i].xname);
			$("#yname").val(dataNum[i].yname);
			$("#refresh").val(dataNum[i].refresh);
			$("#t_border").attr('data-id',dataNum[i].border);
			$("#t_zindex").val(dataNum[i].zindex);
			$("#t_legend").attr('data-id',dataNum[i].legend);
	 	}
	 }
	 border_legend();
});

$("body").on("click","div[name='mypanel']",function(e){
	$('div[name="mypanel"]').removeClass('zdex');
	$(this).addClass('zdex');
	$(this).find('.icon').css("background-color","#3ecfff");
	$("div[name='mypanel']").not(this).find('.icon').css("background-color","#cfdce4");
	var t=$(this).attr("data-id");//获取时间
	$('div[name="mypanel"]').removeClass('maxZ');
	$(this).addClass('maxZ');
	 for (var i = 0; i < dataNum.length; i++) {
	 	if(t==dataNum[i].time){
			if(dataNum[i].border == undefined){
				dataNum[i].border='';
				dataNum[i].zindex='0';
				dataNum[i].legend='true';
			}
		 	$("#key").val(dataNum[i].df);
		 	$("#width").val(dataNum[i].width);
			$("#height").val(dataNum[i].height);
			$("#types").val(dataNum[i].types);
			$("#title").val(dataNum[i].titles);
			$("#x").val(dataNum[i].x);
			$("#y").val(dataNum[i].y);
			$("#xname").val(dataNum[i].xname);
			$("#yname").val(dataNum[i].yname);
			$("#refresh").val(dataNum[i].refresh);
			$("#t_border").attr('data-id',dataNum[i].border);
			$("#t_zindex").val(dataNum[i].zindex);
			$("#t_legend").attr('data-id',dataNum[i].legend);
			border_legend();
	 	}
	 }
});
$("body").on("click","#yulan",function(){
	var cs=$.param(theRequest);
	cs=decodeURIComponent(cs);
	window.open('../dbd/more_yl.fh5?key='+key+'&mtitle='+mtitle+'&'+cs);
});
$("#back").on('click',function(){
	window.location.href='more_mgr.fh5';
});
Array.prototype.del=function(n) {
	if(n<0){
       return this;
	}else{
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	}
	}

	$('body').on('click', '#t_border_ul li', function() {
		var a_text=$(this).children('a').text();
		$('#t_border').val(a_text);
		var a_data=$(this).attr('data-id');
		$('#t_border').attr('data-id',a_data);
	});
	$('body').on('click', '#t_zindex_ul li', function() {
		var a_text=$(this).children('a').text();
		$('#t_zindex').val(a_text);
	});
	$('body').on('click', '#t_legend_ul li', function() {
		var a_text=$(this).children('a').text();
		$('#t_legend').val(a_text);
		var a_data=$(this).attr('data-id');
		$('#t_legend').attr('data-id',a_data);
	});
	function border_legend(){
		var a=$('#t_border').attr('data-id');
		var b=$('#t_legend').attr('data-id');
		if(a == 'border_1'){
			var q=$('#t_border_ul li').eq(1).children('a').text();
			$('#t_border').val(q);
		}
		if(a == 'border_2'){
			var q=$('#t_border_ul li').eq(2).children('a').text();
			$('#t_border').val(q);
		}
		if(a == 'border_3'){
			var q=$('#t_border_ul li').eq(3).children('a').text();
			$('#t_border').val(q);
		}
		if(a == 'border_4'){
			var q=$('#t_border_ul li').eq(4).children('a').text();
			$('#t_border').val(q);
		}
		if(a == 'border_5'){
			var q=$('#t_border_ul li').eq(5).children('a').text();
			$('#t_border').val(q);
		}
		if(a == '' ||a == '无'){
			var q=$('#t_border_ul li').eq(0).children('a').text();
			$('#t_border').val(q);
		}
		if(b == 'left'){
			$('#t_legend').val('左（竖排）')
		}
		if(b == 'right'){
			$('#t_legend').val('右（竖排）')
		}
		if(b == 'top'){
			$('#t_legend').val('上（横排）')
		}
		if(b == 'bottom'){
			$('#t_legend').val('下（横排）')
		}
		if(b == 'false'){
			$('#t_legend').val('不显示')
		}
	}
	border_legend();
	$('body').on('mouseenter', '#t_border_ul li', function() {
		var n=$(this).attr('data-id');
		if(n == '无'){
			$('.border_xz_tc').remove();
		}else{
			var H=$(window).height();
			var W=$(window).width();
			var oEvent=event;
			var oDiv=document.createElement('div');
			if((H-oEvent.clientY)<350){
				oDiv.style.top=oEvent.clientY-350+'px';  // 指定创建的DIV在文档中距离顶部的位置
			}else{
				oDiv.style.top=oEvent.clientY+'px';  // 指定创建的DIV在文档中距离顶部的位置
			}
			if((W-oEvent.clientX)<350){
				oDiv.style.left=oEvent.clientX-350+'px';  // 指定创建的DIV在文档中距离左侧的位置
			}else{
				oDiv.style.left=oEvent.clientX+'px';  // 指定创建的DIV在文档中距离左侧的位置
			}
					// oDiv.style.border='1px solid #FF0000'; // 设置边框
					oDiv.style.position='fixed'; // 为新创建的DIV指定绝对定位
					oDiv.style.width='350px'; // 指定宽度
					oDiv.style.height='350px'; // 指定高度
					oDiv.style.zIndex =1050; //
					oDiv.style.backgroundColor ='#fff'; //
					oDiv.classList.add("border_xz_tc");
					document.body.appendChild(oDiv);
					$('.border_xz_tc').css('overflow', 'hidden').css('box-shadow', '0px 1px 1px 2px #ccc').css('padding', '15px');
					$('.border_xz_tc').append('<div class="'+n+'" style="width：100%;height:100%;"></div>')
		}
	});
	$('body').on('mouseleave', '#t_border_ul li', function() {
		$('.border_xz_tc').remove();
	});
	$(function(){//构建页面的尺子的标注线
		$.pageRuler({
			v: [1042,1298,1384,1458,1938,3858,4111],
			h:[786,738,918,1098,2178]
		});
	});
});
