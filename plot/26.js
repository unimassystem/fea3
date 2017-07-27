function draw26(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    option={
        // backgroundColor:e_back_color,
        //color:e_26angle_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip:{
            trigger:'axis',
        },
        animation: false,
        legend: {
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,
             textStyle:e_legend_textstyle
        },
        xAxis: {
            type: 'value',
            name:xname,
            splitLine:{
                show:false
            },
            nameTextStyle:e_rowbarstack_textstyle,
            axisLabel:{
               textStyle:e_rowbarstack_textstyle
            }
        },
        yAxis: {
            type: 'category',
            axisLabel:{
               textStyle:e_rowbarstack_textstyle
            },
            splitLine:{
                show:false
            },
            name:yname,
            data:[],
            nameTextStyle:e_rowbarstack_textstyle,
            axisTick:{show:false},
            data:[]
        },
        // dataZoom: [{
        //     type: 'inside'
        // }],
        series: []
    };
    var str=[],tl=[],val = [],value=[],legend=[];

    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
                var name=dataAll.columns;
                var data=dataAll.data;
                for(var i=0;i<name.length;i++){
                    value=[];
                    for(var j=0;j<data.length;j++){
                        var valueAll=data[j];
                        value.push(valueAll[i]);
                    }
                    var o={
                        name:name[i],
                        type:'bar',
                        data:value,
                        stack: '总量',
                        markLine : {
                            data : e_markline_data
                        },
                         itemStyle:{
                                normal:{
                                    color: {
                                    type: 'linear',
                                    x: 1,
                                    y: 0,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color:e_26Gradient_0[i] // 0% 处的颜色
                                    }, {
                                        offset: 1, color:e_26Gradient_1[i] // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                    },
                                }
                        },
                    };
                    str.push(o);
                    tl.push(name[i]);
                }
                // if (name.length==1) {
                //     myChart.setOption({
                //         visualMap:{
                //             show:false,
                //             min:Math.min.apply(null, value),
                //             max:Math.max.apply(null, value),
                //             color:['rgb(36,100,159)','rgb(0,255,255)']
                //         }
                //     });
                // }
                option.legend.data=tl;
                option.yAxis.data=dataAll.index;
                option.series=str;
                myChart.setOption(option);

                myChart.on('click', function (params) {
                    //console.info(params);
                    var city_idx = params.dataIndex;
                    var city_name=params.name;
                    var p=$(this)[0]._dom;//div

                    var data=dataAll.data;
                    var idx=dataAll.index;
                    //console.info(data);
                    var target=data[0][data[0].length-1];
                    for (var i = 0; i < data.length; i++) {
                        var len=data[i].length;
                        if(city_name==idx[i]){
                            //console.info(city_idx,data[i][0]);
                            var dbdK=data[i][len-3];
                            var cs=data[i][len-2];
                            targetC(p,target,dbdK,cs);
                            return true;
                        }
                    }
                });
            },
            error:function(error){
                console.log(error);
            }
        });

    }

    getData(myChart,ckey,div);
}
