function draw22(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
        tooltip : {
            trigger: 'item'
        },
        visualMap: {
            show:legendss,
            type:'piecewise',
            // type:'piecewise',
            min: 0,
            max: 1000,
            top:tops,
            left:lefts,
            color:e_maphotscatter_visulecolor,
            // color: ['lightskyblue','yellow', 'orangered'],
            text: ['高','低'],           // 文本，默认为数值文本
            // textStyle: e_maphotscatter_visuletextStyle,
            calculable: true
        },
        series : [
            {
                name: '',
                type: 'map',
                map: '',
                roam:true,
                data : [],
                nameMap: nameMap,//可以显示中文
            },
            {
                name: '',
                type: 'map',
                map: '',
                data:[],
                markPoint :e_maphotscatter_point
            }
        ]
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
                var column=dataAll.columns;
                var valueArr=[];
                var data=dataAll.data;
                var seriesF=[];
                var seriesS=[];
                var resName={};
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
                for (var i = 0; i < data.length; i++) {
                    var o={
                        name:data[i][0],
                        value:data[i][1]
                    };
                    seriesF.push(o);
                    valueArr.push(data[i][1]);
                }
                console.log(valueArr);
                var visMin = valueArr[0];
                var visMax= valueArr[0];
                for(var k=0;k<valueArr.length;k++){
                    if(valueArr[k]>visMax){
                        visMax = valueArr[k];
                    }
                    if(valueArr[k]<visMin){
                        visMin = valueArr[k];
                    }
                }
                // console.log(visMin);
                // console.log(visMax);
                $.ajax({
                    type : 'get',
                    url:'/db/jsonp/ssdb0/'+ckey+'_sd',
                    cache : false,
                    async:false,
                    dataType : 'jsonp',
                    success:function(res){
                        resName=res;
                        var dt=res.data;
                        for (var i = 0; i < dt.length; i++) {
                            var jw=[];
                            jw.push(dt[i][1],dt[i][2]);
                            var oo={
                                name:dt[i][0],
                                value:dt[i][3],
                                coord:jw
                            }
                            seriesS.push(oo);
                            valueArr.push(dt[i][3]);
                        }
                    }
                });
                // option.visualMap.min=Math.min.apply(null, valueArr);
                // option.visualMap.max=Math.max.apply(null, valueArr);
                option.series[0].name=dataAll.columns[1];
                option.series[1].name=resName.columns[3];
                option.series[0].map=dataAll.columns[0];
                option.series[1].map=dataAll.columns[0];
                option.series[0].data=seriesF;
                option.series[1].markPoint.data=seriesS;
                option.visualMap.min=visMin;
                option.visualMap.max=visMax;
                myChart.setOption(option,true);

                myChart.on('click', function (params) {
                    var city_idx = params.dataIndex;
                    var city_name=params.name;
                    var p=$(this)[0]._dom;


                    var data=dataAll.data;
                    var idx=dataAll.index;
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
                            //console.info(dbdK,cs);
                           targetC(p,target,dbdK,cs);
                            return true;
                        }
                    }
                });
            }
        });
    };
}
