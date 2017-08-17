function draw75(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
        color:e_angle_color,
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
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
          show:false,
            type: 'value',
            name:xname,
            data:[],
            nameTextStyle:e_rowbar_textstyle,
            splitLine:{
                show:false
            },
            axisLabel:{
               textStyle:e_rowbar_textstyle
            }
        },
        yAxis: {
            type: 'category',
            name:yname,
            nameTextStyle:e_rowbar_textstyle,
            splitLine:{
                show:false
            },
            axisLabel:{
               textStyle:{
                color:'#f8f5f1',
                fontSize:14
               }
            },
            axisTick:{show:false},
            data:[]
        },
        // dataZoom: [{
        //     type: 'inside'
        // }],
        series: []
    };
    var str=[],tl=[];

    getData(myChart,ckey,div);
    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
                // console.info(dataAll);
                var name=dataAll.columns;
                var data=dataAll.data;
                var inx=dataAll.index;
                var val = [],value=[];
                var legend=[];
                var len=name.length;

                if(name[name.length-5]=='width'){
                  var len=name.length-5;
                }else{
                  if(name[name.length-1]=='target'){
                    var len=name.length-3;
                  }
                }
                // if(name.indexOf('barcolor')!=-1){
                //   len=len-barColor
                // }
                len=len-2;//2017.8.4 ycj 自定义bar的粗细，颜色[位置在width前面]
                var lens=data[0].length;
                var colors=[];
                for(var i=0;i<len;i++){
                    value=[];
                    var barwidth='';
                    for(var j=0;j<data.length;j++){
                        var valueAll=data[j];
                        if(name[name.length-5]=='width'){
                           barwidth=data[j][lens-7]+'%';
                          var barcolor=data[j][lens-6];
                        }else{
                          if(name[name.length-1]=='target'){
                             barwidth=data[j][lens-5]+'%';
                            var barcolor=data[j][lens-4];
                          }else{
                             barwidth=data[j][lens-2]+'%';
                            var barcolor=data[j][lens-1];
                          }
                        }
                        colors.push(barcolor);
                        var od={
                          value:valueAll[i],
                          // itemStyle:{
                          //   normal:{
                          //     /*color:e_itemnormal_color[i]*/
                          //     color: barcolor
                          //   }
                          // }
                        }
                        value.push(od);
                    }
                    var o={
                        name:name[i],
                        type:'bar',
                        barWidth:barwidth,
                        data:value,
                        markLine : {
                            data : e_markline_data
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle:{
                                  color:'#f8f5f1',
                                  fontSize:14,
                                }
                            }
                        },
                    };
                    str.push(o);
                    tl.push(name[i]);
                }
                // console.log(dataAll.index);
                option.color=colors;
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
                   var columns1=dataAll.columns;
                   //console.info(data);
                   var target=data[0][data[0].length-1];
                   for (var i = 0; i < data.length; i++) {
                       var len=data[i].length;
                           var dbdK=data[i][len-3];
                           var cs=data[i][len-2];
                           if(columns1[len-5] == 'width'){
                             var k=data[i][len-5];
                             var g=data[i][len-4];
                             targetC(p,target,dbdK,cs,k,g);
                           }else{
                             targetC(p,target,dbdK,cs);
                           }
                           return true;
                   }
                 });
            }
        });
    }

}


    //console.info(dataAll);
