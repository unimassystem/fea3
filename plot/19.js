function draw19(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
        tooltip: {
            trigger: 'axis'
        },
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
            splitLine:{
                show:false
            },
            data:[],
            nameTextStyle:e_barline_textstyle,
            data: [],
            axisLine:{
                onZero:false
            },
            axisLabel:{
               textStyle:e_barline_textstyle
            }
        },
        yAxis: {
            type: 'value',
            name:yname,
            splitLine:{
                show:false
            },
            nameTextStyle:e_barline_textstyle,
            axisLabel:{
               textStyle:e_barline_textstyle
            },
            axisTick:{show:false}
        },
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
                // console.info(dataAll);
                var name=dataAll.columns;
                var data=dataAll.data;
                var val = [];
                var legend=[];
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
                    if (i!=cutLen-1) {
                        var o={
                            name:name[i],
                            type:'bar',
                            data:value,
                            markLine : {
                                data : e_markline_data
                            }

                        };
                    }else{
                       var o={
                            name:name[i],
                            type:'line',
                            lineStyle:{
                                normal:{
                                    color:'#ccc'
                                }
                            },
                            data:value,
                            markLine : {
                                data : e_markline_data
                            }

                        };
                    }

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
                    var p=$(this)[0]._dom;

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
};
