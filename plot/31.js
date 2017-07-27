function draw31(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    option = {
        // backgroundColor:e_back_color,
        color:["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee"],
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            formatter:function (param) {
                //console.info(param);
                return '开盘价：'+param[0].value[0]+'<br/>'+
                       '收盘价：'+param[0].value[1]+'<br/>'+
                       '最低价：'+param[0].value[2]+'<br/>'+
                       '最高价：'+param[0].value[3];
            }
        },
        legend: {
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,
             textStyle:e_legend_textstyle,
            data: ['日K']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data:'',
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisLabel:{textStyle:e_k_textstyle},
            axisTick:{show:false}
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: false,
                areaStyle:{opacity:0.4}
            },
            splitLine: {
                show: true,
                lineStyle:{
                    opacity:0.2
                }
            },
            axisLabel:{textStyle:e_k_textstyle},
            axisTick:{show:false}
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: '',
                itemStyle:{
                    normal:{
                        color:'#c00000',
                        color0:'#00b3ad',
                        borderColor:'#c00000',
                        borderColor0:'#00b3ad'
                    }
                }
            }
        ]
    };

    var str=[],tl=[];

    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            success:function(dataAll){
               var data=dataAll.data;
               var data0=splitData(data);
               //console.info(data0);
               option.series[0].data=data0.values;
               option.xAxis.data=data0.categoryData;
               myChart.setOption(option,true);
            }
        });
    }


    // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)




    function splitData(rawData) {
        //alert();
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        var o={
            categoryData: categoryData,
            values: values
        };
       // console.info(o);
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        //console.info(result);
        return result;
    }

    getData(myChart,ckey,div);
}
