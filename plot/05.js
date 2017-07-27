function draw05(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
            nameTextStyle:e_barstack_textstyle,
            data: [],
            splitLine:{
                show:false
            },
            axisLine:{
                onZero:false
            },
            axisLabel:{textStyle:e_barstack_textstyle}
        },
        yAxis: {
            name:yname,
            splitLine:{
                show:false
            },
            nameTextStyle:e_barstack_textstyle,
            data:[],
            type: 'value',
            axisLabel:{textStyle:e_barstack_textstyle} ,
            axisTick:{show:false}
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: []
    };
    var x=[];
    var str=[];
    var tl=[];

    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
                var name=dataAll.columns;
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
                        type:'bar',
                        stack: '总量',
                        data:value,
                        markLine : {
                            data : e_markline_data
                        }
                    };
                    str.push(o);
                    tl.push(name[i]);
                };
                option.series=str;
                option.legend.data=tl;
                option.xAxis.data=inx;
                myChart.setOption(option,true);
            }
        });
    }
    getData(myChart,ckey);
}
