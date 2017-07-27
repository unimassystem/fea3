//
$(document).ready(function(){
	var theRequest ={},theEND,str;
//从ke分析跳过来时带的参数
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
		a=decodeURI(url);
		if (a.indexOf("?") != -1) {
		    str = a.substr(1);
		    strs = str.split("&");
		    for(var i = 0; i < strs.length; i ++) {
		        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		    }
		}
		nowWorkSpace = theRequest.nowWorkSpace;
		df_name = theRequest.df_name; 		
		console.info("-----nowWorkSpace:"+nowWorkSpace+"   df_name:"+df_name)
        if(nowWorkSpace!=undefined){
        	$("#nowWorkSpace").text(nowWorkSpace);
        	$("#inputVal").val(df_name);
	        $.ajax({
	        	url:"/exec?prmtv="+"use "+nowWorkSpace,
				type:'get',
				cache : false,
				success:function(){
					

					//展开工作区
					expandCheckedNode();
					//load表	
					loadData();	
					 $(window.parent.document).find('#feaA').css({"color":"#0071c5","background":"#ffffff"});
					 $(window.parent.document).find('#ke').css({"color":"#ffffff","background":"rgb(0,113,197)"});
				
				}		
	        });
	    }
		return theRequest;
	} 
	GetRequest();


})





var tableThis={};
var dialogThis={};
var tab={};
var dia={};
var zTree;
$("#nws_input").val("");
$("#nowWorkSpace").text("public");
$("#nws li a").on("click",function(e){		
	e.preventDefault();
	var nws=$(this).text("");
	$("#nowWorkSpace").text(nws);
});
$("#search").click(function(){
	loadData();
	var p=$("#inputVal").val();
	if(p!=null && p!=""){
		createButton(p);
	}
});
$("#type").val("csv");
$("#errorSpace").val("");
$(".string,.connect,.loadWay").hide();
$("#store_type").val("csv");
$(".store_connect").hide();

showTables();//创建树形



//展开选择的	
function expandCheckedNode(){
	var nwsNode = $("#nowWorkSpace").text();

	//zTree.expandAll(false);
	var parentZNode = zTree.getNodeByParam("name", nwsNode, null); //获取父节点
	//alert(nwsNode);
    zTree.expandNode(parentZNode, true, true, true);
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
				expandCheckedNode();				
			}
        });
    }
});



function showNwsTable(){
	$.ajax({
		url:"/exec?prmtv="+"show "+$("#nowWorkSpace").text(),
		dataType : "json",
		cache : false,
		success:function(dataAll){
			var results=dataAll.result;		
			var result=JSON.parse(results);
			var myCol=result.columns;//获取列名	
			var data=result.data;
			var names =[];
			for (var i = 0; i < data.length; i++) {				
				var row = data[i];
				var field = row[0];
				name='<option value='+field+'>'+field+'</option> ';
				names.push(name);		
			}
			$("#another_df_s").html(names);	
			$("#another_df_udf0").html(names);	

		}
	});

}



$("body").on('click', ".udf0", function(){ 
	var name = $(this).attr("name");
	 
	if (name === "df_append"){
		$("#guanlian_udf1").html("");
		var nulltableDIV = "<div id='null_table_div'><label for='udf0'>是否空表：</label><select id='is_null_table'><option value='true'>是</option><option value='false'>否</option></select></div>";
		 $("#guanlian_udf1").append(nulltableDIV);
	}else{		
		$("#guanlian_udf1").html("");
	}	
});
$('body').on('change','#is_null_table',function(){
	var isnull = $(this).children('option:selected').val();//这就是selected的值
	if(isnull==='false'){
		var isguanlian_table = "<div id='is_guanlian_table_div'><label for='udf0'>是否关联表：</label><select id='is_guanlian_table'><option value='false'>否</option><option value='true'>是</option></select></div>";
		 $("#guanlian_udf1").append(isguanlian_table);	
	}else{
		$("#is_guanlian_table_div").html("");
		$("#guanlian_table_div").html("");
	}

})
$('body').on('change','#is_guanlian_table',function(){
	var is_guanlian_table = $(this).children('option:selected').val();//这就是selected的值
	if(is_guanlian_table==='true'){
		showNwsTable();
		var guanlian_table = "<div id='guanlian_table_div'><label for='udf0'>关联表：</label><select id='another_df_udf0' style='width:200px;'></select></div>";
		$("#guanlian_udf1").append(guanlian_table);
	}else{
		$("#guanlian_table_div").html("");
	}
})

$("body").on('click', ".ml", function(){ 

	$("#guanlian").html("");
    var name = $(this).attr("name")
    if (name == "pca"){
    	$("#guanlian").append("<label for='ml'>特征向量选择：</label><select id='pcas' class='form-control' style='width:200px;'><option value=''>无</option><option value='pca_cmpts'>特征向量</option><option value='pca_ratio'>特征向量百分比</option></select>");   	
    }else if (name == "ica"){
    	$("#guanlian").append("<label for='ml'>特征向量选择：</label><select id='icas' class='form-control' style='width:200px;'><option value=''>无</option><option value='ica_cmpts'>特征向量</option></select>");   	
    }else if(name == "svd"){
    	$("#guanlian").append("<label for='ml'>特征向量选择：</label><select id='svds' class='form-control' style='width:200px;'><option value=''>无</option><option value='svd_cmpts'>特征向量</option><option value='svd_ratio'>特征向量百分比</option></select>");   	

    }else if(name=="knn" ||name=="dt" || name=="svm" || name=="gnb"|| name=="rf" || name=="gbdt" ||name=="lda" ||name=="qda" ||name=="adaBoost"||name=="lr" ||name=="SVR" ||name=="LR" || name=="DTR" ||name=="DFR" || name=="GBDTR" ||name=="RFR" || name=="tts" ||name=="score"){
    	showNwsTable();
		$("#guanlian").append("<label for='ml'>标记数据表：</label><select id='another_df_s' class='form-control' style='width:200px;'></select>");
    }else if(name=="train_load"){
    	$("#guanlian").append("<label for='ml'>特征数据：</label><select id='loads' class='form-control' style='width:200px;'><option value='load_A'>花朵</option><option value='load_B'>波士顿房价</option></select>");   	
    }else if (name=="load_model"){
		$("#guanlian").append("<label for='ml'>选择模型文件:</label><select id='listZip' class='form-control' style='width:400px;'></select>");
		var options = [];
		$.ajax({
	        type: "get",
	        dataType : 'json',
	        async: true,
	        timeout : 1000*600, //超时时间设置，单位毫秒
	        url: "/list_data",       
	        success: function(response) {        
	           var data=response.data;
	           for (var i = 0; i < data.length; i++) {
	           		if(data[i].endWith(".zip")){
	           			var option='<option value="'+data[i]+'">'+data[i]+'</option>';
	           			options.push(option);
	           		}
	           }	           
	           $("#listZip").html(options);       
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
               	alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
	        }
	    });
    }





});   //这段代码经测试是对的


String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

   


$(".tabs ul li").on('click',function(){
	$("#guanlian").html("");
	
})
	
//<--------------------------大工具栏--------------------------》	

//==============================存储数据=======================
//-------------存储类型-------------
$("body").on("click",".tool20",function(e){		
		e.preventDefault();
		$("#mt01").modal("toggle");
		df_name_store=$(this).parents(".dialog01").attr("id");
    	//$("#store_DT").val(df_name_store);
});
$(".store_type li a").on("click",function(){
	var type=$(this).text();		
	$("#store_type").val(type);		
	if(type=="csv"||type=="pkl"){
		$(".store_txt,.store_sql").show();
		$(".store_connect").hide();
	} if(type=="jdbc"){
		$(".store_txt").hide();
		$(".store_sql,.store_connect").show();
	} if(type=="esql"){
		$(".store_txt").hide();
		$(".store_sql,.store_connect").show();
	} if(type=="nosql"){
		$(".store_txt").hide();
		$(".store_sql,.store_connect").show();
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
		var b=$("#store_txt").val();
		var c=$("#store_type").val();
		var d=$("#store_param").val();
		var pcsv;
		if (d==""||d==null) {
		 	pcsv="store "+df_name_store+" to "+c+" by "+b;
		 }else {
		 	pcsv="store "+df_name_store+" to "+c+" by "+b+" with ("+d+")";
		 }
		 subStoreOk(pcsv);			
		
	}
	//存储类型jdbc时
	if($("#store_type").val()=="jdbc"){			
		var b=$("#store_connect").val();
		var d=$("#store_sql").val();
		var pjdbc="store "+df_name_store+" to jdbc by "+b+" with "+d;			
		 subStoreOk(pjdbc);
	}

	if($("#store_type").val()=="esql"){			
		//var a=$("#type").val();
		var b=$("#store_connect").val();
		var d=$("#store_sql").val();
		var pesql="store "+df_name_store+" to udb by "+b+" with "+d;		
		subStoreOk(pesql);
	}

	if($("#store_type").val()=="nosql"){			
		//var a=$("#type").val();
		var b=$("#store_connect").val();
		var d=$("#store_sql").val();
		var pnosql="store "+df_name_store+" to ssdb by "+b+" with "+d;			
		subStoreOk(pnosql);
	}
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
			var error=data.error;
			var ret=data.ret;
			if (ret===0) {
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
//-----------------------------------------------------右击菜单----------------------------
var rMenu = $("#rMenu");
//显示右键菜单
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    $("#rMenu").css({
    	"top": y + "px", 
    	"left": x + "px",
    	"visibility" : "visible"
    });
   $("body").bind("mousedown", onBodyMouseDown);
}
//隐藏右键菜单
function hideRMenu() {
    if (rMenu) 
    	rMenu.css({
        	"visibility": "hidden"
    	});
   $("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
   if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
       rMenu.css({
           "visibility": "hidden"
       });
   }
}
// function beforeRemove(treeId, treeNode) {
//     zTree.selectNode(treeNode);
//     return confirm("确定要删除DF表 (" + treeNode.name + ") 吗？");
// }
function beforeRemove(treeId, treeNode) {
    var nodes = zTree.getCheckedNodes(true);
    var names = "";
    for (var i = 0; i <nodes.length; i++) {
		var name =nodes[i].name;
		names = names+name+",";
	}
    return confirm("确定要删除DF表 (" + names+ ") 吗？");
}
// function onRemove(event, treeId, treeNode) {
//     var nNode = zTree.getSelectedNodes()[0];
//     var cmd = "drop "+treeNode.name;
//     if (treeNode) {
//         hideRMenu();
//         zTree.removeNode(nNode,true);
//         $.ajax({
//             url:"/exec?prmtv="+cmd,
// 			dataType : "json",
// 			success :function(data){
// 				var error=data.error;
// 				var ret=data.ret;
// 				if (ret===0) {
// 					alert("删除成功")
//                     showTables();
// 				}
// 				if (ret===1){
// 					$("#errorSpace").val("");
// 					$("#errorSpace").val(error);
// 				}
// 			}
// 	    });
//     }
// }

function onRemove(event, treeId, treeNode) {
   //获取选中的节点 即表名
	var nodes = zTree.getCheckedNodes(true);
	for (var i = 0; i <nodes.length; i++) {
		var name =nodes[i].name;
		var cmd = "drop "+name;
		// hideRMenu();
        zTree.removeNode(nodes[i],true);
		$.ajax({
            url:"/exec?prmtv="+cmd,
			dataType : "json",
			success :function(data){
				var error=data.error;
				var ret=data.ret;
				if (ret===0) {
				}				
			}
	    });
		  showTables();
	}
}



// zTree right click
function zTreeOnRightClick(event, treeId, treeNode) {
    if(treeNode && !treeNode.noR && treeNode.icon !=null ){   //noR属性为true表示禁止右键菜单
       zTree.cancelSelectedNode();
       zTree.selectNode(treeNode);
       showRMenu("node", event.clientX, event.clientY);
    }
}
//对表数量进行检测，只能对两张表进行操作
function checkNodeLength(){
	var nodes = zTree.getCheckedNodes(true);
	if(nodes.length > 2){
		alert("大于两张表，只能对两张表进行操作")
		return false;
	}else if(nodes.length < 2){
		alert("小于两张表，不能进行关联和合并")
		return false;
	}
	return true;
}
//==============================关联数据=======================




//关联表
$("#m_join").click(function() {
	if(checkNodeLength()){
		 hideRMenu();
		$("#mt02").modal("toggle");
		//获取选中的节点 即表名
		var nodes = zTree.getCheckedNodes(true);
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
						
					var join_col_op;
					var join_col_op1='<option value="index">index</option> ';
					myCol2.push(join_col_op1);		
					for (var i = 0; i < myCol.length; i++) {					
						join_col_op='<option value='+myCol[i]+'>'+myCol[i]+'</option> ';
						myCol2.push(join_col_op);						
					}	
					$('#multiselect_join').multiselect();
	    			$("#multiselect_join").html(myCol2);
	    			$("#multiselect_join_to").html("");				
				}
			});
		}		 
	}   
});
 function content(content_list,type){
	var contentValue="";
	if(content_list.length > 0){
		if(type == "df_ljoin" || type == "df_rjoin"){
			contentValue = " with "+content_list;
		}else{
			contentValue = " by ("+content_list+")";
		}
	}
	return contentValue;
}

$("#submit_join").click(function(){
	var content_list=[];
	$("#multiselect_join_to option").each(function(){
        content_list.push($(this).val());
    });
	var a=$("#tableChiosed").val();
	var c=$("#anotherName").val();
	//df2 = join (df0,df1) by (字段0,字段1)
	// var pJoin=c+" = join ("+a+")"+content(content_list); 

	var joinType = $("#joinType").children('option:selected').val();
	var cmd = null;
	if(joinType == "df_ljoin"){
		cmd = c+" = @udf "+a+" by udf0.df_ljoin "+content(content_list,"df_ljoin"); 
	}else if(joinType == "df_rjoin"){
		cmd = c+" = @udf "+a+" by udf0.df_rjoin "+content(content_list,"df_rjoin"); 
	}else{
		cmd = c+" = join ("+a+")"+content(content_list,"join"); 
	}



		$.ajax({
		url : "/exec?prmtv="+cmd ,
		dataType : "json",
		type:'get',
		cache : false,
		success :function(data){
			console.info(data);
			//var data=JSON.parse(data);
			var error=data.error;
			var ret=data.ret;
			if (ret===0) {
				createDialog(c);				
				dumpDataByajax(c);
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
//合并表

$("#m_union").click(function() {
   if(checkNodeLength()){
   	 	hideRMenu();
		$("#mt03").modal("toggle");
		//获取选中的节点 即表名
		var nodes = zTree.getCheckedNodes(true);
		var tabArr=[];
		for (var i = 0; i <nodes.length; i++) {
			var tab=nodes[i].name;
			tabArr.push(tab);
		}
		$("#tableChiosed_U").val(tabArr);
	}
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


// // //ztree删除一个节点

$("#m_del").click(function() {
    //获取选中的节点 即表名
	var nodes = zTree.getCheckedNodes(true);
	for (var i = 0; i <nodes.length; i++) {   
	    zTree.removeNode(nodes[i]);  
        var name =nodes[i].name;
		var cmd = "drop "+name;
		$.ajax({
            url:"/exec?prmtv="+cmd,
			dataType : "json",
			success :function(data){
				var error=data.error;
				var ret=data.ret;
				if (ret===0) {
				}				
			}
	    });
		
	}
	hideRMenu();
	// showTables();
});


// $("#m_del").click(function() {
//     var nNode = zTree.getSelectedNodes()[0];
//     if (nNode) {
//         hideRMenu();
//         $("#"+nNode.name).dialog("destroy").remove();		
// 		$("#nav_box button").each(function(){
// 			var a=$(this).text();
// 			if (a===nNode.name) {
// 				$(this).hide();
// 			}
// 		})
//         zTree.removeNode(nNode,true);             
//     }
// });
var odf_table_name ;
// //重命名一个节点
$("#m_rename").click(function() {
    var nNode = zTree.getSelectedNodes()[0];
    if (nNode) {
        hideRMenu();
        odf_table_name = nNode.name;
        zTree.editName(nNode);
    }
});
//改表名
function zTreeOnRename(event, treeId, treeNode) {
    var cmd = "alias "+odf_table_name+" as "+treeNode.name;
    if (treeNode) {
        hideRMenu();
        $.ajax({
            url:"/exec?prmtv="+cmd,
            dataType : "json",
            success :function(data){
                var error=data.error;
                var ret=data.ret;
                if (ret===0) {
                    alert("表建别名成功！")
                    showTables();
                }
                if (ret===1){
                    $("#errorSpace").val("");
                    $("#errorSpace").val(error);
                }
            }
        });
    }
}

//--------------------showTables()-----------------------------
function showTables(){
	var setting = {
        view:{
            showIcon:true,
            expandSpeed: "fast",
            showLine:true
        },
//        edit: {
//         //   enable: true
//            //showRemoveBtn: true,
//           // showRenameBtn: true
//        },
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
            // beforeRemove: beforeRemove,
            // onRemove: onRemove,
            onRename: zTreeOnRename,
            onRightClick : zTreeOnRightClick,   //右键事件
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
			//console.info(n);right
			//工作区数据存放在DF表下面 （name数组就是工作区内容）
			for(var i=0;i<n.length;i++){
				var oChild={
						"id":parseInt(1+[i+1]),"pId":1,"name":n[i]
				};
				name.push(oChild);
			}

			//寻找每个工作区所对应的表
			var len=n.length+1;
			for(var i = 0;i <len; i++){
				for(var j=0;j<data.length;j++){
					if(n[i]==data[j][2]){
						//console.info(n[i],data[j][2]);
						var oChildC={
								"id":parseInt(1+[j+len]),"pId":parseInt(1+[i+1]),"name":data[j][0], icon:"./image/resize.png"
						};
						name.push(oChildC);
					}					
				}

			}
			zNodes = name;
			$.each(zNodes, function(i, v){
					v.isParent = true
			})
			$.fn.zTree.init($("#treeList"), setting, zNodes);
			zTree = $.fn.zTree.getZTreeObj("treeList");
			var nodes = $("#nowWorkSpace").text();
			var parentZNode = zTree.getNodeByParam("name", nodes, null); //获取父节点
            zTree.expandNode(parentZNode, true, true, true);
			
		}
	});
};
//刷新功能
$("#shuaxin").click(function(){
	showTables();
});
//点击搜索和点击树节点的时候触发
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
		createDialog(inputVal);		
		createDataByajax(inputVal);		
	}	
	//table.ajax.url('/search?keyword=' + inputVal).load();
};
var pox="left";
var pp=0;
var spix=10;
//-----------------------------------------------------------------------------
//创建Dialog
function createDialog(title){
	if($("#nav_box button:visible").size()===1){
		pp=0;
	}
	/*if($("#"+title).size()){
		return f
	}*/
	//var title1 = '<div id='+title+' '+'title='+title+' class="dialog01"></div>';
	//$("#right_list").append('<div id=windowContent></div>');
	$("#right_list").append('<div id='+title+' '+'title='+title+' class="dialog01"></div>');
	$("#"+title).append("<div class='tool'></div>");	
	$(".tool").append("<ul class='list-unstyled list-inline'></ul>");
	var icon=["-unchecked","-book","-plus","-minus","-th-large","-pencil","-eye-open","-edit","-text-color","-random","-log-in","-plus-sign","-list","-move","-tag","-magnet","-screenshot","-grain","-list-alt","-stats","-arrow-down"];
	var name=["新建空表","克隆表","增加","过滤","选择","排序","去重","列类型","字符串","单字段分组统计","行列互换","填充空值","设置索引","重置索引","分组统计","udf函数","机器学习","lambda函数","简要信息","绘图","存储数据"];
	for(var i=0;i<21;i++){
		var html='<li class="tool'+i+'"><a href="javascript:void(0)"><span class="glyphicon glyphicon'+icon[i]+'"></span>'+name[i]+'</a></li>';
		//var html='<li class="tool0"><a href="javascript" onclick=""><span class="glyphicon glyphicon'+icon[i]+'"></span>列编辑</a></li>';
		$("#"+title).find(".tool ul").append(html);
	}
	$("#"+title).append('<table class='+title+' '+'></table>')
	tab[title]=$( "#"+title).dialog({
		height:"auto",
		width:1000,
		minHeight:0,
		autoOpen:true,
		resizable:false,			
		position: { my: pox+"+"+pp*spix+" top"+"+"+pp*spix, at:pox+"+"+pp*spix, of: "#right_list" ,collision: 'fit'},
		close:function(){						
			$("#nav_box button").each(function(){
				var a=$(this).text();
				if (a===title) {
					$(this).hide();										
				}
			})
			$(this).dialog("destroy").remove();			
			tab[title].destroy();
			$(".xglm_box").hide();
		},
		open:function(){
			tableThis.key=title;
			dialogThis.key=title;
		}
	});
	pp++;
};
//============================创建表数据========================
var myColArr=[];
var myColArrs=[],dataArr=[];
var data=[];
//var tab02;
function createDataByajax(title){
	$.getJSON("/exec?prmtv=dump"+" "+$("#inputVal").val(),function(dataAll){
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
		}
		//讲index添加到列名中
		//unshift：将参数添加到原数组开头，并返回数组的长度
		var b = myCol2.unshift("index"); // b为新数组的长度，myCol除了原来的对象，增加里index
		myColArrs=[];
		dataArr=[];			
		if(myColArrs.length==0){
			for(var i=0;i<myCol2.length;i++){
				myColArrs.push({"title":myCol2[i]})
			}
			for (var i = 0; i < data.length; i++) {
				var b=data[i].unshift(index[i]);
				dataArr.push(data[i]);
			}			
		}
		insertDataToTable(title);
	});
};
//直接通过表名dump数据
function dumpDataByajax(table){
	$.getJSON("/exec?prmtv=dump"+" "+table,function(dataAll){
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
		}
		//讲index添加到列名中
		//unshift：将参数添加到原数组开头，并返回数组的长度
		var b = myCol2.unshift("index"); // b为新数组的长度，myCol除了原来的对象，增加里index
		myColArrs=[];
		dataArr=[];			
		if(myColArrs.length==0){
			for(var i=0;i<myCol2.length;i++){
				myColArrs.push({"title":myCol2[i]})
			}
			for (var i = 0; i < data.length; i++) {
				var b=data[i].unshift(index[i]);
				dataArr.push(data[i]);
			}			
		}
		insertDataToTable(table);
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
	if ( $.fn.dataTable.isDataTable("."+title)) {
		delete tab[title]
		tab[title].destroy();
	    tab[title]=$("."+title).DataTable({		
		columns : myColArrs,
		data:dataArr,
		scrollY: "400px",
		ordering:false,
		scrollX: true, 
		retrieve: true,	
		paging: false,		
		"oLanguage" :Language
		});	
	}
	else {
	    tab[title]=$("."+title).DataTable({		   		
		columns : myColArrs,
		data:dataArr,
		scrollY: "400px",
		ordering:false,
		scrollX: true, 		
		"oLanguage" :Language
		});	
	}
	
	// delete tab[title]
	// tab[title]=$("."+title).DataTable({		
	// 	//serverSide : true,
	// 	columns : myColArrs,
	// 	data:dataArr,
	// 	scrollY: "400px",
	// 	ordering:false,
	// 	scrollX: true, 		
	// 	"oLanguage" :Language
	// });	
};

//============给每一列增加一个复选框========================
/*function addChiose(title){
	$("."+title).find("thead th").each(function (){	     
	       $(this).append( '<input type="checkbox" style="margin-left:10px;">' );
	});
};*/

function zTreeOnClick(event, treeId, treeNode) {
	$("#inputVal").val(treeNode.name);
	$("#tableChiosed_U").val(treeNode.name);
	$("#tableChiosed").val(treeNode.name);
	var sNodes = zTree.getSelectedNodes();
	if (sNodes.length > 0) {
		var node = sNodes[0].getParentNode();
		var nameP=node.name;
	}

	$.ajax({
    	url:"/exec?prmtv="+"use "+nameP,
		type:'get',
		cache : false,
		success:function(data){
			$("#nowWorkSpace").text(nameP);
			 loadData();
			 var isExist = false;
			$("#nav_box button:visible").each(function(){
				var a=$(this).text();
				if (a===treeNode.name) {
					isExist = true;					
				}
			})
			if(!isExist){
				createButton(treeNode.name);
			}				
		}
    });
};

function createButton(p){	
	var button='<button class="table_name btn btn-default" style="margin-left:10px;">'+p+'</button>';		
	$("#nav_box").append(button);		
}

$("body").on("click",".ui-dialog",function(e){	
	//console.info(e.view);
	var title=$(this).find(".ui-dialog-title").text();
	//console.info(title);
	var a=e.view;
	var key=a.dialogThis.key
	//console.info(a.dialogThis.key);
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
	
	


