$(document).ready(function(){
	var theRequest ={};
	var trData={};
	var dataArr=[],anum=[],atitle;
	var tb=$("#build_table tbody");
	
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
	atitle=theRequest.atitle;
	amh=theRequest.mh;
	editor=theRequest.editor;
	return theRequest;
	} 
	GetRequest();
	$("#build_top").text(atitle);
	$("#amkey").text(key);
	/*var D=$("<div></div>");
	var td5=$('<td><select class="ddUnion"></select></td>'); */ 
	

	$.ajax({
		type: "get",
        async: false,
        timeout : 1000*600,
        dataType:"jsonp",
        url: "/db/jsonp/ssdb0/"+key,             
        success: function(res) {
        	if(res.length>0){
        		/*D.append(td5);
    			td5=D.html();*/
        		var data=res[0];
        		$("#feaName").val(data.txt);
        		$("#dbdKey").val(data.dbdView);
        		var trArr=data.anum;
        		localStorage.trArr=JSON.stringify(trArr);
        		//var t=$(td5).find("select");
        		for (var i = 0; i < trArr.length; i++){
        			var td1='<td><input type="text" class="form-control" value="'+trArr[i].id+'"></td>';
        			var td2='<td><input type="text" class="form-control" value="'+trArr[i].value+'"></td>';
        			var td3='<td><input type="text" class="form-control" value="'+trArr[i].name+'"></td>'; 
        			var td4='<td>'+
        						'<select class="type" data-name="type_'+i+'">'+
        							'<option value="文本框">文本框</option>'+
        							'<option value="数据字典">数据字典</option>'+
        							'<option value="文件上传">文件上传</option>'+
        						'</select>'+
    						'</td>';   				
        			if (trArr[i].choose==true) {
        				var td5='<td><input type="checkbox" checked="checked"></input></td>';
        			}else{
        				td5='<td><input type="checkbox"></input></td>';
        			}  
        			var td6='<td><select class="ddUnion"></select></td>';  
        			  			        			   	
        			var td7='<td><a href="#"><img src="img/remove_icon.png"></a></td>';
        			var tr='<tr>'+td1+td2+td3+td4+td5+td6+td7+'</tr>';

        			
        			tb.append(tr);
        			//console.info($('select[data-name="type_'+i+'"]'));
        			$('select[data-name="type_'+i+'"]').val(trArr[i].type);
        			
        		}
        	}
        }
	});
	
	$.ajax({
		type: "get",
        async: false,
        timeout : 1000*600,
        dataType:"jsonp",
        url: "/db/scan/ssdb0/dd:/dd:~/200", 
        success:function(res){
        	localStorage.res=JSON.stringify(res);
        	var tr=$(tb).find('tr');
        	if (localStorage.trArr) {
        		var trs=JSON.parse(localStorage.trArr);
	        	for (var i = 0; i < tr.length; i++) {
	        		var dd=$(tr[i]).find('.ddUnion');	        		
			    	for (var j = 0; j < res.length; j++) {		
		        		$.each(res[j], function(name, value) {
		        		    if(trs[i].union==name){
		        		    	var option='<option value="'+name+'" selected="selected">'+name+'</option>';
		        		    }else{
		        		    	var option='<option value="'+name+'">'+name+'</option>';
		        		    }	
		        			dd.append(option);
						}); 				 		
		        	}
		        	var option='<option value="没有关联字典">没有关联字典</option>';
			    	dd.append(option);
			    	if (trs[i].union=='没有关联字典') {
			    		dd.val('没有关联字典');
			    	}
	        	} 
        	}else{
        		return true;
        	}        	         	        	        		
        }
	});	

	$("#btnBox a").eq(3).hover(function(){
		$(this).find('img').attr('src','img/icon/add-hover.png');
	},function(){
		$(this).find('img').attr('src','img/icon/add.png');
	});
	$("#btnBox a").eq(2).hover(function(){
		$(this).find('img').attr('src','img/icon/save-hover.png');
	},function(){
		$(this).find('img').attr('src','img/icon/save.png');
	});
	$("#btnBox a").eq(1).hover(function(){
		$(this).find('img').attr('src','img/icon/yulan-hover.png');
	},function(){
		$(this).find('img').attr('src','img/icon/yulan.png');
	});
	$("#btnBox a").eq(0).hover(function(){
		$(this).find('img').attr('src','img/icon/back-hover.png');
	},function(){
		$(this).find('img').attr('src','img/icon/back.png');
	});
	var getOption=function(){
		var allOption=JSON.parse(localStorage.res);
		//console.info(allOption);
		for (var j = 0; j < allOption.length; j++) {		
    		$.each(allOption[j], function(name, value) {
		    	var option='<option value="'+name+'">'+name+'</option>';	
    			tb.children().last().children().eq(5).find('select').append(option);
			}); 				 		
    	}
	};
	var addCS=function(){		
		tb.append($('<tr>'));
		//console.info(tb);
		var td='<td><input type="text" class="form-control" aria-label="..."></td>';
		for (var i = 0; i <3;i++) {
			tb.children().last().append(td);
		}
		var tdn='<td>'+
					'<select class="type">'+
						'<option value="文本框">文本框</option>'+
						'<option value="数据字典">数据字典</option>'+
						'<option value="文件上传">文件上传</option>'+
					'</select>'+
				'</td>'+
				'<td><input type="checkbox" checked="checked"></input></td>'+
				'<td><select class="ddUnion" disabled="disabled"></select></td>'+
				'<td><a href="#"><img src="img/remove_icon.png"></a></td>'
    	tb.children().last().append(tdn);
    	getOption();
	};

	var dbdChoose=function(n){
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: '/db/scan/ssdb0/dashboard'+n+':/dashboard'+n+':~/100',             
	        success: function(data) {
	            $('#keyList'+n).empty();
	           for (var i = 0; i < data.length; i++) {
	           		var d=data[i];
	               for(var j in data[i]){
		                var t=JSON.parse(d[j]);
	                    t=t[0].dtitle;
	                    //console.info(t);
	                    var li=$(
	                        '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
	                        );              
	                    $("#keyList"+n).append(li);
	               	}
	           }                   
	        },
	        error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
	    });
	};
	var dpChoose=function(){
		$.ajax({
	        type: "get",
	        async: true,
	        dataType:"jsonp",
	        cache:false,
	        url: '/db/scan/ssdb0/dp:/dp:~/200',             
	        success: function(data) {
	            $('#keyList3').empty();
	           for (var i = 0; i < data.length; i++) {
	           		var d=data[i];
	               for(var j in data[i]){
		                var t=JSON.parse(d[j]);
	                    t=t[0].mtitle;
	                    var li=$(
	                        '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
	                        );              
	                    $("#keyList3").append(li);
	               	}
	           }                   
	        },
	        error:function(XMLHttpRequest,message){
	            console.log(message)
	        }
	    });
	};
	$("body").on("click","#keyList li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('#dbdKey').val(" ");
        $('#dbdKey').val(val);
    });
    $("body").on("click","#keyList2 li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('#dbdKey').val(" ");
        $('#dbdKey').val(val);
    });
    $("body").on("click","#keyList3 li",function(){
       // alert();
        var val=$(this).attr("data-id");
        //console.info(val);
        $('#dbdKey').val(" ");
        $('#dbdKey').val(val);
    });

	var getData=function(){
		anum=[];
		dataArr=[];
		var txt=$("#feaName").val();
		var view=$("#dbdKey").val();
		$(tb).find("tr").each(function(i,dom){
			var td=$(dom).children();
			//console.info(td);
			var id=$(td).eq(0).find("input").val();
			var value=$(td).eq(1).find("input").val();
			var chinese=$(td).eq(2).find("input").val();
			var type=$(td).eq(3).find("select").val()
			var choose=$(td).eq(4).find("input");			
			if (type!='数据字典') {
				union='没有关联字典';
			}else{
				union=$(td).eq(5).find("select").val();
			}
			//console.info(union);
			choose=choose[0].checked;
			//console.info(choose);
			//判断是否显示，如果不是，则不关联字典
			if (choose==false) {
				union='没有关联字典'
			}
			trData={
				"id":id,
				"value":value,
				"name":chinese,
				"choose":choose,
				"type":type,
				"union":union
			};
			anum.push(trData);			
		});
		//console.info(anum);
		aTitle=atitle;		
		dataArr.push({"aTitle":aTitle,"editor":editor,"txt":txt,"anum":anum,"dbdView":view});
		return dataArr;
	};

	var save=function(){
		var json = getData();
       	console.info(json);
		if(!json){
			alert("数据为空");
		}else{
			alert("保存成功！")
		}
		var string=JSON.stringify(json);
		$.ajax({
			url: "/db/put/ssdb0/"+key,
			type: "post",
        	data: {value:string},
        	dataType: "json",
        	success: function(res){
        		alert("保存成功！");
        	}
		});
	};
	var fabu=function(){
		//if(amh==1){
			window.open('../dbd/am_yl.fh5?key='+key+'&atitle='+atitle);
		//}else{
			//window.open("../portal/am_run.fh5?key="+key+"&atitle="+atitle);
		//}
	};
	$("#back_btn").on('click',function(){
	//alert();
		window.location.href='am_mgr.fh5';
	});
	var getFeaTxt=function(){
		$.ajax({
	        type: "get",
	        dataType : 'json',
	        async: true,
	        timeout : 1000*600, //超时时间设置，单位毫秒
	        url: "/list_fea",       
	        success: function(response) { 
	           console.info(response);
	           var data=response.data;
	           for (var i = 0; i < data.length; i++) {
	           	var li='<li><a href="#">'+data[i]+'</a></li>';
	           //	console.info(li);
	           	$("#runList").append(li);
	           }
	           
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
               	alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
	        }
	    });
	};
	$("#add_btn").click(function(){
		addCS();
	});
	//根据类型改变字典select;
	$('body').on('change','.type',function(e){
		var t=$(this).val();
		var dd=$(this).closest('tr').children().eq(5).children();
		//console.info(dd);
		//判断t的值
		if (t!="数据字典") {
			dd.attr("disabled","disabled");
		}else{
			dd.removeAttr("disabled");
		}
	});
	$("#save_btn").click(function(){
		save();
	});
	$("#yulan_btn").click(function(){
		fabu();
	});
	$("#dbdChoose").click(function(){
		dbdChoose('');
	});
	$("#dbdChoose2").click(function(){
		dbdChoose('2');
	});
	$("#dpChoose").click(function(){
		dpChoose();
	});
	$(tb).on('click','img',function(){
		$(this).parent().parent().parent().remove();
	})
	$("body").on('click','#runButton',function(){			
		getFeaTxt();
	});
	$("body").on('click','#runList li',function(){	
		var a=$(this).find('a').text();
		$("#feaName").val(a);
	});
});