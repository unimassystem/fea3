function draw51(myChart,ckey,height,titles,xname,yname,width,div){
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
            // var shuzhi = parseInt(data[0][2])/parseInt(data[0][4]);
            // console.log(shuzhi);
            var datazhi = [];
            for(var i = 0;i < dataindex.length;i++){
                var zhi1 = parseInt(data[i][2])/parseInt(data[i][4]);
                var zhi2 = parseInt(data[i][3])/parseInt(data[i][4]);
                var oo = [zhi1,zhi2];
                datazhi.push(oo);
            }
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
                    splitNumber:4,
                    center:["50%","50%"],
                    radius: '85%',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[datazhi[0][0], 'lime'],[datazhi[0][1], '#1e90ff'],[1, '#ff4500']],
                            width: 3,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            color: e_41_font_color,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length :10,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {           // 分隔线
                        length :20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width:3,
                            color: e_41_line_color,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {           // 分隔线
                        shadowColor : e_41_shadow_color, //默认透明
                        shadowBlur: 5
                    },
                    title : {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 20,
                            fontStyle: 'italic',
                            color: e_41_font_color,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail : {
                        // backgroundColor: 'rgba(30,144,255,0.8)',
                        // borderWidth: 1,
                        // borderColor: '#fff',
                        shadowColor : e_41_shadow_color, //默认透明
                        shadowBlur: 5,
                        offsetCenter: [0, '70%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            color: e_41_font_color
                        }
                    },
                    data:[{value:data[0][0], name: data[0][1]}]
                },
                {
                    name:dataindex[1],
                    type:'gauge',
                    center : ['20%', '60%'],    // 默认全局居中
                    radius : '60%',
                    min:0,
                    max:data[1][4],
                    endAngle:45,
                    splitNumber:2,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[datazhi[1][0], 'lime'],[datazhi[1][1], '#1e90ff'],[1, '#ff4500']],
                            width: 2,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            // fontWeight: 'bolder',
                            fontSize:6,
                            color: e_41_font_color,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length :8,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {           // 分隔线
                        length :15,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width:3,
                            color: e_41_line_color,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width:5,
                        shadowColor : e_41_shadow_color, //默认透明
                        shadowBlur: 5
                    },
                    title : {
                        offsetCenter: [0, '-30%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontStyle: 'italic',
                            color: e_41_font_color,
                            shadowColor : e_41_shadow_color, //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail : {
                        //backgroundColor: 'rgba(30,144,255,0.8)',
                       // borderWidth: 1,
                        borderColor: '#fff',
                        shadowColor : e_41_shadow_color, //默认透明
                        shadowBlur: 5,
                        width: 80,
                        height:30,
                        offsetCenter: ['5%', '65%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize:16,
                            color: e_41_font_color
                        }
                    },
                    data:[{value:data[1][0], name:data[1][1]}]
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
