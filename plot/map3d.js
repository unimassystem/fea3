
	/*try {
	    var canvas = document.createElement('canvas');
	    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	    if (!gl) {
	        throw e;
	    }
	} catch (e) {
	    // 浏览器不支持 WebGL
	} */
function drawmap3d(myChart,ckey,height,titles,xname,yname,width,div,time) {
    var x,y,data;
    require.config({
        paths:{
            'echarts-x':'static/libs/echartsX/build/dist',
            'echarts':'static/libs/echarts/build/dist'
        }
    });
    require([
        'echarts',
        'echarts-x',
        'echarts/chart/map',
        'echarts-x/chart/map3d'
        //alert('...')
    ],function(ec){
        //alert();
        var myChart = ec.init(document.getElementById(time));
        
        //myChart.showLoading();
        $.ajax({
      //  url: './air.json',
            type:'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            dataType : 'jsonp',
            async:false,
            success: function (res) {
                localStorage.res=JSON.stringify(res); 
            }
        });     
        var res=JSON.parse(localStorage.res);
        var markPointStyle = {
            normal: {
                color: 'red'
            }
        };
        //获取所有的始发和目标
        var start=res.data.map(function(item){
            return [item[1],item[2]];
        });
        var end=res.data.map(function(item){
            return [item[4],item[5]];
        });
        //去重
        var json={},allCity=[];
        for(var i = 0; i < start.length; i++) //遍历当前数组
        {
            if (!json[start[i]]) //如果hash表中没有当前项
            {
                json[start[i]] = true; //存入hash表
                allCity.push(start[i]); //把当前数组的当前项push到临时数组里面
            }
            if (!json[end[i]]) //如果hash表中没有当前项
            {
                json[end[i]] = true; //存入hash表
                allCity.push(end[i]); //把当前数组的当前项push到临时数组里面
            }
        }
        //console.info(allCity);
        var airports = allCity.map(function (item) {
            return {
                itemStyle: markPointStyle,
                geoCoord: item
            }
        });
        var opts = {
            title: {
                text: title,
               // subtext: 'Data from openflights.org',
                //sublink: 'http://openflights.org/data.html',
                x:'center',
                y:'top',
                textStyle: {
                    color: '#666'
                }
            },
            /*legend: {
                show: true,
                data: data.airlines.map(function (item) {
                    // Airline name
                    return item[0];
                }),
                selected: {},
                x: 'left',
                orient: 'vertical',
                textStyle: {
                    color: 'white'
                }
            },*/
            tooltip: {
                formatter: '{b}'
            },
            /*dataRange: {
                min: 0,
                max: max,
                text:['High','Low'],
                realtime: false,
                calculable : true,
                color: ['red','yellow','lightskyblue']
            },*/
            series: [{
                type: 'map3d',
                mapType: 'world',
                //background: 'static/img/asset/starfield.jpg',
                baseLayer: {
                    backgroundColor: '',
                    backgroundImage: 'static/img/asset/earth.jpg'
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: 'yellow',
                        areaStyle: {
                            color: 'rgba(0, 0, 0, 0)'
                        }
                    }
                },
                markPoint: {
                    effect: {
                        show:true,
                        shadowBlur: 0.2
                    },
                    large: true,
                    symbolSize: 10,
                    data: airports,
                    label: {
                        show: true,
                        position: 'outside',
                        textStyle: {
                            color: 'white'
                        }
                    }
                }
            }]
        };
        opts.series.push({
            type: 'map3d',
           // name: airlineName,
            markLine: {
                effect: {
                    show: true
                },
                data: res.data.map(function (item) {
                    return [{
                        geoCoord: [item[1],item[2]]
                    }, {
                        geoCoord: [item[4],item[5]]
                    }]
                }),                         
                itemStyle: {
                    normal: {
                        color:'blue',
                        //width: 100,
                        distance:10,
                        // 线的透明度
                        opacity: 1
                    }
                }
            }
        });
        myChart.setOption(opts);
       // myChart.hideLoading();
       /*setInterval(function(){
            opts.series[1].markLine.data=
            res.data.map(function (item) {
                    return [{
                        geoCoord: [item[1],item[2]]
                    }, {
                        geoCoord: [item[4],item[5]]
                    }]
            })
       },5000);*/
    });

}
    

	
	//alert('...');
	
      
