

function draw29(myChart,ckey,height,titles,x,y,width,div){
	var rwhx_box=$(
		'<div id="rwhx">'+
			'<p class="title1" style="padding-bottom: 20px;"></p>'+
			'<div class="dt_ct" style="margin-top:30px;">'+
			 	'<div class="useiconjz">'+
			 		'<div class="useiconjz-div">'+
			 			'<img src="../fea/img/rwhx/gifbg_anm.gif">'+
			 		'</div>'+
			 		'<img src="../fea/img/rwhx/gifbg_anm_outside.png">'+
			 	'</div>'+
			 	'<div class="dt_1_left list" data-id="1">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_1_left_bg gray">'+
				 		'<div class="dt_1_left_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
					'</div>'+
				'</div>'+
				'<div class="dt_2_left list" data-id="2">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_2_left_bg gray">'+
				 		'<div class="dt_2_left_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_3_left list" data-id="3">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_3_left_bg gray">'+
				 		'<div class="dt_3_left_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_4_left list" data-id="4">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_4_left_bg gray">'+
				 		'<div class="dt_4_left_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_5_left list" data-id="5">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_5_left_bg gray">'+
				 		'<div class="dt_5_left_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_6_right list" data-id="6">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_6_right_bg gray">'+
				 		'<div class="dt_6_right_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_7_right list" data-id="7">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_7_right_bg gray">'+
				 		'<div class="dt_7_right_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_8_right list" data-id="8">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_8_right_bg gray">'+
				 		'<div class="dt_8_right_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_9_right list" data-id="9">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_9_right_bg gray">'+
				 		'<div class="dt_9_right_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="dt_10_right list" data-id="10">'+
				 	'<dt class="jdtl"></dt>'+
				 	'<div class="dt_10_right_bg gray">'+
				 		'<div class="dt_10_right_data"></div>'+
				 		'<span class="dt_sp_l"></span>'+
				 	'</div>'+
				'</div>'+
				'<div class="xt1 xtlist" style="display: none;">'+
			 		'<span class="ts1"></span>'+
			 		'<div class="xt1-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt2 xtlist">'+
			 		'<span class="ts2"></span>'+
			 		'<div class="xt2-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt3 xtlist">'+
			 		'<span class="ts3"></span>'+
			 		'<div class="xt3-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt4 xtlist">'+
			 		'<span class="ts4"></span>'+
			 		'<div class="xt4-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt5 xtlist">'+
			 		'<span class="ts5"></span>'+
			 		'<div class="xt5-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt6 xtlist">'+
			 		'<span class="ts6"></span>'+
			 		'<div class="xt6-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt7 xtlist">'+
			 		'<span class="ts7"></span>'+
			 		'<div class="xt7-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt8 xtlist">'+
			 		'<span class="ts8"></span>'+
			 		'<div class="xt8-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt9 xtlist">'+
			 		'<span class="ts9"></span>'+
			 		'<div class="xt9-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			 	'<div class="xt10 xtlist">'+
			 		'<span class="ts10"></span>'+
			 		'<div class="xt10-txt">'+
			 			'<table class="xt_tb"></table>'+
			 		'</div>'+
			 	'</div>'+
			'</div>'+
		'</div>'
	);
	$(div).css('overflow','hidden');
	div.html(rwhx_box);
	div.find('#rwhx').css('width',width);
	div.find('#rwhx').css('height',height);
	div.find('.title1').text(titles);
	$.ajax({
	    type : 'get',
	    url:'/db/jsonp/ssdb0/'+ckey,
	    cache : false,
	    dataType : 'jsonp',
	    success:function(dataAll){	
	    	// console.log(dataAll);	
			data=dataAll.data;	
			for (var i = 0; i < data.length; i++) {
				var j=i+1;	
				if (j<=5) {
					div.find('.dt_'+j+'_left .jdtl').text(data[i][0]);
					div.find('.dt_'+j+'_left_data').addClass('color'+data[i][2]);
					div.find('.dt_'+j+'_left .dt_sp_l').text(data[i][1]);
				}else{
					div.find('.dt_'+j+'_right .jdtl').text(data[i][0]);
					div.find('.dt_'+j+'_right_data').addClass('color'+data[i][2]);
					div.find('.dt_'+j+'_right .dt_sp_l').text(data[i][1]);
				}			
			}
			if (data.length<10) {
				var len=10-data.length;
			};
			for (var i = 0; i < len; i++) {
				var j=i+data.length+1;
				if (j<=5) {
					div.find('.dt_'+j+'_left .jdtl').css('height','34px');
					div.find('.dt_'+j+'_left_data').addClass('color6');
					div.find('.dt_'+j+'_left .dt_sp_l').text('');
				}else{
					div.find('.dt_'+j+'_right .jdtl').css('height','34px');
					div.find('.dt_'+j+'_right_data').addClass('color6');
					div.find('.dt_'+j+'_right .dt_sp_l').text('');
				}
				
			}
		},
		error:function(){
			console.log(error);
		}                          
	});
	var getData=function(){
		var all=[];
		$.ajax({
			type : 'get',
		    url:'/db/jsonp/ssdb0/'+ckey+'_cnt',
		    cache : false,
		    dataType : 'jsonp',
		    success:function(dataAll){
		    	localStorage.dataAll=JSON.stringify(dataAll);
		    	var data=dataAll.data;
		    	var index=dataAll.index;
		    	var same=[];
		    	//--给index去重，并且存放index相同时候的下标
				var list = [],obj={};
			    var _res={};
			    $.each(index||[],function(k,v){
			     //_res[v]||(_res[v]={charAt:[k]});
			     	_res[v]?(_res[v].charAt.push(k)):_res[v]={charAt:[k]};
			    })
		    	localStorage.arr=JSON.stringify(_res);		    	
		    }
		});
		arr1=JSON.parse(localStorage.arr);
		return arr1; 
	};
	$(".list").mouseenter(function(dom){
		//鼠标触发的时候只显示对应的表格
		var childData=getData();
		//console.info(childData);
		var dataId=$(this).attr('data-id');
		$('.xtlist').css('display','none');
		
		getListData(childData,dataId);		
	});
	$('.title1').mouseenter(function(){
		$('.xtlist').css('display','none');
	});
	//对应的表格显示数据
	function getListData(listnum,id0){
		var t_list=JSON.parse(localStorage.dataAll);
		var t_list_data=t_list.data;
		id=id0-1;
		var table=$('<table class="xt_tb">');
		if(listnum[id]){
			var t_list_id=listnum[id].charAt;
			//console.info(t_list_id);
			var trAll=[];
			for (var j = 0; j < t_list_id.length; j++) {
				for (var i = 0; i < t_list_data.length; i++) {
					if(t_list_id[j]==i){
						//console.info(t_list_id[j],t_list_data[i]);
		 				var tr='<tr style="padding-left:20px;padding-top:12px;">'+
		 							'<td>'+t_list_data[i][0]+'</td>'+
		 							'<td>'+t_list_data[i][1]+'</td>'+
		 					   '</tr>';
		 				trAll.push(tr);
		 				
					}
				}
			}

			div.find('.xt_tb').html(trAll);
			div.find('.xt'+id0+'').fadeToggle();
		}				
	};
	$(".gray").click(function () {
		var dataId=$(this).parent().attr('data-id');
		//console.info(dataId);
		window.parent.dp(dataId);
	});



}



