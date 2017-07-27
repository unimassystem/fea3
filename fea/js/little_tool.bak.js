// $(document).ready(function(){
	$(".xglm_box,.xgbm_box").hide();
	var Index;

	//=========================列高亮==================    
	$("body").on("mouseover","td",function(){		
		var colIdx=tab[tableThis.key].cell(this).index().column;//这个单元格所在的列
		//console.info(colIdx);
		if(colIdx!==null){
			$(tab[tableThis.key].cells().nodes()).removeClass("highLight");
			$(tab[tableThis.key].column(colIdx).nodes()).addClass("highLight");
		}
	})
	.on("mouseleave",function(){
		$(tab[tableThis.key].cells().nodes()).removeClass("highLight");
	});

	//============列操作·更改列名========================	
var oldColName;
	$("body").on("dblclick","th",function(e){
		//console.info(e);
		
		$(".xglm_box").css({"top":e.pageY-60,"left":e.clientX-40,"z-index":"10000"});
		$(".xglm_box").show();
		Index=$(tab[tableThis.key].columns(this).header()).index();
		//console.info(Index);
		oldColName=$(tab[tableThis.key].columns(this).header()).text();//老列名
		//console.info(typeof(oldColName));
		//console.info(t);
		//var a=oldColName.toString();
		$("#ChangeColName").val(oldColName);
		df_name_xglm=$(this).parents(".dialog01").attr("id");	
	});
	$("#ChangeColName_ok").click(function(){
		var inputVal=$("#ChangeColName").val();	//新列
		//var df_name=$("#ui-id-1").text();
		//$(tab[tableThis.key].columns(Index).header()).text(inputVal);
		//console.info(Index);
		$(".xglm_box").hide();
		//var pXglm;
		//console.info(parseInt(oldColName));
		//var c=parseInt(oldColName);
		//var c1=oldColName-0;
		alert(oldColName);
		console.info(c1);
		console.info(typeof(c1));
		if (typeof(c1)==="number") {
			//alert(c!="NaN");
			 var pXglm="rename "+df_name_xglm+" as"+" ("+oldColName+":"+"\""+inputVal+"\""+")";
			 //console.info(pXglm);
		}
		else {
			alert("...");
			var pXglm="rename "+df_name_xglm+" as"+" ("+"\""+oldColName+"\""+":"+"\""+inputVal+"\""+")";
		}
		//var t=$(tab[tableThis.key].columns(this).header()).text();//老列名
		//var Change=
		//var Change=oldColName+":"+inputVal;
		
		same(pXglm,df_name_xglm);
	});
	$("#xglm_close").click(function(){
		$(".xglm_box").hide();
	});


	//============列操作·更改表名========================

	/*$("#ui-id-1").dblclick(function(){
		$(".xgbm_box").show();
	});

	$("#ChangeTableName_ok").click(function(){
			var inputVal=$("#ChangeTableName").val();	
			$("#ui-id-1").text(inputVal);
			$(".xgbm_box").hide();
	});

	$("#xgbm_close").click(function(){
		$(".xgbm_box").hide();
	});*/
	//<--------------------------------------------小工具栏-------------------------------------------------》
var same=function(p,n){
	$.ajax({
		url:"/exec?prmtv="+p,
		type:'get',
		cache : false,
		success:function(data){
			//console.info(data);
			var data=JSON.parse(data);
			var error=data.error;
			var results=data.result;
			if (results==0) {
				tab[n].destroy();
				tab[n].clear();
				$("."+n).html("");										   
				createDataByajax(n);
			}
			if (results==""||results==null){
				$("#errorSpace").val("");
				$("#errorSpace").val(error);
			}
								
		}
	});
	showTables();
};
var different=function(p){
	$.ajax({
		url:"/exec?prmtv="+p,
		type:'get',
		cache : false,
		success:function(data){
			//console.info(data);
			var data=JSON.parse(data);
			var error=data.error;
			var results=data.result;
			var treeObj;
			if (results==0) {

				showTables();
			}
			if (results==""||results==null){
				$("#errorSpace").val("");
				$("#errorSpace").val(error);
			}
								
		}
	});
	showTables();
};
	
	//============列操作·add========================
	$("body").on("click",".tool0",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtAdd").modal("toggle");
		df_name_add=$(this).parents(".dialog01").attr("id");
	});

	$("#Add_ok").click(function(){
		var a=$("#tableChiosed_N").val();
		var b=$("#Add_content").val();
		//var df_name=$("#ui-id-1").text();
		var pAdd=df_name_add+" = "+"add "+a+" by ("+b+")";
		same(pAdd,df_name_add);
	});

	//============列操作·Filter========================
	$("body").on("click",".tool1",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtFilter").modal("toggle");
		 df_name_filter=$(this).parents(".dialog01").attr("id");
	});

	$("#Filter_ok").click(function(){
		//var oName=$("#Filter_oName").val();
		//var parent=$(this).parents()
		var new_name=$("#Filter_nName").val();
		var content=$("#Filter_content").val();
		//var df_name=$(this).parents(".dialog01").attr("id");
		//console.info($(this).parents(".ui-dialog"));
		var pFilter=new_name+" = "+"filter "+df_name_filter+" by ("+content+")";
		if (new_name!=df_name_filter) {

			different(pFilter);

			//console.info(pFilter);
		}else {
			same(pFilter,df_name_filter);
		
		}
		
	});

	//============列操作·Choose========================
	$("body").on("click",".tool2",function(e){  //获取列名
		//alert("...");
		e.preventDefault();
		$("#mtChoose").modal("toggle");
		var colArrs=[];
		var Choose_cols=[];
		df_name_choose=$(this).parents(".dialog01").attr("id");
		//$("#inputVal").val(df_name_choose);
		var colArrNodes=tab[df_name_choose].columns().header();
		console.info(colArrNodes);
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);
		});		
		$(colArrs).each(function(){
			var Choose_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			Choose_cols.push(Choose_col);
		})
		//console.info(colArrs);
		$("#Choose_content").html(Choose_cols);
		//df_name_choose=$(this).parents(".dialog01").attr("id");
	});

	$("#Choose_ok").click(function(){
		var content_list=[];
		var child;
		$("#Choose_content input:checked").each(function(){
			content_list.push(($(this).parent().text()));					
		});
		//content_list=content_list.join(",");
		//console.info(content_list);
		//var oName=$("#Filter_oName").val();
		var new_name=$("#Choose_nName").val();
		var content=content_list;
		//var df_name=$("#ui-id-1").text();

		var pChoose=new_name+" = "+"loc "+df_name_choose+" by ("+content+")";
		if (new_name!=df_name_choose) {
			different(pChoose);
		}else {
			same(pChoose,df_name_choose);
		}
		
	});
	//============列操作·Order========================
	$("body").on("click",".tool3",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtOrder").modal("toggle");
		 df_name_order=$(this).parents(".dialog01").attr("id");
		//var df_name=$("#ui-id-1").text();
		$("#Order_oName").val(df_name_order);

		var colArrs=[];
		var Order_cols=[];
		var colArrNodes=tab[df_name_order].columns().header();
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);
		});		
		$(colArrs).each(function(){
			var Order_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			Order_cols.push(Order_col);
		})
		//console.info(colArrs);
		$("#Order_col").html(Order_cols);
	});

	$("#Order_ok").click(function(){
		var col_list=[];
		var child;
		$("#Order_col input:checked").each(function(){
			col_list.push(($(this).parent().text()));					
		});
		//content_list=content_list.join(",");
		//console.info(content_list);
		//var old_Name=$("#Order_oName").val();
		var new_name=$("#Order_nName").val();
		var Order_col=col_list;
		var content=$("#Order_content").val();
		//var df_name=$("#ui-id-1").text();
		var pOrder;
		$("#Order_oName").val(df_name_order);

		if (content=="") {
			pOrder=new_name+" = "+"order "+df_name_order+" by ("+Order_col+")";
		}if (content!="") {
			pOrder=new_name+" = "+"order "+df_name_order+" by ("+Order_col+") with ("+content+")";
		}
		
		if (new_name!=df_name_order) {
			different(pOrder);
		}else {
			same(pOrder,df_name_order);
		}
	});

	//============列操作·Ditinct========================
	$("body").on("click",".tool4",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtDistinct").modal("toggle");
		df_name_distinct=$(this).parents(".dialog01").attr("id");
		//console.info(df_name_distinct);
		var colArrs=[];
		var Distinct_cols=[];
		var colArrNodes=tab[df_name_distinct].columns().header();
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);
		});		
		$(colArrs).each(function(){
			var Distinct_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			Distinct_cols.push(Distinct_col);
		})
		//console.info(colArrs);
		$("#Distinct_content").html(Distinct_cols);
		
	});

	$("#Distinct_ok").click(function(){
		var content_list=[];
		var child;
		$("#Distinct_content input:checked").each(function(){
			content_list.push(($(this).parent().text()));					
		});
		//content_list=content_list.join(",");
		//console.info(content_list);
		//var oName=$("#Filter_oName").val();
		var new_name=$("#Distinct_nName").val();
		var content=content_list;
		//var df_name=$("#ui-id-1").text();
		
		var pDistinct=new_name+" = "+"distinct "+df_name_distinct+" by ("+content+")";
		if (new_name!=df_name_distinct) {
			different(pDistinct);
		}else {
			same(pDistinct,df_name_distinct);
		}
	});
	//============列操作·Alter========================
	$("body").on("click",".tool5",function(e){
		//alert("...");
		e.preventDefault();
		
		df_name_alter=$(this).parents(".dialog01").attr("id");
		var types;
		//types = @udf log by udf0.df_types
		var pAlter="types = @udf "+df_name_alter+" by udf0.df_types";

		different(pAlter);

		$("#mtAlter").modal("toggle");
		/*$("#alterClose").click(function(){
			$("#mtAlter").html("");
		});*/
		//获取types的name值

		//$("#clickShow").off().on("click",function(){
			$("#col_type_change").html("");
			//$("#clickShow").hide();
			//alert("..");
			showTypes();
			//return false;
		//});
		$("body").on("click",".alterOkClick",function(){
				//alert("...");
			var tdColName=$(this).parents("tr").children().first().text();
			var tdColNewType=$(this).parents("tr").find(".tdColNewType").val();

			//var tdColName=$(".tdColName").text();
			//var tdColNewType=$(".tdColNewType").val();
			var pAlter="alter "+df_name_alter+"."+tdColName+" as "+tdColNewType;
			alert("确定修改该列类型么？")
				same(pAlter,df_name_alter);
		});
	/*	var colNewTypeData=typesDT[0].column(3).data();*/
		/*var trText='<td ><input class="tdColNewType" type="text"class="form-control"></td><td><button class="alterOkClick" >确定</button></td>';
		//alert("...");
		$("#col_type_change tr:gt(0)").each(function(){
			$(this).append(trText);
			console.info($(this).html());
		});*/
		/*var colNameData=tab[types].column(1).data();
		console.info(colNameData);*/
		
		/*var colArrs=[];
		var Alter_cols=[];
		var colArrNodes=tab[df_name_alter].columns().header();
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);//获取所有列名
		});		
		var colCell;
		var conTypeArr=[];*/
		/*for (var i = 0; i < colArrs.length; i++) {
			colCell=tab[df_name_alter].columns(i).data();
			var colCellData=colCell[0];
			var conType=$.type(colCellData[0]);
			conTypeArr.push(conType);//获取所有列类型
		}
		//$("#mytable tr").find("td:nth-child(1)") 1表示获取每行的第一列
		var trTextArr=[];
		for (var i = 0; i < colArrs.length; i++) {
			var name=colArrs[i];
			var oldType=conTypeArr[i];
			var two=i+1;
			var trText='<tr><td class="tdColName">'+name+'</td><td class="tdColOldType">'+oldType+'</td><td ><input class="tdColNewType" type="text"class="form-control"></td><td><button class="alterOkClick" >确定</button></td></tr>';
							//console.info(trText);
			trTextArr.push(trText);			
		}
		$("#col_type_change tbody").html(trTextArr);*/

			/*$("body").on("click",".alterOkClick",function(){
				alert("...");
				var tdColName=$(this).parents("tr").find(".tdColName").text();
				var tdColNewType=$(this).parents("tr").find(".tdColNewType").val();

				//var tdColName=$(".tdColName").text();
				//var tdColNewType=$(".tdColNewType").val();
				var pAlter="alter "+df_name_alter+"."+tdColName+" as "+tdColNewType;
				alert("确定修改该列类型么？")
					same(pAlter);
			});*/
		//});
	});
	function showTypes(){

		$.ajax({
		type : 'get',
		url:'/exec?prmtv=dump%20types',
		cache : false,
		dataType : 'json',
		success:function(dataAll){
			//console.info(dataAll);
			var results=dataAll.result;
			var result=JSON.parse(results);
			var data=result.data;
			var myCol=result.columns;
			/*var b = myCol.unshift("newType","behaved");*/

			var myColArr = new Array();
			for(var i=0;i<myCol.length;i++){
				myColArr.push({"title":myCol[i]})
			}
			/*$("#col_type_change tbody").html(data);*/
			 typesDT=$('#col_type_change').DataTable({
		        "data": data,
		        "bAutoWidth":true,
				"bLengthChange" : true,
				ordering:false,
				"oLanguage" : Language,
				"destroy":true,
				columns : myColArr,
		    });
			 var tr=typesDT.rows().nodes();
			var trText='<td ><input class="tdColNewType" type="text" placeholder="请输入新的类型名称" class="form-control"></td><td><button class="alterOkClick" >确定</button></td>';
			for (var i = 0; i < tr.length; i++) {
				$(tr[i]).append(trText);
			}
		}

	});
		
};
		//============列操作·Str========================
	$("body").on("click",".tool6",function(e){  //获取列名
		//alert("...");
		e.preventDefault();
		$("#mtStr").modal("toggle");
		df_name_str=$(this).parents(".dialog01").attr("id");

		var colArrs=[];
		var Str_cols=[];
		var colArrNodes=tab[df_name_str].columns().header();
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);
		});		
		$(colArrs).each(function(){
			var str_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			Str_cols.push(str_col);
		})
		//console.info(colArrs);
		$("#Str_col").html(Str_cols);
		
	});

	$("#Str_ok").click(function(){
		//alert("...");
		var content_list=[];
		var child;
		$("#Str_col input:checked").each(function(){
			content_list.push(($(this).parent().text()));					
		});
		//content_list=content_list.join(",");
		//console.info(content_list);
		//var oName=$("#Filter_oName").val();
		var new_name=$("#Str_nName").val();
		var content=content_list;
		//var df_name=$("#ui-id-1").text();
		var bds=$("#Str_content").val();

		var pStr=df_name_str+"."+new_name+" = "+"str "+content+" by ("+bds+")";
		
			same(pStr,df_name_str);
		
		
	});

	//============列操作·group========================

	$("body").on("click",".tool7",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtGroup").modal("toggle");
		$("#groupWay").val("所有字段统计");
		$("#group_table").hide();

		df_name_group=$(this).parents(".dialog01").attr("id");

		var colArrs=[];
		var group_cols=[];
		var colArrNodes=tab[df_name_group].columns().header();
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);//获取所有列名
		});	
		//表中字段
		var trs=[];	
		for (var i = 0; i < colArrs.length; i++) {
			var tr='<tr><td><input type="checkbox"></td><td class="col">'+colArrs[i]+'</td><td><input type="text" class="groupTableTr form-control"></td></tr>';
			trs.push(tr);		
		}
		$("#group_table tbody").html(trs);
		//全字段时候获取列名
		$(colArrs).each(function(){
			var Group_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			group_cols.push(Group_col);
		})
		//console.info(colArrs);
		$("#Group_col").html(group_cols);
	});

	$(".groupWay li a").on("click",function(){
		var type=$(this).text();		
		$("#groupWay").val(type);		
		if(type=="所有字段统计"){
			$("#group_table").hide();
		} else{
			$("#group_table").show();
			$(".Group_hName").hide();
			$(".Group_col").hide();
		}
	});

	$("#Group_ok").click(function(){
		var type=$("#groupWay").val();
		if (type=="多字段统计") {
			Groupcols=[];
			$("#group_table tbody tr").each(function(){
				var child=$(this).children().children();			
				//console.info(child);
				for (var i = 0; i < child.length; i++) {
					if(child[i].type="checkbox"){
						if (child[i].checked==true) {
							//alert();
							var col=$(this).find(".col").text();
							Groupcols.push(col);//字段名	
						}
					}
				}		
			});
			//console.info(Groupcols);
			var gt=$("#Group_gName").val();
			var pfenzu=gt+"="+"group "+df_name_group+" by ("+Groupcols+")";

			different(pfenzu);
			//统计,获取函数
			var oarrs=[];
			var o={};
			$("#group_table tbody tr").each(function(){
				var cols=$(this).find(".col").text();
				var hsName=$(this).find(".groupTableTr").val();
				//console.info(hsName);
				if (hsName!=""&&hsName!="on") {
					//console.info(hsName!=""||hsName!="on");
					o[cols]=hsName;
				}
			});
			var v=JSON.stringify(o);
			//var v1=JSON.parse(v);
			//var reg = '/"/g';
			var v1=v.replace(/"/g,"");

			var str = v1.replace(/[{.*}]/g, "")
			//var v2=v1.replace("\"","");

			var a=$("#Group_nName").val();
			console.info(str);
			var pGroup=a+" = agg "+gt+" by ("+str+")";
			different(pGroup);
		}

		if (type=="所有字段统计") {
			var content_list=[];
			var b=$("#Group_hName").val();
			$("#Group_col input:checked").each(function(){
				content_list.push(($(this).parent().text()));					
			});
			var pGroup_02,pFenzu_02;
			pFenzu_02=gt+" = "+"group "+df_name_group+" by "+b;
			different(pFenzu_02);
			pGroup_02=a+" = "+"agg "+gt+" by("+content_list+")";
		}
		if (type=="单字段多函数统计") {
			var content_list=[];
			var b=$("#Group_hName").val();
			$("#Group_col input:checked").each(function(){
				content_list.push(($(this).parent().text()));					
			});
			var pGroup_03,pFenzu_03;
			pFenzu_02=gt+" = "+"group "+df_name_group+" by "+b;
			different(pFenzu_02);
			pGroup_02=a+" = "+"agg "+gt+"."+content_list+" by("+b+")";
		}	
	});

	//============列操作·udf========================

	$("body").on("click",".tool8",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtUdf").modal("toggle");
		df_name_udf=$(this).parents(".dialog01").attr("id");

		$("#mtUdf li a").on("click",function(){
			var bag=$(this).text();		
			$("#udfBag_name").val(bag);				
		});
	});

	$("#Udf_ok").click(function(){
		//reg_id_count = @udf log by udf0.df_agg_count with REG_ID
		var a=$("#Udf_tName").val();
		var b=$("#udf_nName").val();
		//var df_name=$("#ui-id-1").text();
		var c=$("#Udf_content").val();
		var d=$("#udfBag_name").val();
		var pUdf;
		if (c==""||c==null) {
			pUdf=a+" = "+"@udf "+df_name_udf+" by "+d+"."+b;
		}else{
			pUdf=a+" = "+"@udf "+df_name_udf+" by "+d+"."+b+" with ("+c+")";
		}
		
		different(pUdf);
	});

	//============列操作·udf========================

	$("body").on("click",".tool9",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtLambda").modal("toggle");
		df_name_lambda=$(this).parents(".dialog01").attr("id");

		var colArrs=[];
		var Str_cols=[];
		var colArrNodes=tab[df_name_lambda].columns().header();
		$(colArrNodes).each(function(){  //遍历th			
			var colArr=$(this).html();
			colArrs.push(colArr);
		});		
		$(colArrs).each(function(){
			var str_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			Str_cols.push(str_col);
		})
		//console.info(colArrs);
		$("#lambda_col").html(Str_cols);
	});

	$("#lambda_ok").click(function(){
		var content_list=[];
		$("#lambda_col input:checked").each(function(){
			content_list.push(($(this).parent().text()));					
		});
		var a=$("#lambda_cName").val();
		var b=$("#lambda_content").val();
		var pLambda=df_name_lambda+"."+a+" = map "+content_list+" by ("+b+")";
		same(pLambda);
	});

	//============列操作·plot========================

	$("body").on("click",".tool10",function(e){
		e.preventDefault();
		$("#mtPlot").modal("toggle");
		df_name_plot=$(this).parents(".dialog01").attr("id");
	});

	$("#plot_ok").click(function(){
		var a=$("#plot_content").val();
		//plot df名字 by 参数
		var pPlot="plot "+df_name_plot;
		$.ajax({
			url:"/exec?prmtv="+pPlot,
			type:'get',
			cache : false,
			success:function(data){
				//console.info(data);
				var data=JSON.parse(data);
				var error=data.error;
				var results=data.result;
				var b='<iframe src="'+results+'" width="100%" height="500"  allowtransparency="true" style="background-color=transparent"  frameborder="no"></iframe>'
				$("#mtPlot .modal-body").append(b);
			}
		});
	});
	//============列操作·更换表名========================
/*	$("body").on("click",".tool7",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtTbname").modal("toggle");
		$("#Tbname_oName").val($("#ui-id-1").text());
	});

	$("#Tbname_ok").click(function(){
		
		var new_name=$("#Tbname_nName").val();
		//$("#ui-id-1").text(new_name);
		//showTables();alias df表名 as 中文表名
		var pTbname="alias "+$("#ui-id-1").text()+" as "+new_name;
		$.ajax({
			url:"/exec?prmtv="+pTbname,
			type:'get',
			cache : false,
			success:function(data){
				console.info(data);
				var data=JSON.parse(data);
				var error=data.error;
				var results=data.result;
				if (results==0) {
					showTables();
				}
				if (results==""||results==null){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
				}					
			}
		});
	});*/
// });

