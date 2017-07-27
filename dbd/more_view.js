$(document).ready(function(){
	//$("#content").empty();
	var theRequest ={};
	var key;
	/*console.info(document.body.clientHeight);*/
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
		mh=theRequest.mh;
		return theRequest;
	}
	GetRequest();
	/*if(mtitle!="undefined"){
		$("#dbdtitle").text(mtitle);
	}else{
		$("#dbdtitle").text("");
	}*/
	var value = mh,mhs = 'mhs';
	localStorage.setItem(mhs,value);
	for(var i=0;i<localStorage.length;i++){
			if(localStorage.key(i) == 'mhs'){
					// console.log(localStorage.getItem(localStorage.key(i)));
					mh = localStorage.getItem(localStorage.key(i));
			}else{
					// console.log(i);
			}
	}
	function loadSytle(url) {
	 	//console.info(url);
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    loadSytle('../portal/'+mh+'/'+mh+'_total.css');

	delete theRequest["mtitle"];
	delete theRequest["key"];
	delete theRequest["mh"];

	var $img;
	var screenBig;
	$.ajaxSetup({
    	async : false
    });
	$.ajax({
	    type: "get",
	    timeout : 1000*600,
	    dataType:"jsonp",
	    url: "/db/jsonp/ssdb0/"+key,
	    success: function(response) {
	    	var result="";
	    	var hy=[],h_y;
			if(response.length>0){
				//dataarr=response;
				dataNum=response[0].dnum;
				var screenNum=[];
				//console.info(dataNum);
				var longest=[];
				for(var i=0;i<dataNum.length;i++){
					var oo=[];
					var dp_one_height=parseInt(dataNum[i].height)+parseInt(dataNum[i].y)+36;
					longest.push(dp_one_height);
					var dpNum= parseInt(dataNum[i].dp);
					screenNum.push(dpNum);
					dpNum=dpNum-1;
					var dpDiv=$('li[data-id="dp'+dpNum+'"]');
					//console.info(dataNum[i]);
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
						//alert();
						dfa=dataNum[i].df;
					}
					var xx=parseInt(dataNum[i].x);
					var yy=parseInt(dataNum[i].y);

					h_y=parseInt(dataNum[i].height)+parseInt(dataNum[i].y);
					hy.push(h_y);
					getOption(dataNum[i]);
					var div=$('<div id="'+time+'" class="'+border+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;z-index:'+zindex+';"></div>');
					$(dpDiv).append(div);
					//console.info(div);
					myChart=echarts.init(document.getElementById(time),'shine');
					$.getScript('../plot/'+type+'.js',function(data, textStatus, jqxhr){
						try{
							eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
							if(dataNum[i].refresh!=undefined && dataNum[i].refresh != "" &&dataNum[i].refresh!="0"){
								var refreshs = parseInt(dataNum[i].refresh)*1000;
								setInterval(function(type,myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend){
									eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
								},refreshs,type,myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend)//原来
							}else{}
						}catch(err){
							console.error(err);
						}
						//console.info(data, textStatus, jqxhr);
						// draw(myChart,dfa,height,titles,xname,yname,width,div);			//console.log(i);
					});
				}
				var heightMax=Math.max.apply(null,hy);//高度
				$("#content").css('height',heightMax);
				//获取画的屏数量
				screenBig=Math.max.apply(null,screenNum);
				//画圆点
				for (var i = 0; i < screenBig; i++) {
					var aCircle='<a data-id="'+i+'" href="javascript:;"><img src="../images/dpicon/portal1_fenye_yuan.png"></a>';
					$('.jsNav').append(aCircle);
				}
				//去掉多余的屏
				screenBig=screenBig-1;
				$('.banner_li').css('height',Math.max.apply(null,longest));
				//$('.banner li:gt('+screenBig+')').remove();
			}
			$img=$('.jsNav').find('img');
			$img.eq(0).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
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
	//----------------------------前后换屏---------------------
	var ulMove=0;
	var prev=function(){
		console.info(ulMove);
		ulMove=ulMove-1;
		if (ulMove<0) {
			ulMove = screenBig -1;

		}
		$('.banner_ul').css('left','-'+ulMove+'00%');
		$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
		$('.jsNav').find('a[data-id="'+ulMove+'"] img').attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');

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
	var $allLi=$dp.find('.banner_li');
	var _len=$allLi.length;

	$('.jsNav').on('click','a',function(){
		$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
		$(this).find('img').attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
		_index=$(this).index();
		//console.info(_index);
		ulMove=_index;
		showDP(_index);
	});
	var int=setInterval(function(){
		ulMove=ulMove+1;
		if (ulMove>screenBig) {
			ulMove=0;
			$('.banner').css('left',0);
			$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
			$img.eq(0).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
		}else{
			var n2=-((ulMove+1)*100)+'%';
			$('.banner_ul').css('left','-'+ulMove+'00%');
			$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
			$img.eq(ulMove).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
		}
	},10000);
	//点击pdf下载
	$('.pdf_cp').mouseover(function() {
		/* Act on the event */
		$('#pdf_dc').animate({'right':0}, 1000);
	});
	$('#pdf_dc').mouseleave(function() {
		/* Act on the event */
		$('#pdf_dc').animate({'right':'-130px'}, 1000);
	});
	$('#pdf_dc').click(function() {
		clearInterval(int);
		var mgbg = window.sessionStorage.getItem("mgbg");
		var jdt='<canvas id="canvas" width="500" height="500"></canvas>'
		var w_pm=$(window).width();
		var h_pm=$(window).height();
		$('.pdf_mb').show();
		$('.pdf_mb').append(jdt);
		var sj=99/(5*(screenBig+1));
		var canvas = document.getElementById('canvas'),  //获取canvas元素
			context = canvas.getContext('2d'),  //获取画图环境，指明为2d
			centerX = canvas.width/2,   //Canvas中心点x轴坐标
			centerY = canvas.height/2,  //Canvas中心点y轴坐标
			rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
			speed = sj//0.1; //加载的快慢就靠它了
		//绘制蓝色外圈
		function blueCircle(n){
			context.save();
			context.strokeStyle = "#fff"; //设置描边样式
			context.lineWidth = 5; //设置线宽
			context.beginPath(); //路径开始
			context.arc(centerX, centerY, 100 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
			context.stroke(); //绘制
			context.closePath(); //路径结束
			context.restore();
		}
		//绘制白色外圈
		function whiteCircle(){
			context.save();
			context.beginPath();
			context.strokeStyle = "white";
			context.arc(centerX, centerY, 100 , 0, Math.PI*2, false);
			context.stroke();
			context.closePath();
			context.restore();
		}
		//百分比文字绘制
		function text(n){
			context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
			context.strokeStyle = "#fff"; //设置描边样式
			context.font = "40px Arial"; //设置字体大小和字体
			//绘制字体，并且指定位置
			context.strokeText(n.toFixed(0)+"%", centerX-25, centerY+10);
			context.stroke(); //执行绘制
			context.restore();
		}
		//动画循环
		(function drawFrame(){
			window.requestAnimationFrame(drawFrame, canvas);
			context.clearRect(0, 0, canvas.width, canvas.height);
			whiteCircle();
			text(speed);
			blueCircle(speed);
			// if(speed > 100) speed = 0;
			// speed += 0.1;
			if(speed < 99){
				speed += 0.1 ;//0.1;
			}
		}());

		// console.log(screenBig);
		$('#pdf_dc').animate({'right':'-130px'}, 500);
		$("#prev").hide();
		$("#behind").hide();
		$(".fomW").hide();
		$('body').animate({'scrollTop':'0'},500);
		if(ulMove != '0'){
			var n2=-(1*100)+'%';
			$('.banner_ul').css('left','-'+0+'00%');
			$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
			$img.eq(0).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
			ulMove=0;
		};
		var pdf_yl=setInterval(function(){
			ulMove=ulMove+1;
			if (ulMove>screenBig+1) {
				setTimeout(function(){
					if(window.sessionStorage){
						var pdfs=window.sessionStorage.getItem("timeDatas");
						pdfs=JSON.parse(pdfs);
						var doc = new jsPDF('l', 'mm', [w_pm,h_pm]);
						// console.log(pdfs.length);
						for(var i=0;i<pdfs.length;i++){
							var pdf_img=window.sessionStorage.getItem(pdfs[i]);
							doc.addImage(pdf_img, 'jpeg', 0, 0, w_pm,h_pm);
							if(i < screenBig){
                  doc = doc.addPage();
              }
						}
						doc.save('report' + new Date().getTime() + '.pdf');
						clearInterval(pdf_yl);
						var n2=-(1*100)+'%';
						$('.banner_ul').css('left','-'+0+'00%');
						$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
						$img.eq(0).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
						for(var i=0;i<pdfs.length;i++){
							window.sessionStorage.removeItem(pdfs[i]);
						}
						window.sessionStorage.removeItem('timeDatas');
					}else{
						alert('浏览器不支持!')
					}
					//根据下载保存成不同的文件名
					$("#prev").show(1000);
					$("#behind").show(1000);
					$(".fomW").show(1000);
					$('.pdf_mb').hide();
					// window.sessionStorage.clear()//removeItem
					$('.pdf_mb canvas').remove()
				},500)

			}else{
				html2canvas(document.getElementById("content"), {
						onrendered: function(canvas) {
							var imgData = canvas.toDataURL('image/jpeg');
							if(window.sessionStorage){
								var pdf_sjc=window.sessionStorage.getItem("timeDatas");
								var timeDatas = new Date().getTime() +'s';
								pdf_sjc=JSON.parse(pdf_sjc);
								if(pdf_sjc == null){
									pdf_sjc=[];
								}
								pdf_sjc.push(timeDatas);
								pdf_sjc=JSON.stringify(pdf_sjc);
								window.sessionStorage.setItem(timeDatas,imgData);
								window.sessionStorage.setItem('timeDatas',pdf_sjc);
							}else{
								console.log('This browser does NOT support sessionStorage');
							}
						},
						background: mgbg,
						//这里给生成的图片默认背景，不然的话，如果你的html根节点没设置背景的话，会用黑色填充。
						allowTaint: true //避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
				});
				var n2=-((ulMove+1)*100)+'%';
				$('.banner_ul').css('left','-'+ulMove+'00%');
				$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
				$img.eq(ulMove).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
			}
		},4000);
	});

	//----------------双击返回
	$(document).on('dblclick','li',function(e){
		var _con = $('iframe[name="mypanel"]');   // 设置目标区域
		if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
		   $('.banner').css('left',0);
		}
	});
	function behind(){
		//console.info(ulMove);
		ulMove=ulMove+1;
		if (ulMove>screenBig) {
			ulMove=0;
		}
		$('.banner_ul').css('left','-'+ulMove+'00%');
		$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
		$img.eq(ulMove).attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');

	}
	function showDP(n){
		var n2=-(n*100)+'%';
		//console.info(n2);
		$('.banner').css('left',n2);
	};
});


var top12=parseInt(window.screen.height)*0.1;
function dp(dataId){
	var $img=$('.jsNav').find('img');
	var ulMove;
	var n2=-(dataId*100)+'%';
	$('.banner').css('left',n2);
	ulMove=dataId;
	$img.attr('src','../images/dpicon/portal1_fenye_yuan.png');
	$('a[data-id="'+dataId+'"]').find('img').attr('src','../images/dpicon/portal1_fenye_yuan_hover.png');
}

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
	  	if (dbdk.indexOf("dashboard2")!=-1) {
    		$("#two iframe").attr('src','dbd2_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("dashboard")!=-1){
    		$("#two iframe").attr('src','dbd_view.fh5?key='+dbdk);
    	}else if(dbdk.indexOf("dp")!=-1){
    		$("#two iframe").attr('src','more_view.fh5?key='+dbdk+'&'+cs);
    	}else if(dbdk.indexOf("am")!=-1){
    		$("#two iframe").attr('src','am_run.fh5?key='+dbdk);
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
		    		window.location.href='dbd_view.fh5?key='+dbdk+'&dtitle='+d2;
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
	  	//$("#two iframe").attr('src','../portal/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs);
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
		window.location.href='../dbd/'+h+'&mh='+mh;
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
