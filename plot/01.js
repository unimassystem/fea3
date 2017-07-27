function draw01(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
        color:e_lineglobal_color,//原来变量e_angle_color
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
            // x: 'center',
            // y: 35,
            textStyle:e_legend_textstyle,
            orient:orients,
            top:tops,
            left:lefts,
            data:[]
        },
        xAxis: {
            type: 'category',
            data: [],
            splitLine:{
                show:false
            },
            axisLine:{
                onZero:false
            },
            boundaryGap : false,
            axisLabel:{textStyle:e_bar_textstyle}
        },
        yAxis: {
            type: 'value',
            axisLabel:{textStyle:e_bar_textstyle},
            splitLine:{
                show:false
            },
            axisTick:{show:false}
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: []
    };
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        //async : false,
        success:function (dataAll){
            var str=[],tl=[];
            var name=dataAll.columns;
            //console.info(dataAll);
            var data=dataAll.data;
            var index=dataAll.index;
            var val = [],legend=[],inx=[];
            for (var i = 0; i < index.length; i++) {
               inx.push(index[i].toString());
            }
            var lenth=name.length;
            var cutLen;
            if (name[lenth-1].indexOf('target')==-1) {
                cutLen=lenth;
            }else{
                cutLen=lenth-3;
            }
            for(var i=0;i<cutLen;i++){
                var value=[];
                for(var j=0;j<data.length;j++){
                    var valueAll=data[j];
                    value.push(valueAll[i]);
                }
                var o={
                    name:name[i],
                    type:'line',
                    data:value,
                    itemStyle:{
                        normal:{
                            opacity:0
                        }
                    },
                    markLine : {
                        data : e_markline_data
                    }//,
                    // lineStyle:{
                    //     normal:{
                    //         color:e_line_linecolor[i]
                    //     }
                    // } //4.10新增线条样式

                };
                str.push(o);
                tl.push(name[i]);
            }
            option.series=str;
            option.legend.data=tl;
            option.xAxis.data=inx;
            myChart.setOption(option,true);
            //console.info(myChart);
            myChart.on('click', function (params) {
                console.info(params);
                console.log(myChart);
                var city_idx = params.dataIndex;
                var city_name=params.name;
                var p=$(this)[0]._dom;
                // var p=myChart;
                // console.log(p);

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
                        console.log(dbdK);
                        console.log(cs);
                        console.log(target);
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
};
