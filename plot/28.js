//----------创建dom-------

	var pmt='<div class="trans_title" style="height:22px;"></div>'+
		'<div class="trans_table" style="overflow: hidden;">'+
			'<ul class="top10" style="padding-left: 0;"></ul>'+
		'</div>';
function draw28(myChart,ckey,height,titles,x,y,width,div){
	div.html(pmt);
	div.find(".trans_table").css("width",width-1);
    div.find(".trans_table p").css('width',parseInt(width-33));
    div.find(".trans_title").css('width',width);
    div.find(".trans_title").html(titles);
    div.find(".top10").css("width",width);
    $.ajax({
    	type : 'get',
	    url:'/db/jsonp/ssdb0/'+ckey,
	    async: false,
	    cache : false,
	    dataType : 'jsonp',
	    success:function(res){
	    	var data=res.data;
	    	// console.info(res);
				var columns=res.columns;
				var world_flag=res.columns[0];
	    	//localStorage.data=JSON.stringify(res);
	    	var index=res.index;
				if(world_flag=='world_flag'){
					for (var i = 0; i < data.length; i++) {
		    		//计算每一个色条的宽度，定义第一条为100%；
		    		var d=data[i][2]/data[0][2];
		    		d=(d.toFixed(2))*100;
		    		var n=i+1;
			    		var li='<li class="top10-li">'+
			    					'<span class="list list'+n+'">'+data[i][0]+'</span>'+
			    					'<div class="trans_list_bg">'+
			    						'<div class="list_data_bg list'+n+'" style="width:'+d+'%;">'+

			    							'<span class="num">'+data[i][2]+'</span>'+
			    						'</div>'+
			    						'<p class="trans_list_txt">'+
			    							'<span class="country">'+data[i][1]+'</span>'+

			    						'</p>'+
			    					'</div>'+
			    			   '</li>'
		    		div.find(".top10").append(li);
						$('.list'+n).css('overflow', 'hidden');
						$('.list'+n).children('img').css('width','100%').css('height', 'auto');
		    	};
				}else{
		    	for (var i = 0; i < data.length; i++) {
		    		//计算每一个色条的宽度，定义第一条为100%；
		    		var d=data[i][1]/data[0][1];
		    		d=(d.toFixed(2))*100;
		    		//console.info(d);
		    		var n=i+1;
						// console.log(data[0][4]);
						// console.log(data[0][5]);
						if(data[0][4] != undefined){
							if(columns[5] == 'width'){
								var li='<li class="top10-li">'+
				    					'<span class="list list'+n+'">'+n+'</span>'+
				    					'<div class="trans_list_bg">'+
				    						'<div class="list_data_bg list'+n+'" style="width:'+d+'%;">'+
				    							'<span class="num">'+data[i][1]+'</span>'+
				    						'</div>'+
				    						'<p class="trans_list_txt" datas="'+data[i][5]+'?'+data[i][6]+'" role="'+data[i][4]+'?'+data[i][2]+'?'+data[i][3]+'">'+
				    							'<span class="country">'+data[i][0]+'</span>'+

				    						'</p>'+
				    					'</div>'+
				    			   '</li>'
							}else{
								var li='<li class="top10-li">'+
				    					'<span class="list list'+n+'">'+n+'</span>'+
				    					'<div class="trans_list_bg">'+
				    						'<div class="list_data_bg list'+n+'" style="width:'+d+'%;">'+

				    							'<span class="num">'+data[i][1]+'</span>'+
				    						'</div>'+
				    						'<p class="trans_list_txt" role="'+data[i][4]+'?'+data[i][2]+'?'+data[i][3]+'" >'+
				    							'<span class="country">'+data[i][0]+'</span>'+

				    						'</p>'+
				    					'</div>'+
				    			   '</li>'
							}
							$('.trans_list_txt').click(function() {
								var p=myChart;
								var dataAll=$(this).attr('role');
								var data=dataAll.split("?");
								var target=data[0];
								var dbdK=data[1];
								var cs=data[2];
								if($(this).attr('datas') != null){
									var a=$(this).attr('datas');
									var b=a.split("?");
									var k=b[0];
								  var g=b[1];
								  targetC(p,target,dbdK,cs,k,g);
								}else{
									targetC(p,target,dbdK,cs);
								}
							});
						}else{
			    		var li='<li class="top10-li">'+
			    					'<span class="list list'+n+'">'+n+'</span>'+
			    					'<div class="trans_list_bg">'+
			    						'<div class="list_data_bg list'+n+'" style="width:'+d+'%;">'+

			    							'<span class="num">'+data[i][1]+'</span>'+
			    						'</div>'+
			    						'<p class="trans_list_txt">'+
			    							'<span class="country">'+data[i][0]+'</span>'+

			    						'</p>'+
			    					'</div>'+
			    			   '</li>'
						}
		    		div.find(".top10").append(li);
		    	};
				}
	    	div.find(".trans_list_bg").css('width',parseInt(width-33));
	    	div.find(".trans_list_txt").css('width',parseInt(width-33));
	    }
    });
}
// function mouseDown_tc28(tpk_tc){
// 	var p;
// 	var dataAll=$(tpk_tc).attr('role');
// 	var data=dataAll.split("?");
// 	var target=data[0];
// 	var dbdK=data[1];
// 	var cs=data[2];
// 	if($(tpk_tc).attr('datas') != null){
// 		var a=$(tpk_tc).attr('datas');
// 		var b=a.split("?");
// 		var k=b[0];
// 	  var g=b[1];
// 	  targetC(p,target,dbdK,cs,k,g);
// 	}else{
// 		targetC(p,target,dbdK,cs);
// 	}
// }
