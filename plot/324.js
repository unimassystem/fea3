/*构建htmldom*/
function draw324(myChart,ckey,height,titles,x,y,width,div,border,zindex,legends){
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
              baseTexture: '../images/logo/data-news.jpg',
              // heightTexture: '../images/logo/data-1491837999815-H1_44Qtal.jpg',

              shading: 'color',

              light: {
                  ambient: {
                      intensity: 0.4
                  },
                  main: {
                      intensity: 0.4
                  }
              },

              viewControl: {
                  autoRotate: true
              }
          },
          // series:{
					// 		type: 'lines3D',
					// 		effect:{
					// 			show:true,
					// 			period:7
					// 		},
					// 		coordinateSystem: 'globe',
					// 		blendMode: 'lighter',
					// 		lineStyle: {
					// 				width: 1,
					// 				color: 'rgb(255, 3, 3)',
					// 				opacity: 0.9
					// 		},
					// 		data: []
					// }
      };
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
												 trailWidth: 2,
												 trailLength: 1,
												 trailOpacity: 1,
												 trailColor: 'rgb(50, 50, 150)'
										 },

										 lineStyle: {
												 width: 1,
												//  color: ['#a0ba4f','#94581a','#0dd3c2','#23649c','#0c5f65','#258458'],
												 opacity: 0
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
              myChart.setOption(option,true);
          }
      });
    }
}
