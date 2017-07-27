function draw20(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        color:e_areaglobal_color,
        tooltip:{
            trigger:'axis',
        },
        animation: false,
        legend: {
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,
            textStyle:e_legend_textstyle,
            data:[]
        },
        xAxis: {
            type: 'category',
            name:xname,
            data:[],
            nameTextStyle:e_area_textstyle,
            splitLine:{
                show:false
            },
            axisLine:{
                onZero:false
            },
            boundaryGap : false,
            axisLabel:{
               textStyle:e_area_textstyle
            }
        },
        yAxis: {
            type: 'value',
            name:yname,
            nameTextStyle:e_area_textstyle,
            splitLine:{
                show:false
            },
            axisLabel:{
               textStyle:e_area_textstyle
            },
            axisTick:{show:false}
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: []
    };
    var str=[];
    var tl=[];

    getData(myChart,ckey,div);
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
                var val = [];
                var legend=[];
                for(var i=0;i<name.length;i++){
                    var value=[];
                    for(var j=0;j<data.length;j++){
                        var valueAll=data[j];
                        value.push(valueAll[i]);
                    }
                    var o={
                        name:name[i],
                        type:'line',
                        smooth:e_line_smooth,
                        data:value,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color:e_areastyle_0color[i] //原来'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color:e_areastyle_1color[i] //'rgb(255, 70, 131)'
                                }])
                            }
                        },
                        lineStyle:{//新增面积图线条颜色
                          normal:{
                              color:e_arealine_color[i]
                          }
                        }
                    };
                    str.push(o);
                    tl.push(name[i]);
                }
                option.legend.data=tl;
                option.xAxis.data=dataAll.index;
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
}
