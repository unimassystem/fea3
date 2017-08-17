function draw43(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    var tops='bottom';
  }
  if(legends == 'top'){
    var legendss=true;
    var orients='horizontal';
    var lefts='right';
    var tops='top';
  }
  if(legends == 'bottom'){
    var legendss=true;
    var orients='horizontal';
    var lefts='left';
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
      tooltip: {
          trigger: 'item'
      },
      grid: {
          right:4,
          // top: 30,
          bottom: 18,
          width: '14%'
      },
      xAxis: {
          show:false,
          type: 'value',
          scale: true,
          position: 'top',
          boundaryGap: false,
          splitLine: {show: false},
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {margin: 2, textStyle: {color: '#aaa'}},
      },
      yAxis: {
          type: 'category',
          name: 'TOP 10',
          nameTextStyle:e_43_barnamestyle,
          nameGap: 16,
          axisLine: {show: false, lineStyle: {color: '#ddd'}},
          axisTick: {show: false, lineStyle: {color: '#ddd'}},
          axisLabel: {
            interval: 0, 
            textStyle:e_43_barlabelstyle
                      },
          data: []
      },
      visualMap: {
          show:legendss,
          min: 0,
          max: 1000,
          top:tops,
          left:lefts,
          color:e_mapscatter_visul_color,
          text: ['高','低'],
          textStyle: e_mapscatter_visul_textstyle,
          calculable: true
      },
      geo: {
          map:'',
          left:'left',
          label: {
              emphasis: {
                  show: false
              }
          },
          itemStyle: {
              normal: e_mapscatter_geo_itemnormal,
              emphasis:e_mapscatter_geo_itememphasis
          }
      },
      series: [
          {
              //name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'geo',
              data:[],
              symbolSize: 12,
              label: {
                  normal: {
                      show: false,
                      formatter: function (params) {
                          return params.name + ' : ' + params.value[2];
                      }
                  },
                  emphasis: {
                      show: false
                  }
              },
              itemStyle: {
                  normal:e_43portal1_1_dot,
                  emphasis: e_mapscatter_scatter_itememphasis
              }
          },
          {
              id: 'bar',
              zlevel: 2,
              type: 'bar',
              symbol: 'none',
              label:{
                normal:{
                  show:false,
                  formatter: function (params) {
                      return params.name + ' : ' + params.value[2];
                  }
                }
              },
              // barWidth:'24',
              // barGap:'5',
              itemStyle: {
                  normal: {

                      color: 'red'
                  }
              },
              data: []
          }
      ]
  };

	/////////////////////////////////////////////////////////////////

  var geoCoordMap={};
  // var convertData = function (data) {
  //     var res = [];
  //     for (var i = 0; i < data.length; i++) {
  //         var geoCoord = geoCoordMap[data[i].name];
  //         //console.info(geoCoord);
  //         if (geoCoord) {
  //             res.push({
  //                 name: data[i].name,
  //                 value: geoCoord.concat(data[i].value)
  //             });
  //            // console.info();
  //         }
  //     }
  //    // console.info(res);
  //     return res;
  // };
  var idArr=[],o={},oArr=[],area;
  function getData(myChart,ckey){
      $.ajax({
          type : 'get',
          url:'/db/jsonp/ssdb0/'+ckey,
          cache : false,
          dataType : 'jsonp',
          success:function(dataAll){
              area=dataAll.columns[0];
              var data=dataAll.data;
              var convertData = function (data) {
                  var res = [];
                  for (var i = 0; i < data.length; i++) {
                      var value=data[i][3];
                      var name=data[i][0];
                      var geoCoord = geoCoordMap[data[i].name];
                      // console.info(data);
                      if (geoCoord) {
                          res.push({
                              name: data[i].name,
                              value: geoCoord.concat(data[i].value)
                          });
                         // console.info();
                        //  console.log(value);
                      }
                  }
                 // console.info(res);
                  return res;
              };
              var datas=[];
              var valArr=[];
              var idbar=[],valbar=[];
              for (var i = 0; i < data.length; i++) {
                  //组合坐标
                  var every=data[i];
                  var xy=[];
                  xy.push(every[1],every[2]);
                  geoCoordMap[every[0]]=xy;
                  //值
                  var id=data[i][0];
                  var value=data[i][3];
                  o={
                      name:id,value:value
                  };
                  idArr.push(id);
                  oArr.push(o);
              }
              for (var i = 0; i < oArr.length; i++) {
                      var val=oArr[i].value;
                      valArr.push(val);
                  }
              for(var q=10;q>0;q--){
								datas.push(data[data.length-q])
							}
              var convertDatas = function (datas) {
                  var res = [];
                  for (var i = 0; i < datas.length; i++) {
                      var values=datas[i][3];
                      var name=datas[i][0];
                      var geoCoord = geoCoordMap[datas[i].name];
                      // console.info(data);
                      if (geoCoord) {
                          res.push({
                              name: data[i].name,
                              value: geoCoord.concat(datas[i].values)
                          });
                         // console.info();
                        //  console.log(value);
                      }
                  }
                 // console.info(res);
                  return res;
              };
							for (var i = 0; i < datas.length; i++) {
								var ni=datas[i][0];
								var va_bar=datas[i][3];

								var p_bar={
									name:ni,value:va_bar
								}
								idbar.push(ni);
								valbar.push(p_bar);

							}
         // console.info(oArr);
              option.series[0].data=convertData(oArr);
              option.series[1].data=valbar;
              option.yAxis.data=idbar;
              option.geo.map=area;
              option.visualMap.min=Math.min.apply(null, valArr);
              option.visualMap.max=Math.max.apply(null, valArr);
              myChart.setOption(option,true);
          }
      });
  }
    getData(myChart,ckey);
		// myChart.setOption(option,true);
}
