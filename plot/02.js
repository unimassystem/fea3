function draw02(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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

        color:e_angle_color,


        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip:{
            trigger:'axis'
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
            name:xname,
            nameTextStyle:e_bar_textstyle,
            type: 'category',
            splitLine:{
                show:false
            },
            data: [],
            axisLine:{
                onZero:false
            },
            axisLabel:{textStyle:e_bar_textstyle}
        },
        yAxis: {
          show:false,
            name:yname,
            nameTextStyle:e_bar_textstyle,
            splitLine:{
                show:false
            },
            type: 'value',
            axisLabel:{textStyle:e_bar_textstyle},
            axisTick:{show:false}
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: []
    };
    getData(myChart,ckey);
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
               // var dataAll=eval("(" + dataAll + ")");
              //  console.info(dataAll);
                var str=[],tl=[]
                var name=dataAll.columns;
                var data=dataAll.data;
                var index=dataAll.index;
                var val = [],legend=[],inx=[];
                for (var i = 0; i < index.length; i++) {
                   inx.push(index[i].toString());
                }
                var lenth=name.length;
                var cutLen;
                if (name.indexOf('target')==-1) {
                    cutLen=lenth;
                }else{
                    cutLen=lenth-3;
                }
                if(name.indexOf('width')!=-1){
                  cutLen=cutLen-2;
                }
                for(var i=0;i<cutLen;i++){
                    var value=[];
                    for(var j=0;j<data.length;j++){
                        var valueAll=data[j];
                        value.push(valueAll[i]);
                    }
                    var o={

                        name:name[i],
                        type:'bar',
                        data:value,
                        markLine : {
                            data : e_markline_data
                        },
                        // barWidth:e_barwidth,
                        itemStyle:{
                          normal:{
                            /*color:e_itemnormal_color[i]*/
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color:e_zzt_jb_0[i] // 0% 处的颜色
                                }, {
                                    offset: 1, color:e_zzt_jb_1[i] // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                          }
                        }
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
                option.series=str;
                option.legend.data=tl;
                option.xAxis.data=inx;
                myChart.setOption(option,true);
                myChart.on('click', function (params) {
                   //console.info(params);
                   var city_idx = params.dataIndex;
                   var city_name=params.name;
                   var p=$(this)[0]._dom;//div

                   var data=dataAll.data;
                   var idx=dataAll.index;
                   var culs=dataAll.columns;
                   //console.info(data);
                   var target=data[0][data[0].length-1];
                   for (var i = 0; i < data.length; i++) {
                       var len=data[i].length;
                       if(city_name==idx[i]){
                           //console.info(city_idx,data[i][0]);
                           var dbdK=data[i][len-3];
                           var cs=data[i][len-2];
                           if(culs.indexOf('width')!=-1){
                             var m1=culs.indexOf('width');
                             var m2=culs.indexOf('height');
                             var k=data[i][m1];
                             var g=data[i][m2];
                             targetC(p,target,dbdK,cs,k,g)
                           }else{
                             targetC(p,target,dbdK,cs);
                           }
                           return true;
                       }
                   }
                 });
            }
        });
    }
};
