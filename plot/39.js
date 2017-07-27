//雷达图
function draw39(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
	if(legends == 'left'){
    var legendss=true;
    var orients='vertical';
    var lefts='left';
    var tops='top';
  }
  if(legends == 'right'){
    var legendss=true;
    var orients='vertical';
    var lefts='right';
    var tops='top';
  }
  if(legends == 'top'){
    var legendss=true;
    var orients='horizontal';
    var lefts='center';
    var tops='top';
  }
  if(legends == 'bottom'){
    var legendss=true;
    var orients='horizontal';
    var lefts='center';
    var tops='bottom';
  }
  if(legends == 'false'){
    var legendss=false;
		var orients='horizontal';
    var lefts='center';
    var tops='bottom';
  }
var str=[],tl=[];
	option={
		// backgroundColor:e_back_color,
		color:e_angle_color,
		title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
      },
			legend: {
				show:legendss,
				orient:orients,
				top:tops,
				left:lefts,
					 itemGap: 20,
           textStyle:e_legend_textstyle,
          data:[],
					selectedMode: 'single'
      },
			radar: {
	      	indicator: [],
	      shape: 'circle',
	      splitNumber: 5,
	      name: {
	          textStyle: {
	              color:e_radername_color
	          }
      	},
	      splitLine: {
	          lineStyle: {
	              color:e_splitline_color
	          }
	      },
	      splitArea: {
	          show: false
	      },
	      axisLine: {
	          lineStyle: {
	              color:e_axisline_color
	          }
	      }
    	},
	    series: []
	};

	var e_rader_indicator=[];
	function getData(myChart,ckey,div){
		$.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
							//console.log(dataAll);
                var name=dataAll.columns;
                var datas=dataAll.data;
								var indexs=dataAll.index;
                var legend=[];
                for(var i=0;i<name.length;i++){
                    var value=[];

                    // for(var j=0;j<datas.length;j++){
                    //     var valueAll=datas[j];
                    //     value.push(valueAll);
                    // }
										for(var j=0;j<datas.length;j++){
                        var valueAll={
													value:datas[j],
													itemStyle:{
														normal:{
															color:e_itemstylenormal_color[j]
														}
													}
												};
                        value.push(valueAll);
                    }
										//console.log(value);
										var indicators={
											name:name[i],
											max:100
										}
										e_rader_indicator.push(indicators)
										//console.log(indicators);


                    var o={
												//name:indexs
                        type:'radar',
                        data:value,
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        },
                        lineStyle:{
                          normal:{
                              width:1,
															opacity:0.5
                          }
                        }//,
												// itemStyle:{
												// 	normal:{
												// 		color:e_itemstylenormal_color
												// 	}
												// }
                    };
									//tl.push(indexs)
                }
                str.push(o);
								option.radar.indicator=e_rader_indicator;
                //option.legend.data=tl;
								//console.log(tl);
                option.series=str;
                myChart.setOption(option,true);
            },
            error:function(error){
                console.log(error);
            }
        });
	}
	getData(myChart,ckey,div);
}
