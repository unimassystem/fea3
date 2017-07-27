//使用xAxis上的值改颜色单柱形图
function draw34(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
               // var dataAll=eval("(" + dataAll + ")");
              //  console.log(dataAll);
                var str=[],tl=[]
                var name=dataAll.columns;
                var data=dataAll.data;
                // console.log(data);
                var index=dataAll.index;
                var val = [],legend=[],inx=[];
                for (var i = 0; i < index.length; i++) {
                   inx.push(index[i].toString());
                }
                var lenth=name.length;

                if (name[lenth-1].indexOf('target')==-1) {
                    var cutLen=lenth;
                }else{
                    var cutLen=lenth-3;
                }
                for(var i=0;i<cutLen;i++){
                    var value_s=[];
                    var value_ss = [];
                    for(var j=0;j<data.length;j++){
                      var valueAll=
                            {
                              value:data[j][0],
                              itemStyle:{
                                normal:{
                                  color:e_itemnormal_color[j]
                                }
                              }

                          };
                          value_s.push(valueAll);
                    }

                    var o={
                        name:name[i],
                        type:'bar',
                        data:value_s,
                        markLine : {
                            data : e_markline_data
                        },
                        itemStyle:{
                          normal:{
                             color:e_itemnormal_color[i]
                          }
                        }
                    };
                    str.push(o);
                    tl.push(name[i]);
                    //console.info(i);
                    //console.log(name);
                }
                // if (name.length==1) {
                //     myChart.setOption({
                //         visualMap:{
                //             show:false,
                //             min:Math.min.apply(null, value_s),
                //             max:Math.max.apply(null, value_s),
                //             color:['rgb(36,100,159)','rgb(0,255,255)']
                //         }
                //     });
                // }
                option.series=str;
                option.legend.data=tl;//
                option.xAxis.data=inx;
                myChart.setOption(option,true);
                myChart.on('click', function (params) {
                    // console.log(params);
                    // console.log(dataAll);
                    var p=$(this)[0]._dom;
                    var name_p=params.name;
                    var name_ps='@city='+name_p;
                    var data=dataAll.data;
                    var target=data[0][data[0].length-1];
                    for(var i=0;i<data.length;i++){
                      var len=data[i].length;
                      if(name_ps == data[i][len-2]){
                        var dbdK=data[i][len-3];
                        var cs=data[i][len-2];
                        targetC(p,target,dbdK,cs);
                          return true;
                      }
                    }
                });
            }
        });
    }
    getData(myChart,ckey);
};
