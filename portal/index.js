$(document).ready(function($) {
	// $('#particles').particleground({
	//     dotColor: '#283a76',
	//     lineColor: '#283a76'
	// });
	$('.intro').css({
	    'margin-top': -($('.intro').height() / 2)
	});
	$('.ipt').focus(function(){
		$(this).prev().addClass('bian').siblings('span').removeClass('bian')
	});
	$('#djq').blur(function(){
		$('span').removeClass('bian');
	});
	$("#login").click(function(){
		//alert();
		var name=$("#ipt1").val();
		var pass=$("#ipt2").val();
		var data={
			"name":name,
			"auth_key":pass
		};
		data=JSON.stringify(data);
		$.cookie('userName',name);
		window.localStorage.setItem('userName',name);
		//$.cookie('usePass',pass,{path:'index.fh5'});
		login(data);
	});
	document.onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
				if($('body .mh_yy_xz').length <'1'){
					$('#login').click();
				}
 		}
	}
	$('body').on('click', '.bottom_password', function() {
		$(".popup").css("display","block");
			var usename=$.cookie('userName');
			$(".edit").text(usename);
	});
  $(".popup-footer-cancel").click(function(){
    $(".popup").hide();
  });
	$("body").on('click','#submit',function(){
	 // alert();
	  var username=$(".edit").text();
	  var newPass=$("#userNewPwd").val();
	  changePass(username,newPass);
	});
	var changePass=function(name,pass){
	    var o={
	      "name":name,
	      "auth_key":pass
	    };
	    o=JSON.stringify(o);
	    $.ajax({
	      type:'post',
	      async: true,
	      url:'/db/up_auth_key',
	      data:{data:o},
	      success:function(data){
					var datas=eval('('+data+')');
					if(datas.success == true){
						alert('修改成功!')
						$(".popup").hide();
					}else{
						alert('密码错误!');
					}
	      },
	      error:function(XMLHttpRequest,message){
	        console.log(message);

	      }
	    });

	  };
	var login=function(data){
		$.ajax({
			type:'post',
			async: false,
			url:'/db/auth2',
			data:{data:data},
			success:function(data){
				// console.log(data);
				var back=eval('('+data+')');
				var yq=back.portal;
				var use=back.nav;
				//console.info(back);
				if(back.success==true){
					if(use.indexOf(";") !=-1){
						var div1='<div class="mh_yy_xz"><div class="yy_xz_tc"><div class="yy_xz_title">请选择应用</div><div class="yy_xz_main"></div><div class="yy_xz_bottoms"><div class="bottom_password">修改密码</div><button class="yy_xz_ok btn btn-success">确定</button><button class="yy_xz_no btn btn-info">取消</button></div></div></div>'
						$('body').prepend(div1);
						var h=$(window).height();
						var h1=h*0.5;
						var h2=h1-$('.yy_xz_title').height()-$('.yy_xz_bottoms').height();
						$('.yy_xz_main').css('height', h2);
						var uses=use.split(";");
						for (var i = 0; i < uses.length; i++) {
							if(uses[i] ==''){
								uses.splice(i,1);
							}
						}
						$('.yy_xz_main').html('');
						for (var i = 0; i < uses.length; i++) {
							$.ajax({
								type: "get",
							    async: false,
							    dataType:"jsonp",
							    url: "/db/jsonp/ssdb0/"+uses[i],
							    success:function(data){
							    	// console.info(data);
							    	name= data.name;
										var div2='<div data-id="'+uses[i]+'">'+name+'</div>';
										$('.yy_xz_main').append(div2);
							    }
							});
						}
						$('body').on('click', '.yy_xz_main div', function() {
							/* Act on the event */
							$('.yy_xz_main div').removeClass('yy_xz_div');
							$(this).addClass('yy_xz_div');
						});
						$('body').on('dblclick', '.yy_xz_main div', function() {
							/* Act on the event */
							$('.yy_xz_main div').removeClass('yy_xz_div');
							$(this).addClass('yy_xz_div');
							$('.yy_xz_ok').click();
						});

						$('body').on('click', '.yy_xz_ok', function() {
							/* Act on the event */
							use=$('.yy_xz_div').attr('data-id');
							uses=use.split(":");
							var ipad_ld = $("#ipt1").val()+'_'+uses[1];
							window.localStorage.setItem('ipad_ld',ipad_ld);
							window.localStorage.setItem('use',use);
							window.localStorage.setItem('use_cc',uses[1]);
							$('.mh_yy_xz').remove();
							$.ajax({
								type: "get",
							    async: false,
							    dataType:"jsonp",
							    url: "/db/jsonp/ssdb0/"+use,
							    success:function(data){
							    	// console.info(data);
							    	nav= data.nav;
							    	portal=data.pot;
							    	logo=data.logo;
										var plan=data.plan;
										var portals='portal'+portal;
										window.localStorage.setItem('mhs',portals);
										window.sessionStorage.setItem('plan',plan);
							    	window.location.href='portal'+portal+'/portal'+portal+'.fh5?key='+nav+'&logo='+logo;
							    }
							});
						});
						$('body').on('click', '.yy_xz_no', function() {
							/* Act on the event */
							$('.mh_yy_xz').remove();
						});
					}else{
						$.ajax({
							type: "get",
						    async: false,
						    dataType:"jsonp",
						    url: "/db/jsonp/ssdb0/"+use,
						    success:function(data){
						    	// console.info(data);
						    	nav= data.nav;
						    	portal=data.pot;
						    	logo=data.logo;
									use=use.split(":");
									var ipad_ld = $("#ipt1").val()+'_'+use[1];
									var plan=data.plan;
									var portals='portal'+portal;
									window.localStorage.setItem('mhs',portals);
									window.sessionStorage.setItem('plan',plan);
									window.localStorage.setItem('ipad_ld',ipad_ld);
									window.localStorage.setItem('use_cc',use[1]);
						    	window.location.href='portal'+portal+'/portal'+portal+'.fh5?key='+nav+'&logo='+logo;
						    }
						});
					}
				}else{
					alert("验证失败，请重新登录");
				}
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	};
});
/*$(".ipt").css('background-color', 'red');*/
