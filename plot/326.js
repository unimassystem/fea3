function draw326(myChart,ckey,height,titles,xname,yname,width,div) {
    var geoCoordMap_start={},geoCoordMap_end={},geoCoordMap_all={};
    var lineAll=[],option;
    var convertData = function (data) {
        // console.info(data);
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap_start[dataItem[0].name];
            var toCoord = geoCoordMap_end[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        //console.info(res);
        return res;
    };
    var series = [];

    series.push({
        //name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 1,
            color:e_326_arrowcolor,
            symbolSize: 4,
            symbol:'arrow',
            //shadowBlur: 10
        },
        symbol:['none','arrow'],
        itemStyle : {
            normal: {
                borderWidth:1,
                lineStyle: {
                    type: 'solid',
                    //shadowBlur: 10,
                    curveness: 0.2,
                    // color:'red'
                }
            }
        },
        data:[]
    },
    {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        effectType:'ripple',
        rippleEffect: {
            brushType: 'stroke'
        },
        showEffectOn: 'render',
        label: {
            normal: {
                show: false,
                position: 'right',
                formatter: '{b}',
                textStyle:{color:'#00f6ff'}
            }
        },
        symbol:'circle',
        symbolSize: function (val) {
            //console.info(val);
            var size=val[2]/8;
            //console.info(size);
            return size;
        },
        itemStyle : {
            normal: {
                color:'#bcdef4',
                borderWidth:1,
                lineStyle: {
                    type: 'solid'
                    //shadowBlur: 10
                }
            }
        },
        data:[]
    });



    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            success:function(dataAll){
              // console.log(dataAll);
               var area=dataAll.columns[0];
                var data=dataAll.data;
                var starts=[],ends=[],all_sd=[];
                var startAll=[];
                for (var i = 0; i < data.length-1; i++) {
                    var start=data[i];
                    starts.push([start[0],start[1],start[2]]);
                }
                for (var i = 1; i < data.length; i++) {
                    var end=data[i];
                    ends.push([end[0],end[1],end[2]]);
                }
                //组装源
                for (var i = 0; i < starts.length; i++) {
                    var every=starts[i];
                    var xy=[];
                    xy.push(every[1],every[2]);
                    geoCoordMap_start[every[0]]=xy
                }
                //console.info(geoCoordMap_start);

                //组装目的
                for (var i = 0; i < ends.length; i++) {
                    var every=ends[i];
                    var xy=[];
                    xy.push(every[1],every[2]);
                    geoCoordMap_end[every[0]]=xy
                }
                //console.info(geoCoordMap_end);
                for (var i = 0; i < data.length; i++) {
                    var all=data[i];
                    all_sd.push([all[0],all[1],all[2]]);
                }
                for (var i = 0; i < all_sd.length; i++) {
                    var every=all_sd[i];
                    var xy=[];
                    xy.push(every[1],every[2]);
                    geoCoordMap_all[every[0]]=xy
                }
                //绘画目的地的涟漪效果
                var effectD=[];
                $.each(geoCoordMap_all,function(name,value){
                    var a={
                        name:name,
                        value:value.concat([100])
                    };
                    effectD.push(a);
                    //console.info(value.concat([100]));
                });
                //组装路线
                var lines=[];
                for (var i = 0; i < data.length-1; i++) {
                    var line=data[i];
                    var k=i+1;
                    var lines=data[k];
                    var o={name:line[0]};
                    var oo={name:lines[0]};
                    lineAll.push([o,oo]);
                }
                // console.log(lineAll);
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
                //console.info(lineAll);
                option.series[0].data=convertData(lineAll);
                option.geo.map=dataAll.columns[0];
                option.series[1].data=effectD;
                myChart.setOption(option,true);
            }
        });
    }

    // var img_map_bg = new Image();
    // img_map_bg.src = e_mapimg_bg;

    option = {
        // backgroundColor:e_back_color,
        //color:'#bcdef4',
        title : {
            text: titles,
            left: 'center',
            textStyle :e_title_textstyle
        },
        tooltip : {
            trigger: 'item'
        },
        geo: {
            map: 'china',
            //color:'#bcdef4',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal:{
                    color:e_326_mapcolor,
                    borderColor:e_326_mapbordercolor,
                },
                emphasis:{
                    color:e_326_maphovercolor,
                }
             /* normal: e_mapline_itemnormal,
                emphasis:e_mapline_itememphasis*/
            }
        },
        series: series
    };

    getData(myChart,ckey,div);
}








  //myChart.setOption(option,true);
