// $(document).ready(function(){
	$(".xglm_box,.xgbm_box").hide();
	var Index;

    $("#modalDialog").draggable();//为模态对话框添加拖拽
    $("#mt").css("overflow", "hidden");//禁止模态对话框的半透明背景滚动
	//=========================列高亮==================
	$("body").on("mouseover","td",function(){
	 //wly暂时注释掉，因为报错
		// var colIdx=tab[tableThis.key].cell(this).index().column;//这个单元格所在的列
		// //console.info(colIdx);
		// if(colIdx!==null){
		// 	$(tab[tableThis.key].cells().nodes()).removeClass("highLight");
		// 	$(tab[tableThis.key].column(colIdx).nodes()).addClass("highLight");
		// }
	})
	.on("mouseleave",function(){
            //wly暂时注释掉，因为报错
		//$(tab[tableThis.key].cells().nodes()).removeClass("highLight");
	});

	//============列操作·更改列名========================
var oldColName;
	$("body").on("dblclick","th",function(e){
		//$(".xglm_box").css({"top":e.pageY-60,"left":e.clientX-40,"z-index":"10000"});
		$(".xglm_box").css({"top":e.pageY-25,"left":e.pageX-90,"z-index":"10000"});
		$(".xglm_box").show();
		Index=$(tab[tableThis.key].columns(this).header()).index();
		oldColName=$(tab[tableThis.key].columns(this).header()).text();
		$("#ChangeColName").val(oldColName);
		df_name_xglm=$(this).parents(".dialog01").attr("id");
	});
	$("#ChangeColName").on('keypress',function(event){
	    if(event.keyCode == "13")
	    {
	    	//修改列名
	    	var inputVal=$("#ChangeColName").val();	//新列
	    	var reg=/^(\d)*$/g;
			var rs=reg.test(oldColName);
			if (rs===true) {
				 var pXglm="rename "+df_name_xglm+" as"+" ("+oldColName+":"+"\""+inputVal+"\""+")";
			}
			else {
				var pXglm="rename "+df_name_xglm+" as"+" ("+"\""+oldColName+"\""+":"+"\""+inputVal+"\""+")";
			}
			same(pXglm,df_name_xglm);
	        // 如不是则隐藏元素
	        $('.xglm_box').hide();
	    }
	});

	$('body').bind('click', function(event) {
	    // IE支持 event.srcElement ， FF支持 event.target
	    var evt = event.srcElement ? event.srcElement : event.target;
	    if(evt.id == 'ChangeColName' ) return; // 如果是元素本身，则返回
	    else {
	        // 如不是则隐藏元素
	        $('.xglm_box').hide();
	    }
	});


	// $("#ChangeColName_ok").click(function(){
	// 	var inputVal=$("#ChangeColName").val();	//新列
	// 	$(".xglm_box").hide();
	// 	var reg=/^(\d)*$/g;
	// 	var rs=reg.test(oldColName);
	// 	if (rs===true) {
	// 		 var pXglm="rename "+df_name_xglm+" as"+" ("+oldColName+":"+"\""+inputVal+"\""+")";
	// 	}
	// 	else {
	// 		var pXglm="rename "+df_name_xglm+" as"+" ("+"\""+oldColName+"\""+":"+"\""+inputVal+"\""+")";
	// 	}

	// 	same(pXglm,df_name_xglm);
	// });
	// $("#xglm_close").click(function(){
	// 	$(".xglm_box").hide();
	// });

	//判断是否是函数
 	function isFuncation(str){
 		if(str.indexOf("(")!=-1&&str.indexOf(")")!=-1){
 			return true;
 		}
 		return false;
 	}
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
	//df表名之前含有序号的，去掉序号再加count
	// var suffix = function(n){
	// 	var pox = n.charAt(n.length-2);
	// 	if(pox=='_'){
	// 		n=n.substring(0,n.length-2);
	// 	}
	// 	return n;
	// }
	//同一个表名，直接刷新显示
var same=function(p,n){
	$.ajax({
		url:"/exec?prmtv="+p,
		type:'get',
		cache : false,
		beforeSend:function() {
			 $("body").showLoading();
    	},
		complete:function(data) {
			 $("body").hideLoading();
    	},
		success:function(data){
			var data=JSON.parse(data);
			var error=data.error;
			var ret=data.ret;
			if (ret===0) {
				tab[n].destroy();
				tab[n].clear();
				$("."+n).html("");
				dumpDataByajax(n);
			}
			if (ret===1){
				$("#errorSpace").val("");
				$("#errorSpace").val(error);
			}

		}
	});
	showTables();
};
var same_gt=function(p,n){
	$.ajax({
		url:"/exec?prmtv="+p,
		type:'get',
		cache : false,
		success:function(data){
			var data=JSON.parse(data);
			var error=data.error;
			var ret=data.ret;
			if (ret===0) {
				//dumpDataByajax(n);
			}
			if (ret===1){
				$("#errorSpace").val("");
				$("#errorSpace").val(error);
			}

		}
	});
	showTables();
};
//不同的表名，将新的表名显示在第一层
var different=function(p,n){
	$.ajax({
		url:"/exec?prmtv="+p,
		type:'get',
		cache : false,
		beforeSend:function() {
			 $("body").showLoading();
    	},
		complete:function(data) {
			 $("body").hideLoading();
    	},
		success:function(data){
			var data=JSON.parse(data);
			var error=data.error;
			var ret=data.ret;
			var treeObj;
			if (ret===0) {
				$("."+n).html("");
				createDialog(n);
				dumpDataByajax(n);
				showTables();
			}
			if (ret===1){
				$("#errorSpace").val("");
				$("#errorSpace").val(error);
			}
		}
	});
	showTables();
};
	//============新建空表========================
	$("body").on("click",".tool0",function(e){
		e.preventDefault();
		$("#newEmptyDf").modal("toggle");
		//可拖拽
        $("#newEmptyDf").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});

	});
	$("#newEmpty_ok").click(function(){
		var a=$("#table_nName").val();
		var newEmpty=a+" = "+"@udf df0@sys by udf0.new_empty_df";
		different(newEmpty,a);
	});
	//============克隆表 ========================
	$("body").on("click",".tool1",function(e){
		e.preventDefault();
		$("#cloneDf").modal("toggle");
		//可拖拽
        $("#cloneDf").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_clone=$(this).parents(".dialog01").attr("id");

	});
	$("#cloneDf_ok").click(function(){
		var a=$("#clone_table_nName").val();
		var clone_table = a+" = "+"@udf "+df_name_clone+" by udf0.clone_df";
		different(clone_table,a);
	});
	//============增加========================
	$("body").on("click",".tool2",function(e){
		e.preventDefault();
		$("#mtAdd").modal("toggle");
		//可拖拽
        $("#mtAdd").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_add=$(this).parents(".dialog01").attr("id");
        $("#tableChiosed_N").val("col1");

	});
	$("#Add_ok").click(function(){
		var a=$("#tableChiosed_N").val();
		if(a == ""){
			a="loc1";
		}
		var b=$("#Add_content").val();
		//将+替换成%2B
		var b1 = encodeURI(b).replace(/\+/g,'%2B');
		var pAdd=df_name_add+" = "+"add "+a+" by ("+b1+")";
		same(pAdd,df_name_add);
	});

	//============列操作·Filter========================
	$("body").on("click",".tool3",function(e){
		e.preventDefault();
		$("#mtFilter").modal("toggle");
		//可拖拽
        $("#mtFilter").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		 df_name_filter=$(this).parents(".dialog01").attr("id");
        $("#Filter_nName").val(df_name_filter);
	});

	$("#Filter_ok").click(function(){
		var new_name=$("#Filter_nName").val();
		var content=$("#Filter_content").val();
		var pFilter=new_name+" = "+"filter "+df_name_filter+" by ("+content+")";
		if (new_name!=df_name_filter) {
			different(pFilter,new_name);
		}else {
			same(pFilter,df_name_filter);
		}
	});
	//============列操作·Choose========================
	$("body").on("click",".tool4",function(e){  //获取列名
		e.preventDefault();
		$("#mtChoose").modal("toggle");
		//可拖拽
        $("#mtChoose").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		var colArrs=[];
		var Choose_cols=[];
		df_name_choose=$(this).parents(".dialog01").attr("id");
		$("#Choose_nName").val(df_name_choose);
		var colArrNodes=tab[df_name_choose].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$(colArrs).slice(1).each(function(){
            var Choose_col_op='<option value='+this+'>'+this+'</option> ';
            Choose_cols.push(Choose_col_op);
		})
		$('#multiselect_choose').multiselect({
            keepRenderingSort: true
        });
        $("#multiselect_choose").html(Choose_cols);
        $("#multiselect_choose_to").html("");

	});

	$("#Choose_ok").click(function(){
		var content_list=[];
		var child;
        $("#multiselect_choose_to option").each(function(){
            content_list.push($(this).val());
        });
		var new_name=$("#Choose_nName").val();
		var content=content_list;
		var pChoose=new_name+" = "+"loc "+df_name_choose+" by ("+content+")";
		if (new_name!=df_name_choose) {
			different(pChoose,new_name);
		}else {
			same(pChoose,df_name_choose);
		}
	});
	//============列操作·Order========================
	$("body").on("click",".tool5",function(e){
		e.preventDefault();
		$("#mtOrder").modal("toggle");
		//可拖拽
         $("#mtOrder").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_order = $(this).parents(".dialog01").attr("id");
		var colArrs=[];
		var Order_cols=[];
		var colArrNodes=tab[df_name_order].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$(colArrs).slice(1).each(function(){
            var Order_col='<option value='+this+'>'+this+'</option> ';
            Order_cols.push(Order_col);
		})
		$("#pri_key").html(Order_cols);

	});
	var i = 0;
	$("#add_condition").click(function(){
		i++;
		var colArrs=[];
		var Order_cols=[];
		var colArrNodes=tab[df_name_order].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$(colArrs).slice(1).each(function(){
            var Order_col='<option value='+this+'>'+this+'</option> ';
            Order_cols.push(Order_col);
		})
		$("#col_order tbody").append('<tr><td>次要关键字'+
						'<select id="ci_key"'+i+'>'+Order_cols+'</select></td>'+
						'<td><select id="ci_key_order"'+i+'>'+
							'<option value="asc" >升序</option>'+
							'<option value="desc">降序</option>'+
						'</select></td><td><button class="del_condition" type="button">删除条件</button></td></tr>');
	});

	$("body").on("click",".del_condition",function(){
		$(this).parents("tr").remove();
	});

	$("#Order_ok").click(function(){
		var Order_col_value=[];
		var Order_value = [];
		$("#col_order tbody").find("tr").each(function(){
			 var tdArr = $(this).children();
			  Order_col_value.push(tdArr.eq(0).find("select").val());
			  Order_value.push(tdArr.eq(1).find("select").val());
		})
		//验证是否有重复元素
		var hash = {};
		for(var i in Order_col_value) {
			if(hash[Order_col_value[i]]){
				alert("("+Order_col_value[i]+")多次进行排序，请删除重复的排序条件，然后重试。")
				return;
			}
			hash[Order_col_value[i]] = true;
		}
		var col_list=[];
		var child;
		var Order_col=Order_col_value;
		var content=Order_value;
		var pOrder;
		if (content=="") {
			pOrder=df_name_order+" = "+"order "+df_name_order+" by ("+Order_col+")";
		}if (content!="") {
			pOrder=df_name_order+" = "+"order "+df_name_order+" by ("+Order_col+") with ("+content+")";
		}
		 	same(pOrder,df_name_order);
	});
	//============列操作·Ditinct========================
	$("body").on("click",".tool6",function(e){
		e.preventDefault();
		$("#mtDistinct").modal("toggle");
		//可拖拽
        $("#mtDistinct").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_distinct=$(this).parents(".dialog01").attr("id");
        $("#Distinct_nName").val(df_name_distinct);
		var colArrs=[];
		var Distinct_cols=[];
		var colArrNodes=tab[df_name_distinct].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$(colArrs).slice(1).each(function(){
			var Distinct_col='<option value='+this+'>'+this+'</option> ';
			Distinct_cols.push(Distinct_col);
		})
		$('#multiselect_distinct').multiselect();
		$("#multiselect_distinct").html(Distinct_cols);
        $("#multiselect_distinct_to").html("");
	});
	//隐藏模态框时清除数据
	// $("#mtDistinct").on("hidden.bs.modal", function() {
 //    	$(this).removeData("bs.modal");
	// });
	$("#Distinct_ok").click(function(){
		var col_list=[];
		var child;
		 $("#multiselect_distinct_to option").each(function(){
            col_list.push($(this).val());
        });
		var new_name=$("#Distinct_nName").val();
		var content=col_list;
		var pDistinct=new_name+" = "+"distinct "+df_name_distinct+" by ("+content+")";
		if (new_name!=df_name_distinct) {
			different(pDistinct,new_name);
		}else {
			same(pDistinct,df_name_distinct);
		}
	});

	//============列操作·更改类型========================
	$("body").on("click",".tool7",function(e){
		//alert("...");
		e.preventDefault();

		df_name_alter=$(this).parents(".dialog01").attr("id");
		var types;
		//types = @udf log by udf0.df_types
		var pAlter="types = @udf "+df_name_alter+" by udf0.df_types";

		//different(pAlter);
		same(pAlter,df_name_alter);

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
//============列操作·Str========================
	$("body").on("click",".tool8",function(e){  //获取列名
		//alert("...");
		e.preventDefault();
		$("#mtStr").modal("toggle");
		//可拖拽
        $("#mtStr").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_str=$(this).parents(".dialog01").attr("id");
        $("#Str_nName").val(df_name_str);
		var colArrs=[];
		var Str_cols=[];
		var colArrNodes=tab[df_name_str].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$.each(colArrs, function(){
			if(this !='index'){
				var str_col='<option value='+this+'>'+this+'</option> ';
	            Str_cols.push(str_col);
	        }
	     })
		//console.info(colArrs);
		$("#Str_col").html(Str_cols);
	});

	$("#Str_ok").click(function(){

		var content_list=[];
		var child;
		var new_name=$("#Nloc_Name").val();
		var loc_name=$("#Str_col").find("option:selected").text();
		var bds=$("#Str_content").val();
		bds = bds.replace(/\+/g,'%2B');
		var pStr=df_name_str;
		if(isFuncation(bds)){
			pStr=df_name_str+"."+new_name+" = "+"str "+loc_name+" by ("+bds+")";
		}else{
			pStr=df_name_str+"."+new_name+" = "+"str "+loc_name+" by "+bds;
		}
		same(pStr,df_name_str);
	});

	//============单字段分组求和 ========================
	$("body").on("click",".tool9",function(e){
		e.preventDefault();
		$("#df_agg_count").modal("toggle");
		//可拖拽
        $("#df_agg_count").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_agg=$(this).parents(".dialog01").attr("id");
		 $("#agg_table_nName").val(df_name_agg);
		var colArrs=[];
		var field_cols=[];
		var colArrNodes=tab[df_name_agg].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$(colArrs).slice(1).each(function(){
            var agg_col='<option value='+this+'>'+this+'</option> ';
            field_cols.push(agg_col);
		})
		$("#field_key").html(field_cols);

	});
	$("#df_agg_count_ok").click(function(){
		var new_name=$("#agg_table_nName").val();
		var field_key=$("#field_key").find("option:selected").text();
		var df_agg_count_table = new_name+" = "+"@udf "+df_name_agg+" by udf0.df_agg_count with "+field_key;
		if (new_name!=df_name_agg) {
			different(df_agg_count_table,new_name);
		}else {
			same(df_agg_count_table,df_name_agg);
		}
	});
	//============行列互换========================
	$("body").on("click",".tool10",function(e){
		e.preventDefault();
		$("#df_T").modal("toggle");
		//可拖拽
        $("#df_T").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
        df_name_t=$(this).parents(".dialog01").attr("id");
         $("#df_T_nName").val(df_name_t);
	});
	$("#df_T_ok").click(function(){
		var new_name=$("#df_T_nName").val();
		var df_t = new_name+" = "+"@udf "+df_name_t+" by udf0.df_T";
		if (new_name!=df_name_t) {
			different(df_t,new_name);
		}else {
			same(df_t,df_name_t);
		}
	});
	//============填充空值 ========================
	$("body").on("click",".tool11",function(e){
		e.preventDefault();
		$("#df_fillna").modal("toggle");
		//可拖拽
        $("#df_fillna").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
        df_name_fillna=$(this).parents(".dialog01").attr("id");
        $("#df_fillna_nName").val(df_name_fillna);
         $("#df_fillna_value").val("0");
	});
	$("#df_fillna_ok").click(function(){
		var new_name = $("#df_fillna_nName").val();
		var value = $("#df_fillna_value").val();
		var df_fillna_t = new_name+" = "+"@udf "+df_name_fillna+" by udf0.df_fillna with "+value;
		if (new_name!=df_name_fillna) {
			different(df_fillna_t,new_name);
		}else {
			same(df_fillna_t,df_name_fillna);
		}
	});
	//============设置索引========================
	$("body").on("click",".tool12",function(e){
		e.preventDefault();
		$("#df_set_index").modal("toggle");
		//可拖拽
        $("#df_set_index").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
        df_name_setindex=$(this).parents(".dialog01").attr("id");
  		$("#df_set_index_nName").val(df_name_setindex);
		var colArrs=[];
		var field_cols=[];
		var colArrNodes=tab[df_name_setindex].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$(colArrs).slice(1).each(function(){
            var agg_col='<option value='+this+'>'+this+'</option> ';
            field_cols.push(agg_col);
		})
		$("#field_index").html(field_cols);
	});
	$("#df_set_index_ok").click(function(){
		var new_name = $("#df_set_index_nName").val();
		var field_index=$("#field_index").find("option:selected").text();
		var df_set_index = new_name+" = "+"@udf "+df_name_setindex+" by udf0.df_set_index with "+field_index;
		if (new_name!=df_name_setindex) {
			different(df_set_index,new_name);
		}else {
			same(df_set_index,df_name_setindex);
		}
	});
	//============重置索引========================
	$("body").on("click",".tool13",function(e){
		e.preventDefault();
        df_name_reset=$(this).parents(".dialog01").attr("id");
        //var a = $("#df_reset_index_nName").val();
		var df_reset_index_t = df_name_reset+" = "+"@udf "+df_name_reset+" by udf0.df_reset_index";

		same(df_reset_index_t,df_name_reset);
	});
	//============列操作·group========================

	$("body").on("click",".tool14",function(e){
		e.preventDefault();
		$("#mtGroup").modal("toggle");
		//可拖拽
        $("#mtGroup").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		$("#groupWay").val("所有字段统计");
		$("#group_table").hide();
		$("#group_table_single").hide();
		$(".Group_hName").show();
		df_name_group=$(this).parents(".dialog01").attr("id");
        $("#Group_nName").val(df_name_group);

		var colArrs=[];
		var group_cols=[];
		var Str_cols = [];
		var colArrNodes=tab[df_name_group].columns().header();
		$(colArrNodes).slice(1).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);//获取所有列名
		});

		//分组时获取列名
		$(colArrs).each(function(){
			var Group_col='<span style="margin:10px;border:solid 1px #999999;">'+this+'<input type="checkbox" style="margin-left:10px;"></span>';
			group_cols.push(Group_col);
		})
		//分组字段名
		$("#Group_col").html(group_cols);
		//多字段统计
		var trs=[];
		for (var i = 0; i < colArrs.length; i++) {
			//var tr='<tr><td><input type="checkbox"></td><td class="col">'+colArrs[i]+'</td><td><input type="text" class="groupTableTr form-control"></td></tr>';
			var tr='<tr><td><input type="checkbox"></td><td class="col">'+colArrs[i]+'</td><td><input type="text" class="groupTableTr form-control"></td></tr>';
			trs.push(tr);
		}
		$("#group_table tbody").html(trs);

		//单字段统计
		$.each(colArrs, function(){
			if(this !='index'){
				var str_col='<option value='+this+'>'+this+'</option> ';
	            Str_cols.push(str_col);
	        }
	     })
		$("#col_name").html(Str_cols);

	});

	$(".groupWay li a").on("click",function(){
		var type=$(this).text();
		$("#groupWay").val(type);
		if(type=="所有字段统计"){
			$("#group_table").hide();
			$("#group_table_single").hide();
			$(".Group_hName").show();
		} else if(type=="多字段统计"){
			$("#group_table").show();
			$("#group_table_single").hide();
			$(".Group_hName").hide();
		}else{
			$("#group_table").hide();
			$("#group_table_single").show();
			$(".Group_hName").hide();
		}
	});

	$("#Group_ok").click(function(){
		var type=$("#groupWay").val();
		var group_cols=[];
		$("#Group_col input:checked").each(function(){
			group_cols.push(($(this).parent().text()));
		});
		//gt名
		var gt="gt";
		//新表名
		var a=$("#Group_nName").val();
		if (type=="多字段统计") {
			var content_list=[];
			var oarrs=[];
			$("#group_table tbody tr").each(function(){
				var child=$(this).children().children();
				for (var i = 0; i < child.length; i++) {
					if(child[i].type="checkbox"){
						if (child[i].checked==true) {
							var col=$(this).find(".col").text();
							var hsName=$(this).find(".groupTableTr").val();
							content_list.push(col+":"+hsName);//字段名
						}
					}
				}
			});

			var pGroup_03,pFenzu_03;
			pFenzu_03=gt+" = "+"group "+df_name_group+" by ("+group_cols+")";
			same_gt(pFenzu_03,gt);
			pGroup_03=a+" = "+"agg "+gt+" by ("+content_list+")";
			different(pGroup_03,a);
		}

		if (type=="所有字段统计") {
			var b=$("#Group_hName").val();
			var pGroup_02,pFenzu_02;
			pFenzu_02=gt+" = group "+df_name_group+" by "+group_cols;
			same_gt(pFenzu_02,gt);
			pGroup_02=a+" = agg "+gt+" by ("+b+")";
			different(pGroup_02,a);
		}
		if (type=="单字段多函数统计") {
			var pGroup_03,pFenzu_03;
			var col_name=$("#col_name").find("option:selected").text();
			var agg_fun =$("#agg_fun").val();
			if(agg_fun != null && agg_fun!=""){
				var pox = agg_fun.indexOf(",");
				if(pox!=-1){
					pFenzu_03=gt+" = "+"group "+df_name_group+" by ("+group_cols+")";
					same_gt(pFenzu_03,gt);
					pGroup_03=a+" = "+"agg "+gt+"."+col_name+" by ("+agg_fun+")";
					different(pGroup_03,a);
				}else{
					pFenzu_03=gt+" = "+"group "+df_name_group+" by ("+group_cols+")";
					same_gt(pFenzu_03,gt);
					pGroup_03=a+" = "+"agg "+gt+" by ("+col_name+":"+agg_fun+")";
					pGroup_03 = encodeURI(pGroup_03).replace(/\:/g,'%3A');
					different(pGroup_03,a);
				}
			}
		}
	});
//============UDF函数========================
$("body").on("click",".tool15",function(e){

		e.preventDefault();
		$("#mtUdf").modal("toggle");
		 $( "#tabs" ).tabs();//加载tab

		//可拖拽
        $("#mtUdf").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_udf=$(this).parents(".dialog01").attr("id");
        $("#Udf_nName").val(df_name_udf);
	});

	$("#Udf_ok").click(function(){
		//reg_id_count = @udf log by udf0.df_agg_count with REG_ID
		var new_name = $("#Udf_nName").val();
		//var b=$("#udf_function").find("option:selected").text();
		//b=getFuncation(b);
		//var df_name=$("#ui-id-1").text();
		var c=$("#Udf_content").val();
		var d;
		var user_id=$( "#tabs").tabs().find(".ui-tabs-active").children("a").attr("name");
		d=user_id;
		var id="#"+user_id;
		var name = $(id).find(".btn-info").attr("name");
		b=name;
		var pUdf;

		// var another_df = $("#another_df_s").children('option:selected').val();//这就是selected的值

		//如果name=df_append。需要先判断是否空表，如果不是空表，再判断是否有关联表，如果有，则需要加上关联表

		var cc = "";
		if (c==""||c==null) {
			cc = "";
		}else{
			cc = " with ("+c+")";
		}

		var temp_table = "";
		if(b=="df_append"){

			var is_null_table = $("#is_null_table").children('option:selected').val();//这就是selected的值
			if(is_null_table=="true"){
				b="df_append";
				df_name_udf = "df0@sys";
			}else{
				var is_guanlian_table = $("#is_guanlian_table").children('option:selected').val();//这就是selected的值
				if(is_guanlian_table == "false"){
					b="df_append2";
					console.info("b="+b)
				}else{
					var another_df_udf0 = $("#another_df_udf0").children('option:selected').val();//这就是selected的值
					b="append_df";
					// console.info("bb="+b+"  another_df_udf0="+another_df_udf0)
					temp_table =","+another_df_udf0;
					// console.info("temp_table="+temp_table)
				}
			}


			// pUdf=new_name+" = "+"@udf "+df_name_udf+temp_table+" by "+d+"."+b+cc;
		}

		pUdf=new_name+" = "+"@udf "+df_name_udf+temp_table+" by "+d+"."+b+cc;



		// if (c==""||c==null) {

		// 	if(another_df=="" || another_df == null){
		// 		pUdf=new_name+" = "+"@udf "+df_name_udf+" by "+d+"."+b;
		// 	}else{
		// 		pUdf=new_name+" = "+"@udf "+df_name_udf+","+another_df+" by "+d+"."+b;
		// 	}

		// }else{
		// 	if(another_df=="" || another_df == null){
		// 		pUdf=new_name+" = "+"@udf "+df_name_udf+" by "+d+"."+b+" with ("+c+")";
		// 	}else{
		// 		pUdf=new_name+" = "+"@udf "+df_name_udf+","+another_df+" by "+d+"."+b+" with ("+c+")";
		// 	}

		// }

		console.info(pUdf)
		// if (new_name!=df_name_udf) {
		// 	different(pUdf,new_name);
		// }
		// else {
		// 	same(pUdf,df_name_udf);
		// }
	});



//机器学习
$("body").on("click",".tool16",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtMl").modal("toggle");
		$( "#ml_tabs" ).tabs();//加载tab

		//可拖拽
        $("#mtMl").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_udf=$(this).parents(".dialog01").attr("id");
        $("#ml_nName").val(df_name_udf);

    });


$("#ml_ok").click(function(){
		//reg_id_count = @udf log by udf0.df_agg_count with REG_ID
		var new_name = $("#ml_nName").val();
		//var b=$("#udf_function").find("option:selected").text();
		//b=getFuncation(b);
		//var df_name=$("#ui-id-1").text();
		var c=$("#ml_content").val();
		var d;
		var user_id=$( "#ml_tabs").tabs().find(".ui-tabs-active").children("a").attr("name");
		d="ML";
		var id="#"+user_id;
		console.info(id)
		var name = $(id).find(".btn-info").attr("name");
		b=name;
		console.info("name:"+name);
		if(name =='pca'){
			var pcas = $("#pcas").children('option:selected').val();//这就是selected的值
			if(pcas == "" || pcas == null){
				b = name;
			}else{
				b = pcas;
			}
		}else if(name=='ica'){
			var icas = $("#icas").children('option:selected').val();//这就是selected的值
			if(icas == "" || icas == null){
				b = name;
			}else{
				b = icas;
			}
		}else if(name=='svd'){
			var svds = $("#svds").children('option:selected').val();//这就是selected的值
			if(svds == "" || svds == null){
				b = name;
			}else{
				b = svds;
			}
		}else if(name=='load'){
			var svds = $("#loads").children('option:selected').val();//这就是selected的值
			if(svds == "" || svds == null){
				b = name;
			}else{
				b = svds;
			}
		}else if(name=='load_model'){
			var zipname = $("#listZip").children('option:selected').val();//这就是selected的值
			c = zipname;
		}else if(name =='train_load'){
			var loads = $("#loads").children('option:selected').val();//这就是selected的值
			b = loads;
		}

{

}		var pUdf;

		var another_df = $("#another_df_s").children('option:selected').val();//这就是selected的值


		if (c==""||c==null) {
			if(another_df=="" || another_df == null){
				pUdf=new_name+" = "+"@udf "+df_name_udf+" by "+d+"."+b;
			}else{
				pUdf=new_name+" = "+"@udf "+df_name_udf+","+another_df+" by "+d+"."+b;
			}

		}else{
			if(another_df=="" || another_df == null){
				pUdf=new_name+" = "+"@udf "+df_name_udf+" by "+d+"."+b+" with ("+c+")";
			}else{
				pUdf=new_name+" = "+"@udf "+df_name_udf+","+another_df+" by "+d+"."+b+" with ("+c+")";
			}

		}

		 console.info(pUdf)
		if (new_name!=df_name_udf) {
			different(pUdf,new_name);
		}
		else {
			same(pUdf,df_name_udf);
		}
	});



	//============列操作·lambda========================

	$("body").on("click",".tool17",function(e){
		//alert("...");
		e.preventDefault();
		$("#mtLambda").modal("toggle");
		//可拖拽
        $("#mtLambda").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_lambda=$(this).parents(".dialog01").attr("id");
        // $("#lambda_cName").val(df_name_lambda);
		var colArrs=[];
		var Str_cols=[];
		var colArrNodes=tab[df_name_lambda].columns().header();
		$(colArrNodes).each(function(){  //遍历th
			var colArr=$(this).html();
			colArrs.push(colArr);
		});
		$.each(colArrs, function(){
			if(this !='index'){
				var str_col='<option value='+this+'>'+this+'</option> ';
	            Str_cols.push(str_col);
            }
		});
		$("#lambda_col").html(Str_cols);
	});

	$("#lambda_ok").click(function(){
		var loc_name=$("#lambda_col").find("option:selected").text();
		var a=$("#lambda_cName").val();//新列名
		var b=$("#lambda_content").val();//表达式
		//将+替换成%2B
		var b1 = encodeURI(b).replace(/\+/g,'%2B');
		var pLambda=df_name_lambda+"."+a+" = lambda "+loc_name+" by ("+b1+")";
		same(pLambda,df_name_lambda);
	});

	// //============简要信息========================
	$("body").on("click",".tool18",function(e){
		df_name_info=$(this).parents(".dialog01").attr("id");
		var df_info_t = df_name_info+"_info"+" = "+"@udf "+df_name_info+" by udf0.df_info";
		different(df_info_t,df_name_info+"_info");
	});

	function showTypes(){
		$.ajax({
		type : 'get',
		url:'/exec?prmtv=dump%20types',
		cache : false,
		dataType : 'json',
		success:function(dataAll){
			var results=dataAll.result;
			var result=JSON.parse(results);
			var data=result.data;
			var myCol=result.columns;
			var myColArr = new Array();
			for(var i=0;i<myCol.length;i++){
				myColArr.push({"title":myCol[i]})
			}
			 typesDT=$('#col_type_change').DataTable({
		        "data": data,
		        "bAutoWidth":true,
				"bLengthChange" : true,
				ordering:false,
				"oLanguage" : Language,
				"destroy":true,
				columns : myColArr
		    });
			 var tr=typesDT.rows().nodes();
			var trText='<td ><input class="tdColNewType" type="text" placeholder="请输入新的类型名称" class="form-control"></td><td><button class="alterOkClick" >确定</button></td>';
			for (var i = 0; i < tr.length; i++) {
				$(tr[i]).append(trText);
			}
		}

	});

};



	//============列操作·udf========================
// 	var udf0_funcation = ["新建空表(new_empty_df)","增加行(df_append)","克隆表(clone_df)","单字段分组求和(df_agg_count)",
// 	"行列互换(df_T)","列类型(df_types)","简要信息(df_info)","简要统计(df_desc)","判断空值(df_isna)","填充空值(df_fillna)","设置索引(df_set_index)",
// 	"索引排序(df_sort_index)","删除列(df_drop_col)","删除数字列(df_drop_icol)","删除行(df_drop_row)","行范围(df_limit)","重置索引(df_reset_index)",
// 	"转矩阵(df_unstack)","数据归一化[最小-最大](df_min_max)","数据归一化[零均值](df_mean_std)","数据归一化[小数定标](df_10k)","时间范围(new_df_hourrange)",
// 	"日期序列(new_df_daterange)","整数分割(new_df_range)","左连接(left_join)","右连接(right_join)"
// 	];
// 	var ml_function = ["练习数据加载(load)","预测(ML.predict)","主成份分析(pca)","多维分析(mds)","k-最近邻分类(knn)","逻辑回归分类(lr)",
// 	"决策树分类(dt)","线性回归分类(lda)","非线性回归分类(qda)","向量机分类(svm)","朴素贝叶斯分类(gnb)","kmeans聚类(kmeans)",
// 	"均值漂移聚类(means)","层次聚类(ac)","传播聚类(ap)","密度聚类(dbscan)","综合层次聚类(brich)","谱聚类(sc)","二维可视化散点函数
// (tsne)","大群离散点检测(dpt)"];
//  	//得到()中的内容
//  	function getFuncation(str){
//  		return str.substring(str.indexOf("(")+1,str.length-1);
//  	}

 	function udfChange(){
 		var udf_id=$("#udf_id").val(); //获取Select选择的Value
		var udf0_funcation_cols = [];
		var ml_function_cols = [];
		if(udf_id=="udf0"){
			$.each(udf0_funcation, function(){

			   var udf0_funcation_col='<option value='+this+'>'+this+'</option> ';
            	udf0_funcation_cols.push(udf0_funcation_col);
			 });

			 $("#udf_function").html(udf0_funcation_cols);
		}else if(udf_id=="ML"){
			$.each(ml_function, function(){
            	var ml_function_col='<option value='+this+'>'+this+'</option> ';
            	ml_function_cols.push(ml_function_col);
			})
 			$("#udf_function").html(ml_function_cols);
		}
 	}


	//============列操作·plot========================
	$("body").on("click",".tool19",function(e){
		e.preventDefault();
		$("#mtPlot").modal("toggle");
		//可拖拽
        $("#mtPlot").draggable({
		    handle: ".modal-header",
		    cursor: 'move',
		    refreshPositions: false
		});
		df_name_plot=$(this).parents(".dialog01").attr("id");
		$("#cur_df").text(df_name_plot);
		nowWorkSpace_name = $("#nowWorkSpace").text()
		$("#work_space").text(nowWorkSpace_name);
		$("#plotIframe").attr("src", "");
		// 点击绘图后发一个请求，将df表存入到ssdb中，key=view_workspace_df  http://10.68.23.212:8999/jsonp/ssdb0/key
		//
		key_name = 'view_'+nowWorkSpace_name+"_"+df_name_plot
		$("#keyname").text(key_name);
		//alert(key_name +"   "+nowWorkSpace_name)
		//alert($("#keyname").text()+"|"+$("#work_space").text())
		var sore_key = "store "+df_name_plot+" to ssdb by ssdb0 with "+key_name;
		$.ajax({
			type:'get',
			async: true,
			url:'/exec?prmtv='+sore_key,
			success:function(data){
				var data=JSON.parse(data);
				var error=data.error;
				var ret=data.ret;
				if (ret===0) {


				}
				if (ret===1){
					$("#errorSpace").val("");
					$("#errorSpace").val(error);
				}
			}
		});
	});

//折线图
$("#mtPlot #zhexian").click(function(){
	var item="01";//代码
	plot(item);
});
//柱状图
$("#mtPlot #zhuzhuang").click(function(){
	var item="02";//代码
	plot(item);
});
//散点图
$("#mtPlot #sandian").click(function(){
	var item="03";//代码
	plot(item);
});
//饼图
$("#mtPlot #bingtu").click(function(){
	var item="04";//代码
	plot(item);
});
//堆积图
$("#mtPlot #duiji").click(function(){
	var item="05";//代码
	plot(item);
});
//面积图
$("#mtPlot #mianji").click(function(){
	var item="20";//代码
	plot(item);
});
//排名表
$("#mtPlot #paiming").click(function(){
	var item="07";//代码
	plot(item);
});
//信息块
$("#mtPlot #xinxi").click(function(){
	var item="08";//代码
	plot(item);
});
//文本信息
$("#mtPlot #wenben").click(function(){
	var item="18";//代码
	plot(item);
});
//分页表格
$("#mtPlot #fenyebiaoge").click(function(){
	var item="25";//代码
	plot(item);
});

$(".graph li a").on("click",function(){
	var name=$(this).attr("name");
	var item = "01"
	//跑马灯
	if(name=="paoma"){
		item = "06"
	}
	//地图散点图
	if(name=="ditusandian"){
		item = "09"
	}
	//地图热力图
	if (name=="ditureli"){
		item="10";//代码
	}
	//热力图
	if (name=="reli"){
		item="11";//代码
	}
	//南丁格尔玫瑰图
	if (name=="meigui"){
		item="12";//代码
	}
	//迁徙图
	if (name=="qianxi"){
		item="13";//代码
	}
	//圆形关系图
	if (name=="roundrelation"){
		item="14";//代码
	}
	//力导向图
	if (name=="lidaoxiang"){
		item="15";//代码
	}
	//自定义关系图
	if (name=="customrelation"){
		item="16";//代码
	}
	//桑基图
	if (name=="sangji"){
		item="17";//代码
	}
	//柱线图
	if (name=="zhuxian"){
		item="19";//代码
	}
	//横向柱状图
	if (name=="hengxiangzhuzhuang"){
		item="21";//代码
	}
	//地图热力散点图
	if (name=="dituerlisandian"){
		item="22";//代码
	}
	//内外环
	if (name=="neiwaihuan"){
		item="23";//代码
	}
	//仪表盘
	if (name=="yibiaopan"){
		item="24";//代码
	}
	//横向堆积图
	if (name=="hengxiangduiji"){
		item="26";//代码
	}
	//面积堆积图
	if (name=="mianjiduiji"){
		item="27";//代码
	}
	//横向排名图
	if (name=="hengxiangpaiming"){
		item="28";//代码
	}
	//人物画像
	if (name=="renwuhuaxiang"){
		item="29";//代码
	}

	plot(item);
});


	var plot = function(item){
		var work_space=$("#work_space").text();//工作区
		var cur_df=$("#cur_df").text();//df表
		var keyname = $("#keyname").text();//keyname
		$.ajax({
			type:'get',
			async: true,
			url:'/db/define/main_eng',
			success:function(data){
				var dataV = data.split(":");
				//var frameSrc="http://"+data+"/plot?cur_df="+cur_df+"&width=800&height=450&title="+df_name_plot+""+"&item="+item+"&work_space="+work_space;
				// console.log(document.location);
				var hostName = document.location.hostname;
				// var frameSrc="http://"+dataV[0]+"/plot/"+item+".js?key="+keyname+"&width=800&height=450&title="+df_name_plot;
				var frameSrc="http://"+hostName+"/plot/"+item+".js?ckey="+keyname+"&width=800&height=450&titles="+df_name_plot;
				$("#plotIframe").attr("src", frameSrc);

				div=$('<div id="div1" style="width:100%;height:500px;position:absolute;top:0px;left:0px;"></div>');
				$("#plotIframe").html(div);
				myChart=echarts.init(document.getElementById('div1'),'shine');
				ckey = keyname;
				height = '500px';
				width = '100%';
				titles = df_name_plot;
				x = 0;
				y = 0
				$.getScript('../plot/'+item+'.js',function(data, textStatus, jqxhr){
					// 'draw'+item+(myChart,ckey,height,titles,x,y,width,div);
					try{
						eval("draw"+item+"(myChart,ckey,height,titles,x,y,width,div);")
					}catch(err){
						console.error(err);
					}
				});


			}
		});
}

$('#closes').on('click',function(){
	$("#plotIframe").html("");
});

//function(ec,theme){
//		//var ecConfig = require('echarts/config');
//		mychart=ec.init(document.getElementById("main"),theme);
//
//	    getData();
//		//mychart.setOption(option);
//	});

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
