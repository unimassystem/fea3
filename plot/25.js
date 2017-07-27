var timeDatas = new Date().getTime();
var page_table='<div  id="table'+timeDatas+'" class="container-fluid table-responsive" style="overflow:hidden;">'+
						'<div class="rank_title'+timeDatas+' rank_title" style="font-size:16px;text-align:center;line-height:32px;"></div>'+
						'<table id="rank_table'+timeDatas+'" class="table table-striped table-responsive" cellspacing="0"  height="100%"></table>'+
					'</div>';

	var myColArrs=[],dataArr=[];

	var language={
		"info" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		"infoEmpty" : "显示第 0 至 0 项结果，共 0 项",
		"emptyTable" : "表中数据为空",
		"loadingRecords" : "载入中...",
		"paginate" : {
			"first" : "首页",
			"previous" : "上页",
			"next" : "下页",
			"last" : "末页"
		}
	};
function draw25(myChart,ckey,height,titles,x,y,width,div){

	// console.log(timeDatas);
	//-----构建dom----


	var stopDefault=function(e){
	    if ( e && e.preventDefault ) {
	        e.preventDefault();
	    }
	    else{
	        window.event.returnValue = false;
	    }
	};
	div.html(page_table);
	var widthT=parseInt(height)-132;
	//console.info(widthT);
	$(".rank_title"+timeDatas+"").text(titles);
	$("#table"+timeDatas+"").css({"width":width,"height":parseInt(height)+62});
	$.ajax({
	    type : 'get',
	    url:'/db/jsonp/ssdb0/'+ckey,
	    cache : false,
	    dataType : 'jsonp',
	    success:function(dataAll){
			data=dataAll.data;
			//var index=dataAll.index;
			var myCol=dataAll.columns;//获取列名
			var myCol2=[];
			for (var i = 0; i < myCol.length; i++) {
				var a=myCol[i].toString();
				myCol2.push(a);
			}
			for(var i=0;i<myCol2.length;i++){
				myColArrs.push({"title":myCol2[i]})
			}
			for (var i = 0; i < data.length; i++) {
				dataArr.push(data[i]);
			}
			insertDataToTable(widthT);
	    }
	});
	/*$("body").on("click","a",function(e){
	    stopDefault(e);
	    var t=$(this).attr("targett");
	    var h=$(this).attr("href");
	    var p=$(this)[0]._dom;//div
	    targetT(t,h,p);
	    return false;
	});*/
}

	//$("#data").css({"width":width,"height":height});


	function insertDataToTable(widthT){
		table=$("#rank_table"+timeDatas+"").DataTable({
			columns : myColArrs,
			data:dataArr,
			language:language,
			'lengthChange': false,
			ordering:false,
			info:true,
			paging:true,
			searching:false,
			scrollY:widthT
		});
	};
	/*function two(lj) {
		afun(lj);
	}*/
