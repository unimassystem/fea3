function draw09(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value;
            }
        },
        visualMap: {
            show:legendss,
            //type:'piecewise',
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
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: e_mapscatter_scatter_itememphasis
                }
            }
        ]
    };
    var geoCoordMap={};
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            //console.info(geoCoord);
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
               // console.info();
            }
        }
       // console.info(res);
        return res;
    };
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
                var valArr=[];
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
                if(area.indexOf('市') != -1){
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
           // console.info(oArr);
                option.series[0].data=convertData(oArr);
                option.geo.map=area;
                option.visualMap.min=Math.min.apply(null, valArr);
                option.visualMap.max=Math.max.apply(null, valArr);
                myChart.setOption(option,true);
            }
        });
    }
    getData(myChart,ckey);
}
