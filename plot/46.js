function draw46(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends){
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
    var str=[];
    var tl=[];
    $.ajax({
        type: 'get',
        async: true,
        dataType:'jsonp',
        url: '/db/jsonp/ssdb0/'+ckey,
        success: function(data){
            // console.log(data);
            var dataAll = data;
            var dataOld = data;
            // console.log(dataOld.columns[0]);
            var data = data.data;
            var worldData = new Object();
            var chinaData = new Array();
            var convertData1 = new Array();
            var convertData11 = new Array();
            var convertData22 = new Array();
            // console.log(worldData);
            for(var i=0;i<data.length;i++){
                    var china = data[i][0];
                    var longitude = data[i][1];
                    var dimension = data[i][2];
                    var value = data[i][3];
                    var china1 = data[i][4];
                    var longitude1 = data[i][5];
                    var dimension1 = data[i][6];
                    if(data[0][0] == data[1][0]){
                        var worldValue = china1+':'+[longitude,dimension];
                        var worldval = [];
                        worldval.push(longitude1,dimension1);
                        worldData[china1] = worldval;
                    }else{
                        var worldValue = china+':'+[longitude,dimension];
                        var worldval = [];
                        worldval.push(longitude,dimension);
                        worldData[china] = worldval;
                    }

                    chinaData[i] = [{name:china1}, {name:china,value:value}];
                    convertData11[i] = {name:china,value:value}
                    convertData22[i] = {name:china1,value:value}
            }
            if(convertData11[0].name == convertData11[1].name){
                convertData1 = convertData22;
                worldData[china] = [longitude,dimension]
            }else{
                convertData1 = convertData11;
                worldData[china1] = [longitude1,dimension1]
            }
            // console.log(worldData);//各个点的坐标
            // console.log(chinaData);//出发点->目的地
            // console.log(convertData1);//热力图的点
            if(dataOld.columns[0] == 'china'){
                var convertData2 = new Array();
                for(var i=0;i<convertData1.length;i++){
                    // 更改name
                    name = convertData1[i].name;
                    if(name.substring(0,3) == '黑龙江'){
                        convertData1[i].name = name.substring(0,3);
                    }else if(name.substring(0,3) == '内蒙古'){
                        convertData1[i].name = name.substring(0,3);
                    }else{
                        var names = name.substring(0,2);
                        convertData1[i].name = names;
                    }
                }
                var arr=['北京','天津','上海','重庆','河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海','台湾','内蒙古','广西','西藏','宁夏','新疆','香港','澳门'];
                for(var i=0;i<arr.length;i++){
                    var arr2=[];
                    for(var k=0;k<convertData1.length;k++){
                        if(arr[i]==convertData1[k].name){
                            var values = parseInt(convertData1[k].value);
                            arr2.push({name:convertData1[k].name,value:values});
                        }else{
                            arr2.push({name:arr[i],value:'0'});
                        }
                    }
                    // console.log(arr2);
                    if(arr2 != ''){
                        var values = 0;
                        for(var j=0;j<arr2.length;j++){
                            values =values + parseInt(arr2[j].value);
                        }
                        // console.log(values);
                        convertData2.push({name:arr2[0].name,value:values});
                        // console.log(convertData2);
                    }else{}
                }
            }else{
                var convertData2 = convertData1;
            }
            // console.log(convertData2);
           // 取value的最大值
            var valueMax = 0;
            for(i=0;i<convertData2.length;i++){
                if(valueMax>convertData2[i].value){
                    valueMax = valueMax;
                }else{
                    valueMax = convertData2[i].value;
                }
            }
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var world = worldData[data[i].name];
                    if (world) {
                        res.push(world.concat(data[i].value));
                    }
                }
                return res;
            };
            var convertsData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = worldData[dataItem[1].name];
                    var toCoord = worldData[dataItem[0].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[1].name,
                            toName: dataItem[0].name,
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            };
            if(dataOld.columns[0] == 'china'){
                var AQI = 'china';
            }else{
                var AQI = 'world';
            }
            var series = [];
            // var arrr = [[china1,chinaData];
            var arrr = chinaData;
            arrr.forEach(function(item){
                var itemName = item[1].name+'-->'+item[0].name;
                // console.log(itemName);
                series.push(
                    {
                        name: itemName,
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: '#fff',
                            symbolSize: 3
                        },
                        lineStyle: {
                            normal: {
                                color: '#f0ffff',
                                width: 0,
                                curveness: 0.3
                            }
                        },
                        data: convertsData([item])
                    },
                    {
                        name: itemName,
                        type: 'lines',
                        zlevel: 2,
                        symbol: ['none', 'arrow'],
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: '#f0ffff',
                                width: 1,
                                opacity: 0.6,
                                curveness: 0.3
                            }
                        },
                        data: convertsData([item])
                    }

                );
            });
            // console.log(convertData2);
            series.push(
                {
                    name: '',
                    type: 'map',
                    mapType: AQI,
                    roam: true,
                    label: {
                        normal: {
                            show: false,
                            color: '#4D4E50'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#003',
                            color: '#005'
                        }
                    },
                    coordinateSystem: 'geo',
                    nameMap: nameMap,//可以显示中文
                    data: convertData2
                }
            )
            option = {
                title: {
                    text: titles,
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                visualMap: {
                    type:'continuous',
                    min: 0,
                    max: valueMax,
                    // max: 1000,
                    show: legendss,
                    inRange: {
                        // color: ['#d94e5d','#eac736','#50a3ba','#4D4E50']
                        color: ['#d94e5d','#eac736','#50a3ba','#4D4E50'].reverse()
                    },
                    splitNumber: convertData2.length,//有几个就显示几个
                    top:tops,
                    left:lefts,
                    textStyle: {
                        color: '#fff'
                    }
                    // text: ['高','低'],           // 文本，默认为数值文本
                    // calculable: true
                },
                geo: {
                    map: AQI,
                    roam: true,
                    label:{
                        show: true
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#111',
                            color: '#4D4E50',
                        }
                    }
                },
                series: series
            };

            myChart.setOption(option);

            myChart.on('click', function (params) {
                // console.log('click---46.js');
                // console.log(params);
                var city_idx = params.dataIndex;
                var city_name=params.seriesName.split('-->');
                // console.log(city_name);
                var p=$(this)[0]._dom;
                // console.log(dataAll);
                var data=dataAll.data;
                var idx=dataAll.index;
                var cum=dataAll.columns;
                var target=data[0][data[0].length-1];
                for (var i = 0; i < data.length; i++) {
                    var len=data[i].length;
                    if (data[i][0].indexOf("-->")!=-1) {
                        data[i][0]=data[i][0].replace(/\_/g," ");
                    }
                    if(cum.indexOf('pageid1') ==-1){
                      if(city_name[0]==data[i][0] && city_name[1]==data[i][4]){
                        var dbdK=data[i][len-3];
                        var cs=data[i][len-2];
                          if(cum[7]=='width'){
                            var k=data[i][7];
                            var g=data[i][8];
                            targetC(p,target,dbdK,cs,k,g);
                          }else{
                            targetC(p,target,dbdK,cs);
                          }
                          return true;
                      }
                    }else{
                      if(cum[9]=='pageid1'){
                        var dbdK=data[i][len-3];
                        var cs=data[i][len-2];
                        var dbdK1=data[i][9];
                        var cs1=data[i][10];
                        var k=data[i][7];
                        var g=data[i][8];
                        var cs2=cs1.split('=');
                        if(params.name == cs2[1]){
                          targetC(p,target,dbdK1,cs1,k,g);
                          return true;
                        }
                        if(city_name[0]==data[i][0] && city_name[1]==data[i][4]){
                          targetC(p,target,dbdK,cs,k,g);
                          return true;
                        }
                      }
                      if(cum[7]=='pageid1'){
                        var dbdK=data[i][len-3];
                        var cs=data[i][len-2];
                        var dbdK1=data[i][7];
                        var cs1=data[i][8];
                        var cs2=cs1.split('=');
                        if(params.name == cs2[1]){
                          targetC(p,target,dbdK1,cs1);
                          return true;
                        }
                        if(city_name[0]==data[i][0] && city_name[1]==data[i][4]){
                          targetC(p,target,dbdK,cs);
                          return true;
                        }
                      }
                    }

                }
            });
        },
        error: function(error){
            console.log(error);
        }
    });





}
