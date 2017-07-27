/*构建htmldom*/
function draw322(myChart,ckey,height,titles,x,y,width,div,border,zindex,legends){
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
	//初始话轮廓背景
	var canvas = document.createElement('canvas');
				// echarts_ch='true';
				// console.log(echarts_ch);
				var mapChart = echarts.init(canvas, null, {
				    width: 2048,
				    height: 1024
				});
				mapChart.setOption({
				    backgroundColor: '#001e46',
				    visualMap: {
				        show: false,
				        min: 0,
				        max: 100000,
				        inRange: {
				            color: ['#396858', '#4575b4', '#74add1', '#d73027', '#d73027', '#d73027', '#fee090', '#fdae61', '#f46d43', '#d73027', '#396858']
				        }
				    },
				    series: [{
				        type: 'map',
				        map: 'world',
				        left: 0,
				        top: 0,
				        right: 0,
				        bottom: 0,
				        environment: '#000',
				        boundingCoords: [
				            [-180, 90],
				            [180, -90]
				        ],
				        selectedMode : 'single',
				        itemStyle: {
				            normal: {
				                borderWidth: 0.5,
				                borderColor: {
				                    type: 'linear',
				                    x: 0,
				                    y: 0,
				                    x2: 0,
				                    y2: 1,
				                    colorStops: [{
				                        offset: 0, color: '#007eff' // 0% 处的颜色
				                    }, {
				                        offset: 1, color: '#63fffd' // 100% 处的颜色
				                    }],
				                    globalCoord: false // 缺省为 false
				                    },
		                    areaColor: '#193f59'
				                }
				        },
				        data: []
				    }]
	});


	//构建动态3D地球
    var option={
          // backgroundColor: '#000',
          legend: {
          	show:legendss,
            selectedMode: 'multiple',
						orient:orients,
            top:tops,
            left:lefts,
            textStyle: {
                color: '#fff'
            },
        },
          globe: {
              globeRadius:48,
              baseTexture: mapChart,
              //baseTexture: '../images/logo/data-1491890179041-Hkj-elqpe.jpg',
              // heightTexture: '../images/logo/data-1491837999815-H1_44Qtal.jpg',

              shading: 'realistic',
				light: {
						main: {
							//全局光
								color:'#87fffb',
								shadow: false,
								intensity: 4
						},
						ambient: {
								color:'#fff',
								intensity: 2,
						},
						ambientCubemap: {
								//texture: '../images/logo/data-1491838644249-ry33I7YTe.hdr',
								diffuseIntensity: 10,
								specularIntensity:0.1,
						}
				},
				postEffect: {
						enable: true,
						/*bloom:{
							enable:true,
							bloomIntensity:0.2
						},*/
						/*SSAO: {
								enable: true,
								radius: 50
						}*/
				},
              viewControl: {
                  autoRotate: false,
                  //animation:true,
                  //animationDurationUpdate:5000,
                   // 定位到北京
				targetCoord: [116.46, 39.92]
              }
          }
      };
  option.globe.viewControl.autoRotate=false;
  getData(myChart,ckey);



  function getData(myChart,ckey){
      $.ajax({
          type : 'get',
          url:'/db/jsonp/ssdb0/'+ckey,
          cache : false,
          dataType : 'jsonp',
          //async : false,
          success:function (dataAll){
            // console.log(dataAll);
              var data=dataAll.data;
				var routesGroupByAirline = {};
				 data.forEach(function (route) {
						 var airlineName = route[6];
						 if (!routesGroupByAirline[airlineName]) {
								 routesGroupByAirline[airlineName] = [];
						 }
						 routesGroupByAirline[airlineName].push(route);
				 });

				 var data_typs=Object.keys(routesGroupByAirline);

				 var series = data_typs.map(function (airline) {
					//  var airlineName = airline;
					 var routes = routesGroupByAirline[airline];

					 if (!routes) {
							 return null;
					 }
					 return {
							 type: 'lines3D',
							 name: airline,
							 effect: {
									 show: true,
									 trailWidth: 4,
									 trailLength: 0.15,
									 trailOpacity: 1,
									 trailColor: 'rgb(50, 50, 150)'
							 },

							 lineStyle: {
									 width: 1,
									//  color: ['#a0ba4f','#94581a','#0dd3c2','#23649c','#0c5f65','#258458'],
									 opacity: 0.7
							 },
							 blendMode: 'lighter',
							 data: routes.map(function (item) {
									 return [[item[1],item[2]],[item[4],item[5]]]
							 })
					 };
			 })
				// option.series.name=name_l;
				// console.log(routesGroupByAirline);
			option.legend.data=Object.keys(routesGroupByAirline);
			option.series=series;
		//动画地球从小到大
		var i=1;
		var timeID =setInterval ( function(){
		option.globe.globeRadius=i;
		myChart.setOption(option,true);
		i++;
		if (i>48){
			//开始转
			option.globe.viewControl.autoRotate=true;
			myChart.setOption(option,true);
			clearInterval(timeID);
		}
		} , 100 );


          }
      });
    }
}
