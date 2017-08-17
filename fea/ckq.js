$(document).ready(function (){
	$('.tag:eq(0)').hide();
	//$('#select1 > li:eq(0)').addClass("btn-success");
	//选项卡导航
    $('#select1 > li').click(function(){
    	var allLi = $('#select1 > li').removeClass("btn-primary");//将所有选项卡变为浅色，并让allLi表示为所有的选项卡；
    	$(this).addClass('btn-primary');
    	var index = allLi.index(this);//找出点击中的选项卡处于队列中的第几个；
    	//console.info(index);
    	$('.tag:visible').hide();//让其他的选项卡内容隐藏；
    	$('.tag:eq('+index+')').show();//显示被点中的选项卡内容；

    });

  //回车查询
	$("#select_id").keypress(function(e){
		if (e.which == 13){
		 $("#chaxun").click();
	   }

	 });




	function fy_dx(d){
		if(d == '' || d ==null){
			d=10
		}
		var theTable = document.getElementById("table2");
		var totalPage = document.getElementById("spanTotalPage");
		var pageNum = document.getElementById("spanPageNum");


		var spanPre = document.getElementById("spanPre");
		var spanNext = document.getElementById("spanNext");
		var spanFirst = document.getElementById("spanFirst");
		var spanLast = document.getElementById("spanLast");

		var numberRowsInTable = theTable.rows.length;
		var pageSize = d;
		var page = 1;
if(d){
	last();
	next();
	pre();
	first();
}
		//下一页
		function next() {

				hideTable();

				currentRow = pageSize * page;
				maxRow = currentRow + pageSize;
				if (maxRow > numberRowsInTable) maxRow = numberRowsInTable;
				for (var i = currentRow; i < maxRow; i++) {
					if(theTable.rows[i]){
						theTable.rows[i].style.display = '';
					}
				}
				page++;

				if (maxRow == numberRowsInTable) { nextText(); lastText(); }
				showPage();
				preLink();
				firstLink();
		}

		//上一页
		function pre() {

				hideTable();

				page--;

				currentRow = pageSize * page;
				maxRow = currentRow - pageSize;
				if (currentRow > numberRowsInTable) currentRow = numberRowsInTable;
				for (var i = maxRow; i < currentRow; i++) {
					if(theTable.rows[i]){
						theTable.rows[i].style.display = '';
					}
				}

				if (maxRow == 0) { preText(); firstText(); }
				showPage();
				nextLink();
				lastLink();
		}

		//第一页
		function first() {
				hideTable();
				page = 1;
				for (var i = 0; i < pageSize; i++) {
					if(theTable.rows[i]){
						theTable.rows[i].style.display = '';
					}
				}
				showPage();
				preText();
				nextLink();
				lastLink();
		}

		//最后一页
		function last() {
				hideTable();
				page = pageCount();
				currentRow = pageSize * (page - 1);
				for (var i = currentRow; i < numberRowsInTable; i++) {
					if(theTable.rows[i]){
						theTable.rows[i].style.display = '';
					}
				}
				showPage();
				preLink();
				nextText();
				firstLink();
		}

		function hideTable() {
				for (var i = 0; i < numberRowsInTable; i++) {
					if(theTable.rows[i]){
						theTable.rows[i].style.display = 'none';
					}
				}
		}

		function showPage() {
				pageNum.innerHTML = page;
		}

		//总共页数
		function pageCount() {
				var count = 0;
				if (numberRowsInTable % pageSize != 0) count = 1;
				return parseInt(numberRowsInTable / pageSize) + count;
		}

		//显示链接
		function preLink() { spanPre.innerHTML = "<a>上一页</a>"; }
		function preText() { spanPre.innerHTML = "上一页"; }

		function nextLink() { spanNext.innerHTML = '<a>下一页</a>'; }
		function nextText() { spanNext.innerHTML = "下一页"; }

		function firstLink() { spanFirst.innerHTML = '<a>第一页</a>'; }
		function firstText() { spanFirst.innerHTML = "第一页"; }

		function lastLink() { spanLast.innerHTML = '<a>最后一页</a>'; }
		function lastText() { spanLast.innerHTML = "最后一页"; }

		//隐藏表格
		function hide() {
				for (var i = pageSize; i < numberRowsInTable; i++) {
						theTable.rows[i].style.display = 'none';
				}

				totalPage.innerHTML = pageCount();
				pageNum.innerHTML = '1';

				nextLink();
				lastLink();
		}

		hide();
		$('body').on('click', '#spanNext a', function() {
			next();
		});
		$('body').on('click', '#spanFirst a', function() {
			first();
		});
		$('body').on('click', '#spanPre a', function() {
			pre();
		});
		$('body').on('click', '#spanLast a', function() {
			last();
		});
	}
// hide();
	$('body').on('click', '.dx_qx', function() {//点击取消
		$('.dx_bj_tc').remove();
	});

    //获取JSON
    $('#chaxun').click(function(){
    	$('#select1 > li').removeClass("btn-primary");
    	$('.tag:visible').hide();
    	// $.ajax({
    	// 	type : 'get',
    	// 	url:'/db/jsonp/ssdb0/'+$('#select_id').val(),
    	// 	cache : false,
    	// 	dataType : 'jsonp',
    	// 	success:function(data){
			// 		// console.log(JSON.stringify(data));
			// 		if(JSON.stringify(data) != '{}'){
			// 			$('.dx_bj').show();
			// 		}else{
			// 			$('.dx_bj').hide();
			// 		}
    	// 		if(data!=""){
    	// 		var options = {
    	// 			dom : '#JSON' //对应容器的css选择器
    	// 			};
    	// 		var jf = new JsonFormater(options); //创建对象
    	// 		jf.doFormat(data); //格式化json//当页面载入时，自动运行以下代码；
    	// 		if(data.columns){
    	// 			getData();
    	// 		}
			//
    	// 		$('.tag:eq(0)').show();
    	// 		$('#select1 > li:eq(0)').addClass("btn-primary")
    	// 		}
    	// 		else{
			// 			alert("数据不存在")
			// 		}
    	// 	}
     // 	});
		  var thead=$("#datatable thead");
	 		var tb=$("#datatable tbody");
	 		table(thead,tb);
			$('.tag:eq(0)').show();
			$('#select1 > li:eq(0)').addClass("btn-primary")
    });
    var datas;
    var data=[];
    var num=[];
    var name=[];
    var valuearr=[];
    var val=new Array();
    var k=new Array();
	require.config({
		paths : {
			echarts : '../libs/echarts3/dist',
			'defaultTheme' : '../libs/echarts3/theme'
		},
		packages : [ {
			name : 'BMap',
			location : '../libs/echarts3/extension/BMap/src',
			main : 'main'
		}]
	});

	require([ 'echarts',
	//'echarts/chart/macarons',
	'echarts/theme/infographic',
	'echarts/chart/line',
	'echarts/chart/bar',
	'echarts/chart/scatter',
	'echarts/chart/pie' ], function(ec,theme) {
	    oneoption = {
		    title : {
		        text: ''
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[]
		    },
		    toolbox:{
				show : true,
		        feature : {
		        	mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar','stack']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		          type : 'category',
		      	  name:'',
		      	  splitLine:{show:false},
		      	  axisLine:{show:true},
		            'axisLabel':{'interval':0}
		            //data : ['xit']

		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		            //name:'数量(万)'
		         }
		    ],
		    series : []
		};
		oneChart = ec.init(document.getElementById('bar'),theme);
		oneChart.setOption(oneoption);
		oneChart.showLoading({
				text : '数据获取中',
				effect : 'whirling'
			});

		threeoption={
				title:{
					text:''
					//x:'center'
				},
			    color:['rgb(193,35,43)','orange','green','blue','pink',
			           '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                     '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                     '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
	                     'orange','red','green','blue','pink'
	                       ],
			    tooltip:{
		        	   trigger:'axis',
		        	   axisPointer:{
		   	            show:true,
		   	            type:'cross',
		   	            lineStyle: {
		   	                type:'dashed',
		   	                width:1
		   	            }
		   	        },
		        	   formatter:function (params){
			        	   //console.log(params);
			        	   var x=params.value[0];
			        	   var y=params.value[1];
			        	   var result="";
			        	   for(var i=0;i<data.length;i++){
			        		   valuearr=data[i];
			        		   //var name=datas.columns;
			        		   if(x==valuearr[0]&&y==valuearr[1]){
			        			   result="index:"+num[i]+"</br>"+name[0]+":"+x+"</br>"+name[1]+":"+y;
			        			   return result;
			        		   }
			        	   }
		        	   }
		            },
				 xAxis : [
				          {
				        	  type : 'value',
				        	  name:'',
				        	  splitLine:{show:false},
				        	  axisLine:{show:true},
				        	  data:[]
				        	  //splitNumber:10
				        	  //boundaryGap:{show:false}
				          }
				      ],
				      yAxis : [
				               {
				                   type : 'value',
				                   name:'',
				                   axisLine:{show:false},
				                   splitLine:{show:true}
				               }
				           ],
				toolbox:{
					show : true,
		            feature : {
		            	mark : {show: true},
		            	dataZoom : {show: true},
		                dataView : {show: true, readOnly: false},
		                restore : {show: true},
		                saveAsImage:{show: true}
		            }
		        },
		        grid:{borderWidth:0},
				calculable:true,
				series : []
		};
		threeChart = ec.init(document.getElementById('scatter'),theme);
		threeChart.setOption(threeoption);
		threeChart.showLoading({
				text : '数据获取中',
				effect : 'whirling'
			});
		//getData();
		$('.tag:gt(0)').hide();//将所有的选项卡内容隐藏;
	});
	function getData(){
		$.ajax({
		     type :'get',
		     //url:'http://192.168.23.246:9000/jsonp/ssdb0/440306196908028800:months',
		     url:'/db/jsonp/ssdb0/'+$('#select_id').val(),
		     cache : false,
		     dataType : 'jsonp',
		     success:function(datas){
		    	oneChart.hideLoading();
		    	var x=[];
		    	var str=[];
		    	var tl=[];

				var val = [];
				var legend=[];
				if(datas.columns){
					var name=datas.columns;
					var data=datas.data//��ȡdata
					 x=datas.index;
					for(var i=0;i<name.length;i++){
						var value=[];
						for(var j=0;j<data.length;j++){
							var valueAll=data[j];
							value.push(valueAll[i]);
						};
						var o={
								name:name[i],
								type:'bar',
								data:value,
								markPoint : {
						                data : [
						                    {type : 'max', name: '最大值'},
						                    {type : 'min', name: '最小值'}
						                ]
						            },
					            markLine : {
					                data : [
					                    {type : 'average', name: '平均值'}
					                ]
					            }
							};
						str.push(o);
					}
				}else{
					$("#bar").html("");
				}

				oneoption.xAxis[0].data=x;
				oneoption.series=str;
				oneChart.setOption(oneoption,true);
				oneChart.refresh();
				oneChart.restore();
		     }
		});

		$.ajax({
			 type : 'get',
			 url:'/db/jsonp/ssdb0/'+$('#select_id').val(),
			cache : false,
			dataType : 'jsonp',
			success:function(datas){
				threeChart.hideLoading();
				name=datas.columns;
				data=datas.data;
				num=datas.index;
				var str=[];
				if (data) {
					for(var i=0;i<data.length;i++){
					var obj=data[i];//��ȡdata���ÿһ������
					str.push(obj[2]);//��ȡk������ֵ
					}
					var n = [];
					for(var i = 0; i < str.length; i++){
						if (n.indexOf(str[i]) == -1){
							n.push(str[i]);
						}
					}//ȥ��kֵ���
					var o1=[];
					for(var i=0;i<n.length;i++){
						var x=n[i];
						var ss=[];
					 for(var k=0;k<data.length;k++){
						 var dar=data[k];
						if(x==dar[2]){
							var xx=[];
							xx.push(dar[0]);
							xx.push(dar[1]);
							ss.push(xx);
						}
					 }
					 var o={
							name:x,
							type:'scatter',
						    data:ss,
						    markPoint : {
				                data : [
				                    {type : 'max', name: '最大值'},
				                    {type : 'min', name: '最小值'}
				                ]
				            },
					 };
					 o1.push(o);
					}
				}else{$("#scatter").html("");}
			    threeoption.series=o1;
			    threeoption.xAxis[0].name=name[0];
				threeoption.yAxis[0].name=name[1];
				threeChart.setOption(threeoption,true);
				threeChart.refresh();
				threeChart.restore();
			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	};
	var table= function(a,b){
			$.ajax({
				type :'get',
			     //url:'http://192.168.23.246:9000/jsonp/ssdb0/440306196908028800:months',
			     url:'/db/jsonp/ssdb0/'+$('#select_id').val(),
			     cache : false,
			     dataType : 'jsonp',
			     success:function(datas){
						 if(JSON.stringify(datas) != '{}'){
		 					$('.dx_bj').show();
		 				}else{
		 					$('.dx_bj').hide();
		 				}
			     	a.html("");
					b.html("");
			     	if($.isEmptyObject(datas)==false){
				     	var column=datas.columns;
				     	var data=datas.data;
				     	var index=datas.index;
				     	var th1='<th>index</th>';
				     	a.append(th1);
				     	for (var i = 0; i <column.length; i++) {
				     		var th='<th>'+column[i]+'</th>';
				     		a.append(th);
				     	}
				     	for (var i = 0; i <data.length; i++) {
				     		var numD=data[i];
				     		var tr=$('<tr></tr>');
				     		tr.append('<td>'+index[i]+'</td>');
				     		for (var j = 0; j < numD.length; j++) {
				     			var td='<td>'+numD[j]+'</td>';
				     			tr.append(td);
				     		}
				     		b.append(tr);
				     	}
			     	}

			     }
			});

	};
	$("#select1").children().last().click(function(){
		// var thead=$("#datatable thead");
		// var tb=$("#datatable tbody");
		// table(thead,tb);
		$.ajax({
			type : 'get',
			url:'/db/jsonp/ssdb0/'+$('#select_id').val(),
			cache : false,
			dataType : 'jsonp',
			success:function(data){
				// console.log(JSON.stringify(data));

				if(data!=""){
				var options = {
					dom : '#JSON' //对应容器的css选择器
					};
				var jf = new JsonFormater(options); //创建对象
				jf.doFormat(data); //格式化json//当页面载入时，自动运行以下代码；
				if(data.columns){
					getData();
				}
				}
				else{
					alert("数据不存在")
				}
			}
		});
	});
	//去掉表格里a标签的链接效果
	$("body").on("click","table a",function(e){
		//console.info("..");
	    if ( e && e.preventDefault ) {
	        e.preventDefault();
	        alert("查看器不支持超链接");
	    }
	    else{
	        window.event.returnValue = false;
	    }
	});

	//隐藏编辑对象的保存和取消按钮
	$('.dx_bj').hide();
	// $('.dx_bj_tc').hide();
	$(".dx_bj").click(function() {
		var w=$(window).width();
		var h=$(window).height();

		var div='<div class="dx_bj_tc" style="width:'+w+'px;height:'+h+'px;"><div class="dx_tc_title"><span>对象编辑</span><button type="button" name="button" class="dx_qx btn btn-info">取消</button><button type="button" name="button" class="dx_tj btn btn-success">保存</button><button type="button" name="button" class="dx_xz btn btn-primary">新增</button></div><div class="dx_tc_main"><table id="dx_table" class="display table table-bordered table-hover dataTable" cellspacing="0" width="100%"><thead></thead><tbody id="table2"></tbody></table><div class="fy_dx"><span id="spanFirst">第一页</span><span id="spanPre">上一页</span> <span id="spanNext">下一页</span> <span id="spanLast">最后一页</span> 第<span id="spanPageNum"></span>页/共<span id="spanTotalPage"></span>页</div></div></div>'
		$('body').append(div);
		$('.dx_bj_tc table thead').html('');
		$('.dx_bj_tc table tbody').html('');
		var m_h=h-$('.dx_tc_title').height();
		$('.dx_tc_main').css('height',m_h).css('top',h-m_h);
		var dx_ny='<div class="dropdown dx_bg_ny" style="float:right;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">10<span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="dropdownMenu1"><li><a href="#">10</a></li><li><a href="#">20</a></li><li><a href="#">30</a></li><li role="separator" class="divider"></li><li><a href="#">50</a></li></ul></div>';
		$('.dx_tc_main').append(dx_ny)
		$.ajax({
			type : 'get',
			url:'/db/jsonp/ssdb0/'+$('#select_id').val(),
			cache : false,
			dataType : 'jsonp',
			success:function(datas){
				// console.log(datas);
				if($.isEmptyObject(datas)==false){
					var column=datas.columns;
					var data=datas.data;
					var index=datas.index;
					var th1='<th>index</th>';
					var a=$(".dx_tc_main thead");
					var b=$(".dx_tc_main tbody");
					a.append(th1);
					for (var i = 0; i <column.length; i++) {
						var th='<th><input value="'+column[i]+'"></th>';
						a.append(th);
					}
					a.append('<th>操作</th>')
					for (var i = 0; i <data.length; i++) {
						var numD=data[i];
						var tr=$('<tr></tr>');
						tr.append('<td><input value="'+index[i]+'"></td>');
						for (var j = 0; j < numD.length; j++) {
							var td='<td><input value="'+numD[j]+'"></td>';
							tr.append(td);
						}
						tr.append('<td><button class="btn btn-warning glyphicon glyphicon-minus dx_sc"></button></td>')
						b.append(tr);

					}

						fy_dx();

				}
				// $('#dx_table').dataTable()

			},
			error:function(XMLHttpRequest,message){
				console.log(message)
			}
		});
	});
	//
	$('body').on('click', '.dx_xz', function() {//新增
		var td_length=$('#dx_table tbody tr').eq(0).children('td').length;
		// console.log(td_length);
		var tr=$('<tr></tr>');
		for (var i = 0; i < td_length-1; i++) {
			tr.append('<td><input name="'+i+'" value=""></td>')
		}
		tr.append('<td><button class="btn btn-warning glyphicon glyphicon-minus dx_sc"></button></td>')
		$('#dx_table tbody').prepend(tr)
		fy_dx();
	});
	$('body').on('click', '.dx_sc', function() {//删除
		$(this).parent().parent().remove();
		// pageCount();
		fy_dx();
	});
	$('body').on('click','.dx_tj',function(){//点击保存
		var a=$(".dx_tc_main thead");
		var b=$(".dx_tc_main tbody");
		var columns=[],data=[],index=[];
		var col=a.children('th').length-1;
		for (var i = 1; i < col; i++) {
				columns.push(a.children('th').eq(i).children('input').val());//列名
		}
		for (var i = 0; i < b.children('tr').length; i++) {
			var arr_td=[];
			var td_col=b.children('tr').eq(i).children('td').length-1;
			for (var j = 0; j < td_col; j++) {
				if(j == '0'){
					index.push(b.children('tr').eq(i).children('td').eq(0).children('input').val())//索引的所有值
				}else{
						arr_td.push(b.children('tr').eq(i).children('td').eq(j).children('input').val());
				}
			}
			data.push(arr_td);
		}
		if(index.indexOf('') != -1){
			alert('索引栏数据不能为空！')
		}else{
			var dataStr={columns,index,data};
			dataStr=JSON.stringify(dataStr);
			var key_bj=$('#select_id').val();
			$.ajax({
					type: "POST",
					async: true,
					dataType:"json",
					cache:false,
					url:'/db/put/ssdb0/'+key_bj,
					data:{value:dataStr},
					success: function(data) {
							// window.location.reload();
							// console.log('0:'+JSON.stringify(data));
					},
					error:function(error){
							// console.log(error);
							$("#chaxun").click();
							$('.dx_bj_tc').remove();

							// window.location.reload();
					}
			});
		}
	})
	$('body').on('click', '.dx_bg_ny li', function() {
		var n = $(this).text();
		$('#dropdownMenu1').text(n);
		fy_dx(n);
	});
});
