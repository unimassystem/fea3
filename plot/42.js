function draw42(myChart,ckey,height,titles,xname,yname,width,div){
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function (dataAll){
            // console.log(dataAll);
            var data = dataAll.data; 
            var datashuzu = [];
            for(var i=0;i<data.length;i++){
                var zhi0 = data[i][0];
                var zhi1 = data[i][1];
                var zhi2 = data[i][2];  
                var zhi3 = data[i][3];              
            
                datashuzu.push({name: zhi0, value: [zhi1,zhi2,zhi3]});
            }
            // console.log(datashuzu);
            var option = {
                globe: {
                    show:true,
                    baseTexture: '../libs/echarts-gl-master/test/asset/data-1491890179041-Hkj-elqpe.jpg',
                    heightTexture: '../libs/echarts-gl-master/test/asset/data-1491889019097-rJQYikcpl.jpg',

                    displacementScale: 0.1,

                    shading: 'lambert',
                    
                    environment: '../libs/echarts-gl-master/test/asset/data-1491837999815-H1_44Qtal.jpg',
                    
                    light: {
                        ambient: {
                            intensity: 0.1
                        },
                        main: {
                            intensity: 1.5
                        }
                    },

                    layers: [{
                        type: 'blend',
                        blendTo: 'emission',
                        texture: '../libs/echarts-gl-master/test/asset/data-1491890291849-rJ2uee5ag.jpg'
                    }, {
                        type: 'overlay',
                        texture: '../libs/echarts-gl-master/test/asset/data-1491890092270-BJEhJg96l.png',
                        shading: 'lambert',
                        distance: 5
                    }]
                },
                // 
                visualMap: {
                    show:false,
                    min: 0,
                    max: 1000,
                    calculable: true,
                    realtime: false,
                    inRange: {
                        colorLightness: [0.05, 0.9]
                    },
                    outOfRange: {
                        colorAlpha: 0
                    }
                },
                series: [
                    // {
                    //     type: 'scatter3D',//散点图
                    //     coordinateSystem: 'globe',
                    //     silent: true,
                    //     symbolSize: 5,//标记的大小
                    //     blendMode: 'lighter',
                    //     distanceToGlobe:1,//距离地球表面的距离
                    //     distanceToGeo3D:1,//距离 geo3D 的距离
                    //     zlevel:99,
                    //     data: datashuzu
                    // }
                    {
                        type: 'bar3D',//柱状图
                        coordinateSystem: 'globe',
                        bevelSize: 0,//柱子的倒角尺寸
                        bevelSmoothness: 0,//柱子倒角的光滑/圆润度
                        minHeight:1,
                        maxHeight:30,
                        itemStyle:{
                            // color:'blue',
                            opacity: 0.5
                        },
                        // silent: true,
                        // symbolSize: 5,//标记的大小
                        // blendMode: 'lighter',
                        // distanceToGlobe:1,//距离地球表面的距离
                        // distanceToGeo3D:1,//距离 geo3D 的距离
                        zlevel:99,
                        data: datashuzu
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