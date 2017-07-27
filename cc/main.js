$(function() {
	window.localStorage.setItem('mhs','portal5');
	var userName=$.cookie('userName');
	$('.admin_zh').html('当前用户名：'+userName);
	setInterval(function(){
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: "/db/jsonp/ssdb0/fea_stats",
	        success: function(data) {
						// console.log(data);
	        }
	    });
	},120000)
	function start(){
		var H=$(window).height();
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: "/db/jsonp/ssdb0/user_option:"+userName,
	        success: function(data) {
						var use=data.tool;
						// console.log(use);
						second(use);
	        },
	        error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
	    });
			setInterval(function(){
					var date = new Date();
					var seperator1 = "-";
					var seperator2 = ":";
					var month = date.getMonth() + 1;
					var strDate = date.getDate();
					var hours = date.getHours();
					var Minutes = date.getMinutes();
					var Seconds = date.getSeconds();
					if (month >= 1 && month <= 9) {
							month = "0" + month;
					}
					if (strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
					}
					if (hours >= 0 && hours <= 9) {
							hours = "0" + hours;
					}
					if (Minutes >= 0 && Minutes <= 9) {
							Minutes = "0" + Minutes;
					}
					if (Seconds >= 0 && Seconds <= 9) {
							Seconds = "0" + Seconds;
					}

					var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
									+ " " + hours + seperator2 + Minutes
									+ seperator2 + Seconds;
					$('.time_zh').html(currentdate);
			},1000)
	}
	start();
	function second(use){
		// alert('0')
		// console.log(use);
		if(use!='undefined'&&use!=''){
			// alert('1')
			$.ajax({
				type: "get",
					async: false,
					dataType:"jsonp",
					url: "/db/jsonp/ssdb0/"+use,
					success:function(data){
						// console.log(data);
						var nav=data[0].num;
						$('.middle_nav ul').children('li[class="new"]').remove();
						$('body').children('div[class="news"]').remove();
						for (var i = 0; i < nav.length; i++) {
							$('.middle_nav ul').append('<li class="footer_b new" data-id="'+nav[i].key+'"><a  title="'+nav[i].tit+'"><img src="img/bottom_nav_5.png"><span>'+nav[i].tit+'</span></a></li>')
							var id=4+i;
							var ids='win'+id;
							var main_d='<iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe>';
							// var div2='<div id="iframeHelper"></div>';
							// $("#win"+n).append(div2);
							var div='<div id="'+ids+'" class="news" style="disaply:none;position:absolute;"></div>';
							$('body').append(div);
							$("#"+ids).append(main_d);
						}
						$('.middle_nav ul li').click(function() {
							var tit=$(this).children('a').attr('title');
							var url=$(this).attr('data-id');
							if(url.indexOf('am:') =='0'){
								url='../dbd/am_run.fh5?key='+url+'&atitle='+tit+'&mh=portal5';
							}
							if(url.indexOf('dashboard2:') =='0'){
								url='../dbd/dbd2_view.fh5?key='+url+'&atitle='+tit+'&mh=portal5';
							}
							if(url.indexOf('dashboard:') =='0'){
								url='../dbd/dbd_view.fh5?key='+url+'&atitle='+tit+'&mh=portal5';
							}
							if(url.indexOf('dp:') =='0'){
								url='../dbd/more_view.fh5?key='+url+'&atitle='+tit+'&mh=portal5';
							}
								var n=$('.middle_nav ul li').index(this);
								$("#win"+n).children('iframe').attr('src',url);
									if(n==0){
										$("#win"+n).AeroWindow({
											WindowTitle:          tit,
											WindowPositionTop:    'center',
											WindowPositionLeft:   'left',
											WindowWidth:          500,
											WindowHeight:         700,
											WindowAnimation:      'easeOutCubic',
											WindowResizable:      true,
											WindowDraggable:      true,
										});
									}else{
										$("#win"+n).AeroWindow({
											WindowTitle:          tit,
											WindowPositionTop:    'center',
											WindowPositionLeft:   'center',
											WindowWidth:          1100,
											WindowHeight:         700,
											WindowAnimation:      'easeOutCubic',
											WindowResizable:      true,
											WindowDraggable:      true,
										});
									}
						});
					},
					error:function(XMLHttpRequest,message){
							console.log(message)
					}
			});
		}else{
			$('.middle_nav ul li').click(function() {
				var tit=$(this).children('a').attr('title');
				var url=$(this).attr('data-id');
				if(url.indexOf('am:') =='0'){
					url='../dbd/am_run.fh5?key='+url+'&atitle='+tit+'&mh=portal5'
				}
					var n=$('.middle_nav ul li').index(this);
					$("#win"+n).children('iframe').attr('src',url);
						if(n==0){
							$("#win"+n).AeroWindow({
								WindowTitle:          tit,
								WindowPositionTop:    'center',
								WindowPositionLeft:   'left',
								WindowWidth:          500,
								WindowHeight:         700,
								WindowAnimation:      'easeOutCubic',
								WindowResizable:      true,
								WindowDraggable:      true,
							});
						}else{
							$("#win"+n).AeroWindow({
								WindowTitle:          tit,
								WindowPositionTop:    'center',
								WindowPositionLeft:   'center',
								WindowWidth:          1100,
								WindowHeight:         700,
								WindowAnimation:      'easeOutCubic',
								WindowResizable:      true,
								WindowDraggable:      true,
							});
						}
			});
		}
	}
	$('.main_cc div').hide();
	$('.nav_cc ul li').removeClass('nav_click');
	$('.nav_cc ul li').eq(0).addClass('nav_click');
	$('.nav_cc ul li').click(function(){
		var n=$('.nav_cc ul li').index(this);
		$('.main_cc div').hide();
		$(this).addClass('nav_click').siblings().removeClass('nav_click');
		if(n==0){
			$('.main_cc div').eq(0).hide();
		}
		else {
			// if(n==3){
			// 	$.ajax({
			// 		type:'get',
			// 		async: true,
			// 		url:'/db/define/jdbc0',
			// 		success:function(data){
			// 			$('.sqlfx').html('<iframe src="http://'+data+'" frameborder="0" height="100%"; width="100%";></iframe>');
			// 		},
			// 		error:function(XMLHttpRequest,message){
			// 			console.log(message)
			// 		}
			// 	});
			// }
			$('.main_cc div').eq(n).show();
		}
	});
	// function getData(){
	var ws=null;
			var ip_addr = document.location.hostname;
			var mq_topic='analyse_'+userName;
			var url = "ws://"+ip_addr+":8998/"+mq_topic+":info";
			console.log(url);

			if (ws !=null && ws.url !=url){
					ws.close();
					ws =null;
			}

			if (ws==null){
					ws = new WebSocket(url);
					/*
					ws.onopen = function() {
							ws.send(mq_topic);
					};
					*/
					ws.onmessage = function (evt) {

						var datas=evt.data;
						var datas=JSON.parse(datas);
						console.log(datas);
							yj_tc(datas);

					};
					ws.onclose = function(){
							//alert("Connection is closed");
							ws=null;
					};
					ws.error = function()
					{
							//alert("Error Happended");
							ws.close();
							ws=null;
					};

			}//end if

	// }
	// getData();

	var yj_tc=function(data){

		$('body').addClass('wobble');
		$('body').append('<audio src="music/alarm.mp3" autoplay="autoplay"></audio>')
		setTimeout(function(){
			$('body').removeClass('wobble');
			$('body').children('audio');
		},2000);
		var type=data.resp_type;
		var id_cc=data.ID;
		if(type == 'scene'){
			var dfas=data.resp_para1;
			var mb=data.resp_para;
			$('.main_cc div').hide();
			$('.main_cc div').eq(0).show();
			$('.nav_cc ul li').removeClass('nav_click');
			$('.nav_cc ul li').eq(0).addClass('nav_click');
			var div3='<div id="'+id_cc+'" style="disaply:none;position:absolute;"><iframe src="" frameborder="0" height="100%" width="100%"></iframe></div>'
			$('body').append(div3)
			var url='../dbd/dbd2_view.fh5?key='+mb+'&d2title=&'+dfas+'&mh=portal5';
			$("#"+id_cc).children('iframe').attr('src',url)
			if(data.resp_size){
				var size=data.resp_size;
				var sizes=size.split("x");
				var w_k=sizes[0];
				var h_k=sizes[1];
				var w_b_k=-w_k/2;
				var h_b_k=-h_k/2;
				$("#"+id_cc).AeroWindow({
					WindowTitle:          '报警:'+id_cc,
					// WindowPositionTop:    'center',
					// WindowPositionLeft:   'center',
					WindowWidth:          w_k+'px',
					WindowHeight:         h_k+'px',
					WindowAnimation:      'easeOutCubic',
					WindowResizable:      true,
					WindowDraggable:      true,
				});
				$("#"+id_cc).css('left', '50%').css('marginLeft', w_b_k+'px').css('top', '50%').css('marginTop', h_b_k+'px');
			}else{
				$("#"+id_cc).AeroWindow({
					WindowTitle:          '报警:'+id_cc,
					WindowPositionTop:    'center',
					WindowPositionLeft:   'center',
					WindowWidth:          1300,
					WindowHeight:         700,
					WindowAnimation:      'easeOutCubic',
					WindowResizable:      true,
					WindowDraggable:      true,
				});
			}


		}
		if(type == 'url'){
			var url=data.resp_para;
			$('.main_cc div').hide();
			$('.main_cc div').eq(0).show();
			$('.nav_cc ul li').removeClass('nav_click');
			$('.nav_cc ul li').eq(0).addClass('nav_click');
			var div3='<div id="'+id_cc+'" style="disaply:none;position:absolute;"><iframe src="" frameborder="0" height="100%" width="100%"></iframe></div>'
			$('body').append(div3);
			$("#"+id_cc).children('iframe').attr('src',url)
			if(data.resp_size){
				var size=data.resp_size;
				var sizes=size.split("x");
				var w_k=sizes[0];
				var h_k=sizes[1];
				$("#"+id_cc).AeroWindow({
					WindowTitle:          '报警:'+id_cc,
					WindowPositionTop:    'center',
					WindowPositionLeft:   'center',
					WindowWidth:          w_k+'px',
					WindowHeight:         h_k+'px',
					WindowAnimation:      'easeOutCubic',
					WindowResizable:      true,
					WindowDraggable:      true,
				});
			}else{
				$("#"+id_cc).AeroWindow({
					WindowTitle:          '报警:'+id_cc,
					WindowPositionTop:    'center',
					WindowPositionLeft:   'center',
					WindowWidth:          1300,
					WindowHeight:         700,
					WindowAnimation:      'easeOutCubic',
					WindowResizable:      true,
					WindowDraggable:      true,
				});
			}
		}
	}
	// yj_tc(t);

	//监听键盘准备刷新
    function keyUp(e) {
       var currKey=0,e=e||event;
       currKey=e.keyCode||e.which||e.charCode;
       var keyName = String.fromCharCode(currKey);
       //alert("按键码: " + currKey + " 字符: " + keyName);
       if (keyName=="M"){
           $("#lbs_window").attr("src","lbsA.fh5");
        }
    }
   document.onkeyup = keyUp;
});
