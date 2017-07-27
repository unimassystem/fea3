function draw13(myChart,ckey,height,titles,xname,yname,width,div) {
    var geoCoordMap_start={},geoCoordMap_end={};
    var lineAll=[],option;
    var convertData = function (data) {
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
    //var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];

    series.push({
        //name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.2,
            color: '#fff',
            symbolSize: 3
            //shadowBlur: 10
        },

        itemStyle : {
            normal: {
                borderWidth:1,
                lineStyle: {
                    type: 'solid',
                    //shadowBlur: 10,
                    curveness: 0.2,
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0, color: '#1f4d96' // 0% 处的颜色
                        }, {
                          offset: 0.33, color: '#3e91b8' // 0% 处的颜色
                        },{
                          offset: 0.66, color: '#68c2e7' // 0% 处的颜色
                        },{
                          offset: 1, color: '#a6d5f5' // 100% 处的颜色
                        }], false)
                }
            }
        },
        data:[]
    },
    {
        //name: item[0] + ' Top10',
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
                var starts=[],ends=[];
                var startAll=[];
                for (var i = 0; i < data.length; i++) {
                    var start=data[i];
                    starts.push([start[0],start[1],start[2]]);
                }
                for (var i = 0; i < data.length; i++) {
                    var end=data[i];
                    ends.push([end[4],end[5],end[6]]);
                }
                //组装源
                var json={};
                for(var i = 0; i < starts.length; i++) //遍历当前数组
                {
                    if (!json[starts[i]]) //如果hash表中没有当前项
                    {
                        json[starts[i]] = true; //存入hash表
                        startAll.push(starts[i]); //把当前数组的当前项push到临时数组里面
                    }
                }
                for (var i = 0; i < startAll.length; i++) {
                    var every=startAll[i];
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
                //绘画目的地的涟漪效果
                var effectD=[];
                $.each(geoCoordMap_end,function(name,value){
                    var a={
                        name:name,
                        value:value.concat([100])
                    };
                    effectD.push(a);
                    //console.info(value.concat([100]));
                });
                //组装路线
                var lines=[];
                for (var i = 0; i < data.length; i++) {
                    var line=data[i];
                    var o={name:line[0]};
                    var oo={name:line[4],value:line[3]};
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
              normal: e_mapline_itemnormal,
                emphasis:e_mapline_itememphasis
            }
        },
        series: series
    };

    getData(myChart,ckey,div);
}








  //myChart.setOption(option,true);
