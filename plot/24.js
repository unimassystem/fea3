function draw24(myChart,ckey,height,titles,xname,yname,width,div) {
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function (dataAll){
            var dataAll = dataAll;
            var dataindex = dataAll.index;
            var data = dataAll.data;
            // console.log(dataAll);
            var datazhi = [];
            var zhi1 = parseInt(data[0][2])/parseInt(data[0][4]);
            var zhi2 = parseInt(data[0][3])/parseInt(data[0][4]);
            var oo = [zhi1,zhi2];
            datazhi.push(oo);
            // console.log(datazhi);
            option = {
                // backgroundColor: '#1b1b1b',
                title:{
                    text:titles,
                    textStyle:e_title_textstyle,
                    left:'center',
                    top:'2%'
                },
                tooltip : {
                    formatter: "{a} <br/>{c} {b}"
                },
                // toolbox: {
                //     show : true,
                //     feature : {
                //         mark : {show: true},
                //         restore : {show: true},
                //         saveAsImage : {show: true}
                //     }
                // },
                series : [
                    {
                        name:dataindex[0],
                        type:'gauge',
                        min:0,
                        max:data[0][4],
                        splitNumber:5,
                        startAngle:150,
                        endAngle:30,
                        radius: '70%',
                        itemStyle: e_41_itemstyle,//指针样式
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[datazhi[0][0], '#7AEF69'],[datazhi[0][1], '#40A5D1'],[1, '#F7BC39']],
                                width: 3,
                                shadowColor : e_41_shadow_color, //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: e_gauge_axisLabel,  // 坐标轴小标记
                        axisTick: e_gauge_tick,
                        splitLine: e_gauge_splitLine,   // 分隔线
                        pointer: {           // 分隔线
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 5
                        },
                        title : e_gauge_title,
                        detail : e_gauge_detail,
                        data:[{value:data[0][0], name: data[0][1]}]
                    }
                ]
            }
            myChart.setOption(option);
        },
        error:function(error){
            console.log(error);
        }
    });
}
