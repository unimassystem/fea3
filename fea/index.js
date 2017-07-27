$(document).ready(function () {
	var fwq=$("#fwq tbody");
	var dsdd=$("#dsdd tbody");
	//表格初始化
	var language = {
		"emptyTable" : "表中数据为空",
		"paginate" : {
			"first" : "首页",
			"previous" : "上页",
			"next" : "下页",
			"last" : "末页"
		}
	};
	var ds=$("#dsdd").DataTable({
		'searching':false,
		'language':language,
		'lengthChange': false,
		'ordering':true,
		'info':false,
		'destroy':true,
		"ajax": {
			'url':'/exec?prmtv=show timers',
			'cache':false,
			'dataSrc':function(data){
				var dsddDataArr=[];
				var result=data.result;
				result=JSON.parse(result);
				var ds=result.data;

				for (var i = 0; i < ds.length; i++) {
					dsddDataArr.push(ds[i]);
				}
				return dsddDataArr;
			}
	  	}
	  	 // this sets up jQuery to give me errors
	});
	//  setInterval( function () {
	//    ds.ajax.url('/exec?prmtv=show timers').load();
	// }, 60000 );
	var fwq=$("#fwq").DataTable({
		'searching':false,
		'language':language,
		'lengthChange': false,
		'ordering':true,
		'info':false,
		"ajax": {
			'url':'/db/jsonp/ssdb0/fea_stats',
			'dataType':'jsonp',
			'dataSrc':function(data){
				var engDataArr=[];
				var able=Math.round(data.able_mem);
				var all=Math.round(data.total_mem);
				var cores=data.cores;
				var engs=data.engs;
				$("#cores").text(cores+'个');
				$("#all").text(all+'G');
				$("#am").text(able+'G');
				for (var i = 0; i < engs.length; i++) {
					var tr;
					var eng=engs[i];
					for(var j in eng){
						var engData=[];
						eng=eng[j];
						engData.push(j,eng.cpu,eng.mem,eng.tasks,eng.create_time);
						engDataArr.push(engData);
					}
				}
				return engDataArr;
			}
	  	}
	  	 // this sets up jQuery to give me errors
	});
	setInterval( function () {
	    fwq.ajax.url('/db/jsonp/ssdb0/fea_stats').load();
	}, 60000 );

	/*function handleAjaxError( xhr, textStatus, error ) {

		alert('操作超时');
        window.parent.location.href='login.fh5';
       // window.close();
	    $('table').dataTable().fnProcessingIndicator( false );


	} */
	$.fn.dataTable.ext.errMode = 'none';

	$("#fwq")
	    .on( 'error.dt', function ( e, settings, techNote, message ) {
	        //console.log( 'An error has been reported by DataTables: ', message );
	        alert('操作超时！点击确定后重新登陆。');
	        window.parent.location.href='login.fh5';
	       // window.close();
		    $('table').dataTable().fnProcessingIndicator( false );
	    })
	    .DataTable();

	$("#dsdd")
		.on( 'error.dt', function ( e, settings, techNote, message ) {
		    //console.log( 'An error has been reported by DataTables: ', message );
		    alert('操作超时！点击确定后重新登陆。');
		    window.parent.location.href='login.fh5';
		   // window.close();
		    $('table').dataTable().fnProcessingIndicator( false );
		})
		.DataTable();
});
