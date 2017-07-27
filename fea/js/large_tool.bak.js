// $(document).ready(function(){
	//$("#dialog").hide();

	var tableThis={};
	var dialogThis={};
	var tab={};
	var dia={};
	$("#nws_input").val("");
	$("#nowWorkSpace").text("public");
	/*$("#nws li ").on("click",function(e){		
			e.preventDefault();
			var nws=$(this).text("");
			$("#nowWorkSpace").text(nws);
	});*/
	$("#search").click(function(){
		loadData();
		var p=$("#inputVal").val();
		createButton(p);
	});
	$("#type").val("csv");
	$("#errorSpace").val("");
	$(".string,.connect,.loadWay").hide();
	$("#store_type").val("csv");
	$(".store_connect").hide();

showTables();//创建树形
	
	function showPublic(){
		var treeObj = $.fn.zTree.getZTreeObj("treeList");
		var nodes = $("#nowWorkSpace").text();
		var parentZNode = treeObj.getNodeByParam("name", nodes, null); //获取父节点 
			//console.info(parentZNode);
			treeObj.expandNode(parentZNode, true, true, true);
		//console.info(parentZNode[0]);
	};

	$("#nws_input").on('keypress',function(event){
            if(event.keyCode == "13")    
            {
                var inputVal=$("#nws_input").val();
                $("#nowWorkSpace").text(inputVal);
                $.ajax({
                	url:"/exec?prmtv="+"use "+$("#nowWorkSpace").text(),
					type:'get',
					cache : false,
					success:function(){
						showPublic();
						//showTables();
					}
                });
                $('#nws_input').val("");
            }
        });

	
//<--------------------------大工具栏--------------------------》	

	//==============================装载数据=======================

	//-------------装载类型-------------
	$("#nav li:eq(0)").on("click",function(e){		
			e.preventDefault();
			$("#mt").modal("toggle");
	});
	$(".type li a").on("click",function(){
		var type=$(this).text();		
		$("#type").val(type);		
		if(type=="csv"||type=="pkl"){
			$(".txt,.sql,.newName").show();
			$(".connect,.loadWay,.string").hide();
		} if(type=="jdbc"){
			$(".txt,.loadWay").hide();
			$(".sql,.connect,.newName,.string").show();
		} if(type=="esql"){
			$(".txt,.string").hide();
			$(".sql,.connect,.loadWay,.newName").show();
		} if(type=="nosql"){
			$(".txt,.loadWay,.string").hide();
			$(".sql,.connect,.newName").show();
		}
	});
	//--------数据源链接名称-----
	$(".connect li a").on("click",function(){
		var connect=$(this).text();		
		$("#connect").val(connect);				
	});
	//--------数据源链接字符-----
	$(".string li a").on("click",function(){
		var string=$(this).text();		
		$("#string").val(string);				
	});
	//--------装载方式-----
	$(".loadWay li a").on("click",function(){
		var loadWay=$(this).text();		
		$("#loadWay").val(loadWay);				
	});
	//---------------------------subLoad------------------------------------
	function subLoadOk(l){
		$.ajax({
			url:"/exec?prmtv="+l,
			type:'get',
			cache : false,
			success:function(data){
				console.info(data);
				var data=JSON.parse(data);
				var error=data.error;
				var ret=data.ret;
				//console.info(typeof(data));

				if (ret===0) {

					//var result=JSON.parse(results);
					/*var treeObj = $.fn.zTree.getZTreeObj("treeList");//获取id=treeList的树对象
					var newNodes = {name:c};
					var parent=$("#nowWorkSpace").text();
					var parentZNode = treeObj.getNodeByParam("name", parent, null); //获取父节点  
					//console.info(parentZNode);
					var newNode = treeObj.addNodes(parentZNode,newNodes,false);*/
					//console.info(newNode);
					showTables();
				}else if (ret===1){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
					alert("装载出错，请重新装载");
					$("#mt").modal("toggle");	
				}	
			}
		});
	};
	$("#subLoad").click(function(){
		//装载类型为csv时
		if($("#type").val()=="csv"||$("#type").val()=="pkl"){			
			var a=$("#txt").val();
			var b=$("#sql").val();
			var c=$("#newName").val();
			var d=$("#type").val();
			var pcsv;
			 if (b==""||b==null) {
			 	pcsv=c+" = "+"load "+d+" by "+a;
			 }else {
			 	pcsv=c+" = "+"load "+d+" by "+a+" with "+"( "+b+" )";
			 }			
			subLoadOk(pcsv);
		}
		//装载类型jdbc时
		if($("#type").val()=="jdbc"){			
			//var a=$("#type").val();
			var b=$("#connect").val();
			var c=$("#string").val();
			var d=$("#sql").val();
			var e=$("#newName").val();
			var pjdbc=e+" = "+"load jdbc by "+b+" with "+c+" query "+"( "+d+" )";			
			subLoadOk(pjdbc);
		}

		if($("#type").val()=="esql"){			
			//var a=$("#type").val();
			var b=$("#connect").val();
			var c=$("#loadWay").val();
			var d=$("#sql").val();
			var e=$("#newName").val();
			var pesql=e+" = "+"load esql by "+b+" "+c+" "+"( "+d+" )";			
			subLoadOk(pesql);
		}

		if($("#type").val()=="nosql"){			
			//var a=$("#type").val();
			var b=$("#connect").val();
			//var c=$("#loadWay").val();
			var d=$("#sql").val();
			var e=$("#newName").val();
			var pnosql=e+" = "+"load ssdb by "+b+" query "+"( "+d+" )";			
			subLoadOk(pnosql);
		}
	});
	
	//==============================存储数据=======================
	//-------------存储类型-------------
	$("body").on("click",".tool11",function(e){		
			e.preventDefault();
			$("#mt01").modal("toggle");
	});
	$(".store_type li a").on("click",function(){
		var type=$(this).text();		
		$("#store_type").val(type);		
		if(type=="csv"||type=="pkl"){
			$(".store_DT,.store_txt,.store_sql").show();
			$(".store_connect").hide();
		} if(type=="jdbc"){
			$(".store_txt").hide();
			$(".store_sql,.store_connect,.store_DT").show();
		} if(type=="esql"){
			$(".store_txt").hide();
			$(".store_sql,.store_connect,.store_DT").show();
		} if(type=="nosql"){
			$(".store_txt").hide();
			$(".store_sql,.store_connect,.store_DT").show();
		}
	});
	//--------数据源链接名称-----
	$(".store_connect li a").on("click",function(){
		var store_connect=$(this).text();		
		$("#store_connect").val(store_connect);				
	});
	//----------------subStore--------------------
	function subStoreOk(s){
		$.ajax({
			url:"/exec?prmtv="+s,
			type:'get',
			cache : false,
			success:function(data){
				console.info(data);
				var data=JSON.parse(data);
				var error=data.error;
				var ret=data.ret;
				if (ret===0) {
					// $("#errorSpace").val("");
					// $("#errorSpace").val(results);
					showTables();
				}
				if (ret===1){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
					alert("存储出错，请重新存储。");
					$("#mt01").modal("toggle");
				}					
			}
		});
	};
	$("#subStore").click(function(){
		//存储类型为csv或者pkl时
		if($("#store_type").val()=="csv"||$("#store_type").val()=="pkl"){			
			var a=$("#store_DT").val();
			var b=$("#store_txt").val();
			var c=$("#store_type").val();
			var d=$("#store_sql").val();
			var pcsv;
			if (d==""||d==null) {
			 	pcsv="store "+a+" to "+c+" by "+b;
			 }else {
			 	pcsv="store "+a+" to "+c+" by "+b+" with "+d;
			 }
			 subStoreOk(pcsv);			
			
		}
		//存储类型jdbc时
		if($("#store_type").val()=="jdbc"){			
			//var a=$("#type").val();
			var b=$("#store_connect").val();
			var d=$("#store_sql").val();
			var e=$("#store_DT").val();
			var pjdbc="store "+e+" to jdbc by "+b+" with "+d;			
			 subStoreOk(pjdbc);
		}

		if($("#store_type").val()=="esql"){			
			//var a=$("#type").val();
			var b=$("#store_connect").val();
			var d=$("#store_sql").val();
			var e=$("#store_DT").val();
			var pesql="store "+e+" to udb by "+b+" with "+d;		
			subStoreOk(pesql);
		}

		if($("#store_type").val()=="nosql"){			
			//var a=$("#type").val();
			var b=$("#store_connect").val();
			var d=$("#store_sql").val();
			var e=$("#store_DT").val();
			var pnosql="store "+e+" to ssdb by "+b+" with "+d;			
			subStoreOk(pnosql);
		}
	});
	//==============================关联数据=======================
	
	$("#nav li:eq(2)").on("click",function(e){		
		e.preventDefault();
		$("#mt02").modal("toggle");	
		//获取选中的节点 即表名
		var treeObj = $.fn.zTree.getZTreeObj("treeList");
		var nodes = treeObj.getCheckedNodes(true);
		var tabArr=[];
		for (var i = 0; i <nodes.length; i++) {
			var tab=nodes[i].name;
			tabArr.push(tab);
		}
		$("#tableChiosed").val(tabArr);
		var myCol2=[];
		//获取列名
		for (var i = 0; i < nodes.length; i++) {
			var tab=nodes[i].name;
			var colNode="dump "+tab;			
			$.ajax({
				url:"/exec?prmtv="+colNode,
				type:'get',
				cache : false,
				dataType:'json',
				success:function(dataAll){
					var results=dataAll.result;		
					var result=JSON.parse(results);	
					var myCol=result.columns;//获取列名
					//console.info(myCol);		
					for (var i = 0; i < myCol.length; i++) {
						var a='<span style="margin:10px;border:solid 1px #999999;">'+myCol[i]+'<input type="checkbox" style="margin-left:10px;"></span>';
						myCol2.push(a);
						//console.info(typeof(myCol2[i]));
					}
					//console.info(myCol2);
					$("#colChoised").html(myCol2);	
				}
			});
		}
	});

	$("#submit_join").click(function(){
		var content_list=[];
		$("#colChoised input:checked").each(function(){
			content_list.push(($(this).parent().text()));					
		});

		var a=$("#tableChiosed").val();
		var c=$("#anotherName").val();
		//df2 = join (df0,df1) by (字段0,字段1)
		var pJoin=c+" = join ("+a+") by ("+content_list+")"; 
			$.ajax({
			url : "/exec?prmtv="+pJoin ,
			dataType : "json",
			type:'get',
			cache : false,
			success :function(data){
				console.info(data);
				//var data=JSON.parse(data);
				var error=data.error;
				var ret=data.ret;
				if (ret===0) {
					showTables();
				}
				if (ret===1){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
					alert("关联出错，请重新关联。");
					$("#mt02").modal("toggle");
				}	
			}
		});
	});
	//==============================合并数据=======================
	
	$("#nav li:eq(3)").on("click",function(e){		
		e.preventDefault();
		$("#mt03").modal("toggle");
		//获取选中的节点 即表名
		var treeObj = $.fn.zTree.getZTreeObj("treeList");
		var nodes = treeObj.getCheckedNodes(true);
		var tabArr=[];
		for (var i = 0; i <nodes.length; i++) {
			var tab=nodes[i].name;
			tabArr.push(tab);
		}
		$("#tableChiosed_U").val(tabArr);
	});
	$("#submitUnion").click(function(){
		var a=$("#tableChiosed_U").val();
		var b=$("#UnionName").val();
		//df2 = union (df0,df1)
		var pUnion=b+" = union ("+a+")";
		$.ajax({
			url: "/exec?prmtv="+pUnion,
			dataType : "json",
			success :function(data){
				console.info(data);
				var error=data.error;
				var ret=data.ret;
				if (ret===0) {
					showTables();
				}
				if (ret===1){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
					alert("合并出错，请重新关联。");
					$("#mt03").modal("toggle");
				}
			}
		});
	});

	//==============================运行脚本=======================
	
	$("#nav li:eq(4)").on("click",function(e){		
		e.preventDefault();
		$("#mt04").modal("toggle");
		
	});
	$("#submit_fea").on("click",function(){
		var a=$("#txt_fea").val();
		var b=$("#fea_content").val();
		//run 脚本文件.fea with (@参数1=参数1,@参数2=参数2,...)
		var pfea="run "+a+" with ("+b+")";
		$.ajax({
			url:"/exec?prmtv="+pfea,
			dataType : "json",
			success :function(data){
				//console.info(data);
				//var data=JSON.parse(data);
				var error=data.error;
				var ret=data.ret;
				//console.info(ret);
				if (ret===0) {
					// $("#errorSpace").val("");
					// $("#errorSpace").val(ret);
					showTables();
				}
				if (ret===1){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
					alert("运行出错，请重新存储。");
					$("#mt04").modal("toggle");
				}	
			}
		});
	});
// });

//--------------------showTables()-----------------------------
function showTables(){
	var setting = {
			view:{
				showIcon:true,
				showLine:true			
			},
			check:{
				enable:true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "s", "N": "s" }
			},
			data : {
				simpleData : {
					enable : true
				}
			},
			callback : {
				//beforeClick: zTreeBeforeClick,
				onClick : zTreeOnClick
			}
	};	
	var zNodes = [];
	var namearr=[],tablearr=[];
	var n=[];
	var name=[];
	$.ajax({
		"url" : "/exec?prmtv=show%20tables" ,
		//"url" : "control.json" ,
		dataType : "json",
		success : function (dataAll) {	
			var results=dataAll.result;
			var result=JSON.parse(results);
			var data=result.data;
			var myCol=result.columns;
			var o={
					"id":1,"pId":0,"name":"DF表"
			};
			name.push(o);//存放父节点
			
			//获取workspace对应的数据
			for(var i=0;i<data.length;i++){
				 namearr.push(data[i][2]);	
			}
				
			//去掉名字重复的工作区
			for(var i = 0; i < namearr.length; i++){
				if (n.indexOf(namearr[i]) == -1){
					n.push(namearr[i]);		
				}				
			}
			
			//获取子节点兵存放
			for(var i=0;i<n.length;i++){
				var oChild={
						"id":parseInt(1+[i+1]),"pId":1,"name":n[i]
				};
				name.push(oChild);
			}
			//console.info(namearr)	
			//寻找每个工作区所对应的表
			for(var i = 0;i <n.length; i++){
				for(var j=0;j<data.length;j++){
					if(n[i]==data[j][2]){
						var oChildC={
								"id":parseInt(1+[j+11]),"pId":parseInt(1+[i+1]),"name":data[j][0], icon:"../../image/resize.png"
						};
						name.push(oChildC);
					}					
				}				
			}
			//console.info(name)
			zNodes = name;
			
			$.each(zNodes, function(i, v){
					v.isParent = true
			})			
			$.fn.zTree.init($("#treeList"), setting, zNodes);

			var treeObj = $.fn.zTree.getZTreeObj("treeList");
			var nodes = $("#nowWorkSpace").text();
			var parentZNode = treeObj.getNodeByParam("name", nodes, null); //获取父节点 
			//console.info(parentZNode);
			treeObj.expandNode(parentZNode, true, true, true);
		}
	});
};


//点击搜索的时候触发
function loadData(){

	var inputVal=$.trim($("#inputVal").val());
	if(inputVal==null||inputVal==""){
		alert("表名不能为空")
		return ;
	}
	if($("#"+inputVal).size()){
		if($("#"+inputVal+":visible").size()){
			return false;
		}else{
			$("#"+inputVal).dialog("open");
			createDataByajax(inputVal);
		}		
	}else{
		//alert("...");
		createDialog(inputVal);
		createDataByajax(inputVal);
		
	}
	
	//table.ajax.url('/search?keyword=' + inputVal).load();

};

//-----------------------------------------------------------------------------
//创建Dialog
function createDialog(title){
	/*if($("#"+title).size()){
		return false;
	}*/

	$("body").append('<div id='+title+' '+'title='+title+' class="dialog01"></div>');
	$("#"+title).append("<div class='tool'></div>");
	$(".tool").append("<ul class='list-unstyled list-inline'></ul>");
	var icon=["-plus","-minus","-th-large","-pencil","-eye-open","-edit","-text-color","-tag","-magnet","-grain","-stats","-arrow-down"];
	var name=["增加","过滤","选择","排序","去重","更改类型","字符串处理","分组统计","udf函数","lambda函数","绘图","存储数据"];
	for(var i=0;i<12;i++){
		var html='<li class="tool'+i+'"><a href="javascript:void(0)"><span class="glyphicon glyphicon'+icon[i]+'"></span>'+name[i]+'</a></li>';
		//var html='<li class="tool0"><a href="javascript" onclick=""><span class="glyphicon glyphicon'+icon[i]+'"></span>列编辑</a></li>';
		$("#"+title).find(".tool ul").append(html);1111111111
	}
	$("#"+title).append('<table class='+title+' '+'></table>')
	dia[title]=$( "#"+title).dialog({
		resizable:true,
		height:"auto",
		width:1000,
		minHeight:0,
		autoOpen:true,
		resizable:false,
		position: { my: "center center", at: "center top", of: window },
		close:function(){
			//console.info(tab[title]);
			$(this).dialog("destroy").remove();
			//this.destroy();
			//dia[title].destroy();
			tab[title].destroy();
			$(".xglm_box").hide();
			$("#right_list button").each(function(){
				var a=$(this).text();
				if (a===title) {
					$(this).hide();
				}
			})
			   // createDataByajax(title);
		},
		open:function(){
			/*var html='<span id="sz" class=" glyphicon glyphicon-download" style="position:absolute;top:10px;right:28px;"></span>';
			$("#ui-id-1").after(html);
			var ss='<span id="ss" class=" glyphicon glyphicon-upload" style="position:absolute;top:10px;right:44px;"></span>';
			$("#sz").after(ss);
			//$("#dialog").dialog("open");		
			//console.info(html);*/

			tableThis.key=title;
			dialogThis.key=title;
			//alert(tableThis);
		}
	});
	//$("#dialog").show();
};


//============================创建表数据========================


var myColArr=[];
var myColArrs=[],dataArr=[];
var data=[];
//var tab02;
function createDataByajax(title){
	
	$.getJSON("/exec?prmtv=dump"+" "+$("#inputVal").val(),function(dataAll){
		//alert("...");
		//var dataAll=JSON.parse(dataAlls);
		var results=dataAll.result;
		var ret=dataAll.ret;			
		var result=JSON.parse(results);
		if (ret===1) {
			$("#errorSpace").val("");
			$("#errorSpace").val(error);
		}
		data=result.data;	
		var index=result.index;	
		var myCol=result.columns;//获取列名
		var myCol2=[];
		for (var i = 0; i < myCol.length; i++) {
			var a=myCol[i].toString();
			myCol2.push(a);
			//console.info(typeof(myCol2[i]));
		}
		
		//console.info(myCol);
		//讲index添加到列名中
		//unshift：将参数添加到原数组开头，并返回数组的长度
		var b = myCol2.unshift("index"); // b为新数组的长度，myCol除了原来的对象，增加里index
		//console.info(myCol); 
		myColArrs=[];
		dataArr=[];			
		if(myColArrs.length==0){
			for(var i=0;i<myCol2.length;i++){
				
				//console.info(typeof(myCol2[i]));
				myColArrs.push({"title":myCol2[i]})
			}
			for (var i = 0; i < data.length; i++) {
			var b=data[i].unshift(index[i]);
			dataArr.push(data[i]);
			}
			//console.info(myColArrs);
			//console.info(dataArr);
		}

		//console.info(myColArrs);
		insertDataToTable(title);
	});
};

var Language = {
		"sProcessing" : "处理中...",
		"sLengthMenu" : "显示 _MENU_ 项结果",
		"sZeroRecords" : "没有匹配结果",
		"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
		"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
		"sInfoPostFix" : "",
		"sSearch" : "搜索:",
		"sUrl" : "",
		"sEmptyTable" : "表中数据为空",
		"sLoadingRecords" : "载入中...",
		"sInfoThousands" : ",",
		"oPaginate" : {
			"sFirst" : "首页",
			"sPrevious" : "上页",
			"sNext" : "下页",
			"sLast" : "末页"
		}
	};

//===================================将数据插入表中==========================



function insertDataToTable(title){

	/*tab02=$("."+title).DataTable({		
		//serverSide : true,
		columns : myColArrs,
		data:dataArr,
		"oLanguage" :Language
	});	*/
	//console.info(myColArrs);
	delete tab[title]
	tab[title]=$("."+title).DataTable({		
		//serverSide : true,
		columns : myColArrs,
		data:dataArr,
		scrollY: "400px",
		scrollX: true,
  		//scrollCollapse: true,
		"oLanguage" :Language
	});	
	 //addChiose(title);
};

//============给每一列增加一个复选框========================
/*function addChiose(title){
	$("."+title).find("thead th").each(function (){	     
	       $(this).append( '<input type="checkbox" style="margin-left:10px;">' );
	});
};*/






function zTreeOnClick(event, treeId, treeNode) {
	//var nodes = treeObj.getNodesByParam("name", "test", null);
	//$("#iKeyword").val($("#iKeyword").val() + " " + treeNode.name);
	//var treeNode_name=treeNode.name;
	$("#inputVal").val(treeNode.name);

	$("#tableChiosed_U").val(treeNode.name);
	$("#tableChiosed").val(treeNode.name);
	//$("body").find('.ui-widget-header').css("background-color","rgb(0,113,197)");
	loadData();

	createButton(treeNode.name);
	//addAlise();
};
function createButton(p){
	var button='<button class="table_name btn btn-default">'+p+'</button>';
	$("#right_list").append(button);
	//buttonColor();
}

$("body").on("click",".ui-dialog",function(e){
	//console.info(e.view);
	var title=$(this).find(".ui-dialog-title").text();
	/*console.info(title);
	var a=e.view;
	var key=a.dialogThis.key
	console.info(a.dialogThis.key);*/
	$(".table_name").each(function(){
		var name=$(this).text();
		if (title===name) {
			//console.info(name);
			$(this).addClass("btn-info");
			$(".table_name").not(this).removeClass("btn-info");
		}
	})
});

$("body").on("click",".table_name",function(){
	var b=$(this).text();
	$(this).addClass("btn-info");
	$(".table_name").not(this).removeClass("btn-info");
	//获取最大z-index
	var maxZ = Math.max.apply(null, $.map($('body > *'), function (e, n) {
            if ($(e).css('position') == 'absolute')
                return parseInt($(e).css('z-index')) || 1;
            })
        );
	var maxZ1=maxZ+1;
	$("body .ui-dialog-title").each(function(){
		if (b===$(this).text()) {
			$(this).parents(".ui-dialog").css("z-index",maxZ1);
		}
	});
});
/*function addAlise(){
	var addAlise='<button id="aliseText" type="button" onclick="showAlise();">显示别名</button>';
	$(".ui-dialog-title").append(addAlise);
}

function showAlise(){
	//alias df表名 as 中文表名
	//var pTbname="alise "+$("#ui-id-2").text()+" as "+"nihao";
	$("#mtTbname").modal("toggle");
	
}
$("#Tbname_ok").click(function(){
	$("#aliseText").text($("#Tbname_nName").val());
})*/
	
	


