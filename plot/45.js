function draw45(myChart,ckey,height,titles,xname,yname,width,div){

    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function (dataAll){
            // console.log(dataAll);
            var columns = dataAll.columns;
            var data = dataAll.data;

            if(columns[0] == 'world'){  //判断地图类型
                var geoMap = 'world';
            }else{
                var geoMap = 'china';
            }

            // if(data[1] !='' && data[2] !='' && data[3] !=''){
            //     if(data[1][0] == data[2][0] && data[3][0] == data[2][0]){   //判断前面的数据是否一样
            //       
            //     }else{
            var content = []; //线的坐标
            for(var i=0;i<data.length;i++){
                var fromjing = data[i][1];
                var fromwei = data[i][2];
                var tojing = data[i][5];
                var towei = data[i][6];
                content.push([[fromjing,fromwei],[tojing,towei]]);
                
            }
            if(data[1] !='' && data[2] !='' && data[3] !=''){
                if(data[1][0] == data[2][0] && data[3][0] == data[2][0]){   //判断前面的数据是否一样
                    var dian = [];//点--坐标
                    var dianName = [];//点--名字
                    var fromDian = [[data[0][1],data[0][2]]];
                    dian.push(fromDian);
                    dianName.push(data[0][0]);
                    for(var i=0;i<data.length;i++){
                        var toDian = [[data[i][5],data[i][6]]];
                        dian.push(toDian);
                        dianName.push(data[i][4]);
                    }
                }else{
                    var dian = [];//点--坐标
                    var dianName = [];//点--名字
                    var fromDian = [[data[0][5],data[0][6]]];
                    dian.push(fromDian);
                    dianName.push(data[0][4]);
                    for(var i=0;i<data.length;i++){
                        var toDian = [[data[i][1],data[i][2]]];
                        dian.push(toDian);
                        dianName.push(data[i][0]);
                    }
                }
            }
            

            var series = [];
            for(var k=0;k<data.length;k++){
                // console.log(content[k]);
                var contents = []; //线的弧度
                contents.push(content[k]);
                if(data[k][7] == 1){
                    var curveness = 0.2;
                    var color = '#A6C84C';
                }else if(data[k][7] == 2){
                    var curveness = 0.4;
                    var color = '#FF0000';
                }else{
                    var curveness = -0.2;
                    var color = '#3B90E3';
                }
                series.push(
                    {
                        name: data[k][0]+'-->'+data[k][4],
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
                                color: color,
                                width: 0,
                                curveness: curveness
                            }
                        },
                        data: contents
                    },
                    {
                        name: data[k][0]+'-->'+data[k][4],
                        type: 'lines',
                        zlevel: 2,
                        symbol: ['none', 'arrow'],
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: color,
                                width: 1,
                                opacity: 0.6,
                                curveness: curveness
                            }
                        },
                        data: contents
                    },
                    {
                        name: dianName[k],
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        // symbolSize: function (val) {
                        //     return val[2] / 8;
                        // },
                        itemStyle: {
                            normal: {
                                color: 'green'
                            }
                        },
                        data: dian[k]
                    }
                );
            }
            

            option = {
                // backgroundColor: '#404a59',
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data:['北京 Top10'],
                    textStyle: {
                        color: '#fff'
                    },
                    selectedMode: 'single'
                },
                geo: {
                    map: geoMap,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: series
            };

            myChart.setOption(option,true);


            myChart.on('click', function (params) {
                // console.log('click---45.js');
                // console.log(params);
                var city_idx = params.dataIndex;
                var city_name=params.seriesName.split('-->');
                // console.log(city_name)
                var p=$(this)[0]._dom;
                // console.log(dataAll);
                var data=dataAll.data;
                var idx=dataAll.index;
                var target=data[0][data[0].length-1];
                for (var i = 0; i < data.length; i++) {
                    //console.info(city_idx);
                    var len=data[i].length;
                    if (data[i][0].indexOf("-->")!=-1) {
                        //console.info(typeof(data[i][0]));
                        data[i][0]=data[i][0].replace(/\_/g," ");
                        //console.info(data[i][0]);
                    }
                    if(city_name[0]==data[i][0] && city_name[1]==data[i][4]){
                        //console.info(city_idx,data[i][0]);
                        var dbdK=data[i][len-3];
                        var cs=data[i][len-2];
                        // console.log(p);
                        // console.log(target);
                        // console.log(dbdK);
                        // console.log(cs);
                        targetC(p,target,dbdK,cs);
                        return true;
                    }
                }
            });
        },
        error:function(error){
            console.log(error);
        }
    });


}