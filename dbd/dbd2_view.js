	// var str = document.referrer;
	// console.log(str);
	// var index = str .lastIndexOf("=");
	// var str = str .substring(index + 1, str .length);//获取上一个url中"?"符后的字串
	// // console.log(str);
var theRequest ={};
var key,d2title,mh;
var csKey;
var echarts_id={}; //绘制过的echarts的id
var divs_id={}; //绘制过的div的元素
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	// console.log(url);
	var a=decodeURI(url);
  // console.log(a);
	if (a.indexOf("?") != -1) {
	    var str = a.substr(1);
	    strs = str.split("&");
	    for(var i = 0; i < strs.length; i ++) {
	        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	    }
	}
	 key=theRequest.key;
	 d2title=theRequest.d2title;
	 mh=theRequest.mh;
	//  console.info(theRequest);
	return theRequest;
}
GetRequest();
// mh = 'portal1';
// mh = str;
// var value = mh,mhs = 'mhs';
// localStorage.setItem(mhs,value);
for(var i=0;i<localStorage.length;i++){
	if(localStorage.key(i) == 'mhs'){
		// console.log(localStorage.getItem(localStorage.key(i)));
		mh = localStorage.getItem(localStorage.key(i));
	}else{
		// console.log(i);
	}
}
// console.log(mh);
function loadSytle(url) {
	 	//console.info(url);
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
if(mh!='portal2'){
	loadSytle('../portal/'+mh+'/'+mh+'_total.css');
	loadScript('../portal/'+mh+'/e_'+mh+'.js');
}else{
	if(window.sessionStorage.getItem('plan') != null){
		var n=window.sessionStorage.getItem('plan');
		loadSytle('../portal/'+mh+'/'+mh+'_total_'+n+'.css');
		loadScript('../portal/'+mh+'/e_'+mh+'_'+n+'.js');
	}else{
		loadSytle('../portal/'+mh+'/'+mh+'_total_1.css');
		loadScript('../portal/'+mh+'/e_'+mh+'_1.js');
	}
}
function loadScript(url) {
 	//console.info(url);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    delete theRequest["d2title"];
	delete theRequest["key"];
	delete theRequest["mh"];
	$.ajaxSetup({
		async : false
	});
  function user_id(){
    var key_user=[],val_user=[];
    var user_id=window.localStorage.getItem('userName');
    $.ajax({
            type: "get",
            async: true,
            dataType:"jsonp",
            cache:false,
            url: "/db/jsonp/ssdb0/user_option:"+user_id,
            success: function(data) {
    					var datas=data.datas;
              datas=datas.split(",");
    					for (var i = 0; i < datas.length; i++) {
    						var key_users=datas[i].split(":");
                key_user.push(key_users[0]);
                val_user.push(key_users[1]);
    					}
              key_user=JSON.stringify(key_user);
              val_user=JSON.stringify(val_user);
              window.localStorage.setItem('key_user',key_user);
              window.localStorage.setItem('val_user',val_user);
            },
            error:function(XMLHttpRequest,message){
                console.log(message)
            }
        });
  }
  user_id();
	setTimeout(function(){
		$.ajax({
		    type: "get",
		    timeout : 1000*600,
		    dataType:"jsonp",
		    url: "/db/jsonp/ssdb0/"+key,
		    success: function(response) {
		    	var result="";
		    	var hy=[],h_y;
				if(response.length>0){
					dataNum=response[0].dnum;
          localStorage.dataNum=JSON.stringify(dataNum);
					for(var i=0;i<dataNum.length;i++){
						var oo=[];
						var dfa=dataNum[i].df;
            csKey=dfa;
            h_y=parseInt(dataNum[i].height)+parseInt(dataNum[i].y);
						hy.push(h_y);
            getOption(dataNum[i]);

            var key_user=window.localStorage.getItem('key_user');
            var val_user=window.localStorage.getItem('val_user');
            key_user=JSON.parse(key_user);
            val_user=JSON.parse(val_user);
            if(key_user !='' &&key_user !=null){
              for(var k=0;k<key_user.length;k++){
                  var ds=dfa.replace(key_user[k],val_user[k]);
                  dfa=ds;
                  var ds1=titles.replace(key_user[k],val_user[k]);
                  titles=ds1;

              }
							for(var j in theRequest){
								var value=theRequest[j];
								d=dfa.replace(j,value);
								dfa=d;
								var ds2=titles.replace(j,value);
								titles=ds2;
							}
            }else{
              for(var j in theRequest){
                var value=theRequest[j];
                d=dfa.replace(j,value);
                dfa=d;
                var ds=titles.replace(j,value);
                titles=ds;
              }
            }

            // if(key_user !='' &&key_user !=null){
            //   for(var k=0;k<key_user.length;k++){
            //     if(titles.indexOf(key_user[k]) !=-1){
            //       var ds=titles.replace(key_user[k],val_user[k]);
            //       titles=ds;
            //     }else{
            //       for(var j in theRequest){
      			// 				var value=theRequest[j];
      			// 			  var ds=titles.replace(j,value);
      			// 			 	titles=ds;
      			// 			}
            //     }
            //   }
            // }else{
            //   for(var j in theRequest){
            //     var value=theRequest[j];
            //     var ds=titles.replace(j,value);
            //     titles=ds;
            //   }
            // }

						var div=$('<div id="'+time+'" class="'+border+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;z-index:'+zindex+';"></div>');
						$("#content").append(div);
						//console.info(div);
						myChart=echarts.init(document.getElementById(time),'shine');
						echarts_id[time]=myChart;
						divs_id[time] = div;

            // setTimeout(function(){
						$.getScript('../plot/'+type+'.js',function(data, textStatus, jqxhr){
							try{
								eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
								if(dataNum[i].refresh!=undefined && dataNum[i].refresh != "" &&dataNum[i].refresh!="0"){
									var refreshs = parseInt(dataNum[i].refresh)*1000;
									setInterval(function(type,myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend){
										eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
									},refreshs,type,myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend)
								}else{}
							}catch(err){
								console.error(err);
							}
						});
          // },1);


					}
					var heightMax=Math.max.apply(null,hy);//高度
					$("#content").css('height',heightMax);
				}
			 },
			 error:function(XMLHttpRequest,message){
					console.log(message)
			}
		});
	},500);
}
//console.info(theRequest);





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
		border='false';
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

$('body').on('click','.up_close',function() {
  $(".ui-dialog").remove();
});
var top12=parseInt(window.screen.height)*0.1;
function targetC(domName,t,dbdk,cs,k,g){
	if(t=='null'||''){
		return false;
	}else if(t=='up'){
    // var k=cs.split("?");
    // if(k[1] != '' || k[1] != undefined || k[1] != null){
    //   var w=k[1];
    //   var g=k[2];
    //   cs=k[0];
    //   $("#two").dialog({
    //     height:g,
    //     width:w,
    //     resizable: false
    //   });
    //   var t=-g*0.5-top12+'px';
    //   var l=-w*0.5+'px';
    //   $(".ui-dialog").css({position:"fixed",top:"50%",left:"50%",marginTop:t,marginLeft:l});
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
    }else if(t=='link') {
        // unionEvent(domName, cs);
        $.ajax({
            type: "get",
            timeout : 1000*600,
            dataType:"jsonp",
            url: "/db/jsonp/ssdb0/"+key,
            success: function(response) {
                var result="";
                var hy=[],h_y;
                if(response.length>0){
                    dataNum=response[0].dnum;
                    localStorage.dataNum=JSON.stringify(dataNum);
                    //modify by ycj on 20170717,不清空重绘
                    //$("#content").html('');

                    // }else{
                    for(var i=0;i<dataNum.length;i++){
                        var oo=[];
                        var dfa=dataNum[i].df;
                        csKey=dfa;
                        var dfa1=dfa.split("@");
                        var dfa2 = cs.split("=");
                        dfa = dfa.replace(dfa2[0],dfa2[1]);

                        h_y=parseInt(dataNum[i].height)+parseInt(dataNum[i].y);
                        hy.push(h_y);
                        getOption(dataNum[i]);
                        //var div=$('<div id="'+time+'" class="'+border+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;z-index:'+zindex+';"></div>');
                        //$("#content").append(div);
                        //console.info(div);
                        // myChart=echarts.init(document.getElementById(time),'shine');
                        var myChart=echarts_id[time];
                        var div = divs_id[time];
                        if(myChart!=domName){
                        //判断是否是本身点击的图表，不是得话就重新加载数据

	                        try{
	                            eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend);");
	                        }catch(err){
	                            console.error(err);
	                        }

                            //console.info(data, textStatus, jqxhr);
                            // draw(myChart,dfa,height,titles,xname,yname,width,div);           //console.log(i);

                    }
                    var heightMax=Math.max.apply(null,hy);//高度
                    $("#content").css('height',heightMax);
                  }
                }
             },
             error:function(XMLHttpRequest,message){
                    console.log(message)
            }
        });
    }
	else if(t=='top'){
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


//link效果
// function unionEvent(d,c){
// 	var canshu=c.split('=');
// 	//在同一个面板中找到拥有相同参数的框架canshu[0]，并且传递参数canshu[1]，重新绘图；
// 	var datas=JSON.parse(localStorage.dataNum);
// 	// console.log(d)
// 	for (var i = 0; i < datas.length; i++) {
// 		var k=datas[i].df;
// 		if(k==csKey){
//             //替换k的值
// 			var k1=k.split(':');
// 			k=k1[0]+':'+canshu[1];
//             //寻找对应的iframe，并且获取以及改变iframe的src；
// 			var choicedIframe=$('iframe[name="frame_'+i+'"]').not('iframe[name="'+d+'"]');
// 			var shuxing=choicedIframe.attr('src');
//
// 			// if (shuxing) {
// 			// 	var csObj={};
// 			// 	var str1=shuxing.split("?");
// 			// 	var csStr=str1[1].split("&");
// 			// 	for(var j = 0; j < csStr.length; j ++) {
// 			// 		csObj[csStr[j].split("=")[0]]=unescape(csStr[j].split("=")[1]);
// 			// 	}
// 			// 	csObj.key=k;
// 			// 	csObj1=decodeURIComponent($.param(csObj));
// 				//../../dbd/dbd2_view.fh5?key=dashboard2:jh1_b12&d2title=地图热力主从交互&@city=浙江&mh=portal1
// 				// $('iframe[name="frame_'+i+'"]').attr('src','../../plot/'+csObj.item+'_l.fh5?'+csObj1);
// 			}
// 		}
// 	}
// }

function targetT(t,h,domName,k,g){
	// console.info(h);
	// console.info(domName);

	if(t=='null'||''){
		return false;
	}else if(t=='up'){
		if(k!=''&&k!=null){
			$("#two").dialog({
			    height:g,
			    width:k,
			    resizable: false
		  	});
				// var mt=-top12;
				var ml=-k/2;
				$(".ui-dialog").css({top:top12+'px',left:'50%',marginLeft:ml+'px',width:k+'px',height:g+'px'});
		}else{
			$("#two").dialog({
			    height:parseInt(window.screen.height)*0.8,
			    width:parseInt(window.screen.width)*0.8,
			    resizable: false
		  	});
		  	$(".ui-dialog").css({top:top12+'px'});
		}
	  	//$("#two iframe").attr('src','../portal/dbd2_view_ldown.fh5?key='+dbdk+'&'+cs);
	  	$("#two iframe").attr('src','../dbd/'+h);
	}else if(t=='down'){
		window.frames[domName].location.href='../dbd/'+h;
	}else if(t=='blank'){
		window.open('../dbd/'+h);
	}
	else if(t=='link'){
    $.ajax({
        type: "get",
        timeout : 1000*600,
        dataType:"jsonp",
        url: "/db/jsonp/ssdb0/"+key,
        success: function(response) {
          // console.log(response);
            if(response.length>0){
              dataNum=response[0].dnum;
              localStorage.dataNum=JSON.stringify(dataNum);
              $("#content").html('');
              for(var i=0;i<dataNum.length;i++){
                var dfa=dataNum[i].df;
                csKey=dfa;
                var cs=h.split("&")

                  var dfa1=dfa.split("@");
                  var dfa2 = cs[1].split("=");

                  dfa=dfa.replace(dfa2[0],dfa2[1]);

                  getOption(dataNum[i]);
                  var div=$('<div id="'+time+'" class="'+border+'" style="width:'+width+'px;height:'+height+'px;position:absolute;top:'+y+'px;left:'+x+'px;z-index:'+zindex+';"></div>');
                  $("#content").append(div);
                  myChart=echarts.init(document.getElementById(time),'shine');
                  $.getScript('../plot/'+type+'.js',function(data, textStatus, jqxhr){
                      try{
                          eval("draw"+type+"(myChart,dfa,height,titles,xname,yname,width,div,border,zindex,legend)");
                      }catch(err){
                          console.error(err);
                      }
                  });
              }
            }

         },
         error:function(XMLHttpRequest,message){
                console.log(message)
        }
    });

	}
	else if(t=='top'){
		window.location.href='../dbd/'+h;
	}
}
function targetUp(dbdk,cs,k,g){
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


//link效果
function unionEvent(d,c){
  		// console.log(d);
  		// console.log(c);
		var canshu=c.split('=');
		//在同一个面板中找到拥有相同参数的框架canshu[0]，并且传递参数canshu[1]，重新绘图；
		var datas=JSON.parse(localStorage.dataNum);
		// console.log(datas);
		for (var i = 0; i < datas.length; i++) {
			var k=datas[i].df;
			if(k==csKey){
				//替换k的值
				var k1=k.split(':');
				//console.info(k1);
				k=k1[0]+':'+canshu[1];
				var choicedIframe=$('iframe');
        var shuxing=decodeURI(choicedIframe.context.URL);
				if (shuxing) {
					var csObj={};
					var str1=shuxing.split("?");
					var csStr=str1[1].split("&");
					var aa1=csStr[0].split("=");
          var aa=aa1[1];
          var bb1=csStr[1].split("=");
          var bb=bb1[1]+'&'+c;
          parent.getAjax(aa,bb);
				}
			}
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

				if($(this).attr("role")){
					var kg=$(this).attr("role");
					kg=kg.split('x');
					var k=kg[0];
					var g=kg[1];
					window.targetT(t,h,p,k,g);
				}else{
					window.targetT(t,h,p);
				}
        // window.parent.targetT(t,h,p);
        return false;
    });

    //历史纪录
    function s(){
      // html2canvas(document.body).then(function(canvas) {
      // var image = canvas.toDataURL("image/png");//img的src
      domtoimage.toPng(document.body).then(function (dataUrl) {
      var image = dataUrl;
      var img_url1=window.sessionStorage.getItem("lsurl");//得到历史纪录链接字符串
      var img_src1=window.sessionStorage.getItem("lsimg");//得到历史纪录图片地址字符串
      var timeDatas = new Date().getTime();
      if(window.sessionStorage){
        var this_url=window.location.href;
        var img_src=JSON.parse(img_src1);
        var img_url=JSON.parse(img_url1);
        if(img_url == null){
          img_url=[];
        }
        if(img_src == null){
          img_src=[];
        }
        var dk_n=$(window).width()/280;//280是a的宽加margin
        var dk_ns=Math.floor(dk_n);
        if(img_url.length<dk_ns){
          img_url.push(this_url);
          img_src.push(timeDatas);
        }else{
          img_url.push(this_url);
          img_src.push(timeDatas);
          img_url.shift();
          window.sessionStorage.removeItem(img_src[0]);
          img_src.shift();
        }
        var img_urls=JSON.stringify(img_url);
        var img_srcs=JSON.stringify(img_src)
        window.sessionStorage.setItem("thisurl",this_url);
        window.sessionStorage.setItem("lsurl",img_urls);
        window.sessionStorage.setItem("lsimg",img_srcs);
        window.sessionStorage.setItem(timeDatas,image);
        }else{
              console.log('This browser does NOT support sessionStorage');
        }
  })
}
// s()；
setTimeout('s()',1000)
