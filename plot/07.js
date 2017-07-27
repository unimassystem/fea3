
function draw07(myChart,ckey,height,titles,x,y,width,div){
	var timeDatas = new Date().getTime();
	// console.log(timeDatas);
	//---------构建dom-------
	var _table=$(
			'<div  id="table'+timeDatas+'" class="container-fluid table-responsive" style="height:100%;overflow:hidden;">'+
				'<div class="rank_title'+timeDatas+'rank_title" style="font-size:16px;text-align:center;line-height:32px;"></div>'+
				'<table id="rank_table'+timeDatas+'" class="table table-striped table-responsive" cellspacing="0"  height="100%"></table>'+
			'</div>'
		);

	var language={
		"lengthMenu" : "显示 _MENU_ 项结果",
		"info" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		"infoEmpty" : "显示第 0 至 0 项结果，共 0 项",
		"emptyTable" : "表中数据为空",
		"loadingRecords" : "载入中..."
	};
	var myColArrs=[],dataArr=[],colWidth=[],widthT;
	div.html(_table);
	widthT=parseInt(height)-70;
	//console.info(widthT);
	$(".rank_title"+timeDatas+"").text(titles);
	$("#table"+timeDatas+"").css("width",width);
	$.ajax({
	    type : 'get',
	    url:'/db/jsonp/ssdb0/'+ckey,
	    cache : false,
	    dataType : 'jsonp',
	    success:function(dataAll){			
			data=dataAll.data;	
			var inx=dataAll.index;	
			var myCol=dataAll.columns;//获取列名
			var myCol2=[];
			for (var i = 0; i < myCol.length; i++) {
				var a=myCol[i].toString();
				myCol2.push(a);
			}
					
			for(var i=0;i<myCol2.length;i++){
				myColArrs.push({"title":myCol2[i]})
			}			
			//判断是否有3.1415926
			if (inx[0]==-31415926) {
				for (var i = 1; i < data.length; i++) {
					dataArr.push(data[i]);
				}
				//console.info(inx[0],dataArr);
				for (var i = 0; i < data[0].length; i++) {
					var w={
						"width": data[0][i], 
						"targets": i
					};
					colWidth.push(w);
				}
				//console.info(colWidth);
			}else{
				for (var i = 0; i < data.length; i++) {
					dataArr.push(data[i]);
				}
			}
			insertDataToTable();
	    }                               
	});
	function insertDataToTable(){
		table=$("#rank_table"+timeDatas+"").DataTable({
			columns : myColArrs,
			columnDefs:colWidth,
			data:dataArr,
			language:language,
			ordering:false,
			info:false,
			paging:false,
			searching:false,
			scrollY:widthT
		});
	};	
}
	
	
	
/*	function two(lj) {
		window.parent.afun(lj);		
	}
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
	    window.parent.targetT(t,h,p);
	    return false;
	});
	$(".map-table").dblclick(function(){
        var pFrame =   parent.frameElement; 
       // console.info(pFrame);
        var pSrc=$(pFrame).attr('src');
        //alert(pSrc.indexOf('dashboard')>=0||pSrc.indexOf('dashboard2')>=0||pSrc.indexOf('more')>=0);
        if (pSrc.indexOf('dashboard')>=0||pSrc.indexOf('dashboard2')>=0||pSrc.indexOf('more')>=0) {
            return false;
            
        }else{
            history.go(-1);
        }                     
    });*/
