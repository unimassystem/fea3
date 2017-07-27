function draw11(myChart,ckey,height,titles,xname,yname,width,div) {
    option={
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'3%'
        },
        // backgroundColor:e_back_color,
        // tooltip: {
        //     position: 'top',
        //     formatter: ""
        // },
        animation: false,
        grid: {
            //height: '50%',
            left:'20%'
        },
        xAxis: {
            type: 'category',
            data: [],
            name:xname,
            nameTextStyle:e_hot_textstyle,
            axisLine:{
                onZero:false
            },
            axisLabel:{
               textStyle:e_hot_textstyle
            }
        },
        yAxis: {
            type: 'category',
            name:yname,
            data: [],
            nameTextStyle:e_hot_textstyle,
            interval:0,
            splitArea: {
                show: true,
                areaStyle:{opacity:0.2}
            },
            axisLabel:{
               textStyle:e_hot_textstyle
            }
        },
        visualMap: {
            show:false,
            color:e_hot_visul_color,
            calculable: true,
            textStyle:{color:'#f0f0f0'},
            orient: 'vertical',
            left: '90%',
            top: '15%'
        },
        series: [{
            //name: 'Punch Card',
            type: 'heatmap',
            data: [],
            label: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    var x,y,data;
    var dataArr=[], max=[];

    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
                var data=dataAll.data;
                for (var i = 0; i < data.length; i++) {
                    var every=data[i];
                    for (var j = 0; j < every.length; j++) {
                        dataArr.push(every[j]);
                    }
                }
                dataArr = dataArr.map(function (item) {
                    max.push(item[2]);
                    return [item[1], item[0], item[2] || '-'];
                });
                option.series[0].data=dataArr;
                option.xAxis.data=dataAll.index;
                option.yAxis.data=dataAll.columns;
                option.visualMap.min=Math.min.apply(null, max);
                option.visualMap.max=Math.max.apply(null, max);
                myChart.setOption(option,true);
            }
        });
    }
    getData(myChart,ckey,div);
}
