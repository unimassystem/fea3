function draw327(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
  var geoCoordMap_end={};
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
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip : {
            trigger: 'item',
            formatter:function(params){
              return params.data.name
            }
        },
           itemStyle: {
              normal:{
                areaColor:e_mapline_itemnormal,
                borderColor:e_mapline,
                shadowBlur:e_map_shadowwidth,
                shadowColor:e_map_shadowcolor,
                shadowOffsetX:e_map_shadowofsetx,
                shadowOffsetY:e_map_shadowofsety,

              },
              emphasis:{
                areaColor:e_mapline_itememphasis
              }
          },
        legend:{
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,

          // formatter:function(params){
          //   console.log(params);
          //   return params.data.name
          // }
        },
        // visualMap: {
        //     show:legendss,
        //     type:'piecewise',
        //     // type:'piecewise',
        //     min: 0,
        //     max: 120,
        //     left: '5%',
        //     color:e_maphotscatter_visulecolor,
        //     // color: ['lightskyblue','yellow', 'orangered'],
        //     top: 'bottom',
        //     text: ['高','低'],           // 文本，默认为数值文本
        //     // textStyle: e_maphotscatter_visuletextStyle,
        //     calculable: true
        // },
        geo: {
            map: 'china',
            //color:'#bcdef4',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
          /*  itemStyle: {
              normal:{
                areaColor:e_mapline_itemnormal,
                borderColor:e_mapline,
                shadowBlur:e_map_shadowwidth,
                shadowColor:e_map_shadowcolor,
                shadowOffsetX:e_map_shadowofsetx,
                shadowOffsetY:e_map_shadowofsety,

              },
              emphasis:{
                areaColor:e_mapline_itememphasis
              },

            }*/
        },
        series : [{
           /* itemStyle: {
              normal:{
                areaColor:e_mapline_itemnormal,
                borderColor:e_mapline,
                shadowBlur:e_map_shadowwidth,
                shadowColor:e_map_shadowcolor,
                shadowOffsetX:e_map_shadowofsetx,
                shadowOffsetY:e_map_shadowofsety,

              },
              emphasis:{
                areaColor:e_mapline_itememphasis
              }
          }*/
        }]
    };
    getData(myChart,ckey);
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            async:false,
            dataType : 'jsonp',
            success:function(dataAll){
              var area=dataAll.columns[0];
               var data=dataAll.data;
               var data_r=data;
               var valueArr=[];//热力大小
               var seriesF=[];//地图热力data
              var effectD=[];
              var routesGroupByAirline = {};
              function randomData() {
                      return Math.round(Math.random()*1000);
                  }
							 data.forEach(function (route) {
									 var airlineName = route[7];
									 if (!routesGroupByAirline[airlineName]) {
											 routesGroupByAirline[airlineName] = [];
									 }
									 routesGroupByAirline[airlineName].push(route);
							 });
							var data_typs=Object.keys(routesGroupByAirline);
              var series = data_typs.map(function (name) {
               //  var airlineName = airline;
                var routes = routesGroupByAirline[name];
                var effect_data=[];
                  var exid_sd = routes.map(function(item){
                    var xy=[];
                    xy.push(item[2],item[3],item[4]);
                    var a={
                            name:item[6],
                            value:xy,
                        };
                        return a;
                  })
                  // $.each(legendsss,function(name,value){
                  //   console.log(value);
                  //     var a={
                  //         name:name,
                  //         value:value,
                  //     };
                  //     effect_data.push(a);
                  // });

                return {
                    name: name,
                    type:'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 1,
                    effectType:'ripple',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    showEffectOn: 'render',
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            formatter: '{a}',
                            textStyle:{color:'#00f6ff'}
                        }
                    },
                    symbol:'circle',
                    symbolSize: function (val) {
                        var size=val[2]/8;
                        //console.info(size);
                        return size;
                    },
                    itemStyle : {
                        normal: {

                            // color:'red',
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid'
                                //shadowBlur: 10
                            },
                        }
                      },
                    data:exid_sd

                };
            })
               if(area.indexOf('市')!=-1){
                   $.ajaxSetup({
                       async : false
                   });
                  // console.info(area);
                   $.get('../plot/cityCompare.json',function(cityAll){
                   // console.info(cityAll);
                       var city=cityAll.city;
                       city=city[0];

                       $.each(city, function(chi, eng) {
                           if(chi==area){
                               areaEnd=eng;
                           }
                       });
                   });

                   $.get('../libs/echarts3/mapData/city/'+areaEnd+'.json', function (geoJson) {
                       echarts.registerMap(area, geoJson);
                   })
               }
               option.geo.map=dataAll.columns[0];
               option.legend.data=Object.keys(routesGroupByAirline);
              //  option.series[0].mapType=dataAll.columns[0];
              //  option.series[0].data=seriesF;
              //  option.visualMap.min=visMin;
              //  option.visualMap.max=visMax;
              //  option.series.data=effectD;
               option.series=series;
               myChart.setOption(option,true);
               myChart.on('click', function (params) {
                   var city_idx = params.dataIndex;
                   var city_name=params.name;
                   var p=$(this)[0]._dom;


                   var data=dataAll.data;
                   var idx=dataAll.index;
                   var columns1=dataAll.columns;
                   //console.info(data);
                   var target=data[0][data[0].length-1];
                   //console.info(target);
                   for (var i = 0; i < data.length; i++) {
                       //console.info(city_idx);
                       var len=data[i].length;
                       if(city_idx==idx[i]){
                           //console.info(city_idx,data[i][0]);
                           var dbdK=data[i][len-3];
                           var cs=data[i][len-2];
                           if(columns1[len-5] == 'width'){
                             var k=data[i][len-5];
                             var g=data[i][len-4];
                             targetC(p,target,dbdK,cs,k,g);
                           }else{
                             targetC(p,target,dbdK,cs);
                           }
                           //console.info(dbdK,cs);

                           return true;
                       }
                   }
               });
            }
        });
    };
}
