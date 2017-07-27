/* 文件名：lbsA.js
 * 功能: 实现lbs基于地理位置分析的主体功能
 * 作者： gjw
 * 日期： 20170720
 * 介绍： 使用百度地图API和百度echarts，以及两者的连接器bmap.js来实现，可以根据需求来加载
 * 任意的散点数据和路径数据。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
$(document).ready(function(){
    
    //所有请求为同步请求
    $.ajaxSetup({  
        async : false  
    });         
    
    /*----------------------------主题调用开始------------------*/
    //建立mychart对象
    var myChart = echarts.init(document.getElementById('main'));
    //地图上所有的数据集合
    var bmp_series = [];
    //获取中心坐标和缩放层级
    var cfg={"x":110,"y": 30,"z":5};
    
    try{
       init_base_cfg();
    }catch(err){
       cfg={"x":110,"y": 30,"z":5};
    }
    init();//
    try{
        init_scatter();
    }catch(err){
        console.error(err);
    }
    try{
        init_effectScatter();
    }catch(err){
        console.error(err);
    }
    try{
         init_line();
    }catch(err){
        console.error(err);
    }   
    
    /*------------------函数方法集合----------------------------*/
    //发送请求获取中心坐标和图层级别
    function init_base_cfg(){
        $.get("/db/json/ssdb0/LBS:base_cfg", function(data) {
            df = JSON.parse(data);
            if (df.columns.indexOf('x')!=-1 &&
                df.columns.indexOf('y')!=-1 &&
                df.columns.indexOf('z')!=-1){ 
                cfg.x = parseFloat(df.data[0][ df.columns.indexOf('x')]);
                cfg.y = parseFloat(df.data[0][ df.columns.indexOf('y')]);
                cfg.z = parseInt(df.data[0][ df.columns.indexOf('z')]);
            }
        });
    };
    
    //初始化地图图层
    function init(){
        option = {
            tooltip : {
                trigger: 'item'
            },
            //
            legend: {
                orient: 'horizontal',
                y: 'bottom',
                x:'right',
                data:['光点','光晕',"线路"],
                textStyle: {
                    color: '#fff'
                }
            },
            //百度地图
            bmap: {
            center: [cfg.x, cfg.y],
            zoom: cfg.z,
            roam: true,            
            mapStyle: {
                'styleJson': [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#031628'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#000102'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.stroke',
                    'stylers': {
                        'color': '#0b3d51'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'geometry.stroke',
                    'stylers': {
                        'color': '#08304b'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'geometry',
                    'stylers': {
                        'lightness': -70
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'all',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#857f7f'
                    }
                }, {
                    'featureType': 'all',
                    'elementType': 'labels.text.stroke',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#022338'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#062032'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#465b6c'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#022338'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }]
            }
        }
    };//end option
    
    myChart.setOption(option);
    };//end fun init()
    
    
    
    
    //初始化散点光晕数据
    function init_effectScatter(){
        var df={};
		
        //发送请求获取散点的发光的数据
		$.get("/db/json/ssdb0/LBS:effectScatter", function(data) {
            df = JSON.parse(data);
        });
		
        //构建散点数组
        var datas = df.data.map(function (item) {
            return { 
                name: item[df.columns.indexOf("城市")],
                value:[
                item[df.columns.indexOf("经度")],
                item[df.columns.indexOf("纬度")],
                item[df.columns.indexOf("值")]
                ]
            }
        });
        //构建配置
		var series={
            name: '光晕',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: datas,
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}: {c}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        };
        
        //开始绘图
        //console.info(series);
        bmp_series.push(series);
        myChart.setOption({series:bmp_series});
        
	};//end init_effectScatter
    
    
    //初始化散点数据
    function init_scatter(){
        var df={};
		
        //发送请求获取散点的数据
		$.get("/db/json/ssdb0/LBS:scatter", function(data) {
            df = JSON.parse(data);
        });
		
        //构建散点数组
        var datas = df.data.map(function (item) {
            return { 
                name: item[df.columns.indexOf("城市")],
                value:[
                item[df.columns.indexOf("经度")],
                item[df.columns.indexOf("纬度")],
                item[df.columns.indexOf("值")]
                ]
            }
        });
        //构建配置
		var series={
            name: '光点',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: datas,
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}: {c}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 0
        };
        
        //开始绘图
        //console.info(series);
        bmp_series.push(series);
        myChart.setOption({series:bmp_series});
        
	};//end init_scatter
    
    //初始化line
    function init_line(){
        var df={};
		
        //发送请求获取线路的数据
		$.get("/db/json/ssdb0/LBS:line", function(data) {
            df = JSON.parse(data);
        });
		
        //构建线路数组
        var datas = df.data.map(function (item) {
            return [
                item[df.columns.indexOf("经度")],
                item[df.columns.indexOf("纬度")],
                ]         
        });
        //构建配置
		var series={
            name: '线路',
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: [{ coords :datas}],
            effect: {
                     show: true,
                     trailWidth: 4,
                     trailLength: 0.15,
                     trailOpacity: 1,
                     //trailColor: 'rgb(50, 50, 150)'
             },

             lineStyle: {
                     width: 1,
                     color: ['#22ff05','#94581a','#0dd3c2','#23649c','#0c5f65','#258458'],
                     opacity: 0.7
             },
             blendMode: 'lighter',
        };

        
        //开始绘图
        //console.info(series);
        bmp_series.push(series);
        myChart.setOption({series:bmp_series});
        
	};//end init_scatter
    
    //监听键盘准备刷新
    function keyUp(e) {
       var currKey=0,e=e||event;
       currKey=e.keyCode||e.which||e.charCode;
       var keyName = String.fromCharCode(currKey);
       //alert("按键码: " + currKey + " 字符: " + keyName);
       if (keyName=="M"){
            window.location.reload();
        }
    }
   document.onkeyup = keyUp;
});//end 
