$(document).ready(function () {
	$('#particles').particleground({
	    dotColor: '#283a76',
	    lineColor: '#283a76'
	});
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
		var name=$("#ipt1").val();
		var pass=$("#ipt2").val();
		var data={
			"name":name,
			"auth_key":pass
		};
		data=JSON.stringify(data);
		$.cookie('userName',name);
		window.localStorage.setItem('userName',name);
		//$.cookie('usePass',pass);
		login(data);
	});
	document.onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	       	$('#login').click();
 		}
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
				if(back.success==true){
					$.ajax({
				        type: "get",
				        async: true,
				        dataType:"jsonp",
				        cache:false,
				        url: "/db/jsonp/ssdb0/user_option:"+$("#ipt1").val(),
				        success: function(data) {
									var fxs=data.analyst;
									if(fxs=='Y'){
										if(use.indexOf(";") !=-1){
											var uses=use.split(';');
											for (var i = 0; i < uses.length; i++) {
												if(uses[i]==''){
													uses.splice(i,1)
												}
											}

											var taskss=[];
											var porjets=[];
											var id_name=[];
											for(var s=0;s<uses.length;s++){
												$.ajax({
													type: "get",
														async: false,
														dataType:"jsonp",
														url: "/db/jsonp/ssdb0/"+uses[s],
														success:function(data){
															// console.log(data);
															if(data.name==''||data.name==null){
																alert('应用没有中文名称')
															}
															nav= data.nav;
															id_name.push(data.name);
															$.ajax({
																type: "get",
																async: false,
																dataType:"jsonp",
																url: "/db/jsonp/ssdb0/"+nav,
																success:function(res){
																	// console.log(res);
																	var title2=[],dbdk2=[],cs2=[];
																	if(res[0].num){
																		data=res[0].num;
																		// console.log(data);
																		var title4=[];
																		for (var i = 0; i < data.length; i++) {
																			var tt=data[i].tit;
																			var likey=data[i].key;
																			var cs=data[i].cs;
																			title2.push(tt);
																			dbdk2.push(likey);
																			cs2.push(cs);
																			if(data[i].children){
																				var title3=[];
																				for (var k = 0; k < data[i].children.length; k++) {
																					var tt1=data[i].children[k].tit;
																					var likey1=data[i].children[k].key;
																					var cs1=data[i].children[k].cs;
																					title3.push({
																						'title':tt1,
																						'dbdk':likey1,
																						'cs':cs1
																					});
																				}
																				title4.push(title3)
																			}
																		}
																		var tasks=[];
																			for (var i = 0; i < title2.length; i++) {
																				var c_t={
																							'title':title2[i],
																							'children':title4[i],
																							'dbdk':dbdk2[i],
																							'cs':cs2[i]
																						}
																						tasks.push(c_t);
																			}
																			taskss.push(tasks);
																			var o={
																				'title':id_name[s],
																				'tasks':taskss[s],
																				"id":uses[s]
																			}
																			porjets.push(o);
																	}

																}
															});

													}
												});
											}
											porjets=JSON.stringify(porjets);
											localStorage.setItem('projects',porjets)
											window.location.href="main.fh5"

										}else{
											$.ajax({
												type: "get",
													async: false,
													dataType:"jsonp",
													url: "/db/jsonp/ssdb0/"+use,
													success:function(data){
														nav= data.nav;
														var id_name=data.name;
														if(data.name==''||data.name==null){
															alert('应用没有中文名称')
														}
														$.ajax({
															type: "get",
															async: false,
															dataType:"jsonp",
															url: "/db/jsonp/ssdb0/"+nav,
															success:function(res){
																// console.log(res);
																data=res[0].num;
																// console.log(data);
																var title2=[],dbdk2=[],cs2=[];
																var title4=[];
																for (var i = 0; i < data.length; i++) {
																	var tt=data[i].tit;
																	var likey=data[i].key;
																	var cs=data[i].cs;
																	title2.push(tt);
																	dbdk2.push(likey);
																	cs2.push(cs);
																	if(data[i].children){
																		var title3=[];
																		for (var k = 0; k < data[i].children.length; k++) {
																			var tt1=data[i].children[k].tit;
																			var likey1=data[i].children[k].key;
																			var cs1=data[i].children[k].cs;
																			title3.push({
																				'title':tt1,
																				'dbdk':likey1,
																				'cs':cs1
																			});
																		}
																		title4.push(title3);
																	}
																}
																var tasks=[];
																for (var i = 0; i < title2.length; i++) {
																	var c_t={
																				'title':title2[i],
																				'children':title4[i],
																				'dbdk':dbdk2[i],
																				'cs':cs2[i]
																			}
																			tasks.push(c_t);
																}
																var o={
																	'title':id_name,
																	'tasks':tasks,
																	"id":use
																}
																var porjets=[];
																porjets.push(o);
																porjets=JSON.stringify(porjets);
																localStorage.setItem('projects',porjets);
																window.location.href="main.fh5"
															}
														});
													}
											});
										}
									}else{
										alert('您还不是分析师，请成为分析师再登录！')
									}
				        },
				        error:function(XMLHttpRequest,message){
				            console.log(message)
				        }
				    });

				}else{
					alert("验证失败，请重新登录");
				}
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	};
	})
