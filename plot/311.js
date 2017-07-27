function draw311(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
            trigger: 'item'
        },
        visualMap:{
        	show:legendss,
        	//type:'piecewise',
	        min: 0,
	        max: 1000,
					top:tops,
					left:lefts,
	        color:e_map_visul_color,
	        text: ['高','低'],
	        textStyle: e_map_visul_textstyle,
	        calculable: true
        },
        series : [
            {
                //name: area,
                type: 'map',
                //map: area,
                roam: false,
                itemStyle:{
                    normal:e_map_itemnormal,
                    emphasis:e_map_itememphasis
                },
                nameMap: nameMap,//可以显示中文
               // silent:true
               // data:oArr
            }
        ]
    };
    var idArr=[],o={},oArr=[], area;
    var dataShow=function(myChart,data,column){
        var valArr=[];
        //判断color是否存在
				if(column[0] == '海南'){ //判断是海南的时候给他添加中心坐标和放大值
					option.series[0].zoom=7;
					option.series[0].roam=true;
					option.series[0].center=[109.83,19.05];
				}
        if(column.indexOf('color')==-1){
            for (var i = 0; i < data.length; i++) {
                if (data[i][0].indexOf("_")!=-1) {
                    //console.info(typeof(data[i][0]));
                    data[i][0]=data[i][0].replace(/\_/g," ");
                    //console.info(data[i][0]);
                }

                var id=data[i][0];
                var value=data[i][1];
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
        }else{
            for (var i = 0; i < data.length; i++) {
                if (data[i][0].indexOf("_")!=-1) {
                    //console.info(typeof(data[i][0]));
                    data[i][0]=data[i][0].replace(/\_/g," ");
                    //console.info(data[i][0]);
                }
                var id=data[i][0];
               // console.info(id);
                value1=data[i][1];
                var color=data[i][2];
                o={
                    name:id,
                    value:color,
                    value1:value1,
                    tooltip:{
                        formatter:function(params){
                            return params.name+':'+params.data.value1;
                        }
                    }
                };
                idArr.push(id);
                oArr.push(o);
            }
            for (var i = 0; i < oArr.length; i++) {
                var val=oArr[i].value;
                valArr.push(val);
            }
        }

        //console.info(valArr)
        option.series[0].data=oArr;
        option.series[0].map=area;
        option.series[0].name=area;
        var vColor={
            show:false,
            type:'piecewise',
            splitNumber:10,
            categories:[10,9,8,7,6,5,4,3,2,1,0],
            left: '5%',
            color:['#d2b4ae','#ba8a80', '#f9ad9d', '#db8d7d', '#ac786d', '#db6f58', '#c5563f', '#953521', '#800715', '#5d0000','#666'],
            top: 'bottom',
            //text: ['低','高'],           // 文本，默认为数值文本
            calculable: true
        };
        if (column.indexOf('color')==-1) {
            //alert();
            if(valArr.length==1){
                option.visualMap.min=0;
                option.visualMap.max=Math.max.apply(null, valArr);
            }else{
                option.visualMap.min=Math.min.apply(null, valArr);
                option.visualMap.max=Math.max.apply(null, valArr);
            }
        }else{
            //alert("..");
            option.visualMap=vColor;
        }


        myChart.setOption(option,true);
    };
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            async : false,
            success:function(dataAll){
                area=dataAll.columns[0];
								// console.log(area);
                var areaEnd;
                var column=dataAll.columns;
                var data=dataAll.data;
                if(area.indexOf('市')==-1){
                    dataShow(myChart,data,column);
                }else{
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
                        dataShow(myChart,data,column);
                    })
                }

                myChart.on('click', function (params) {
                    var city_idx = params.dataIndex;
                    var city_name=params.name;
                    var p=$(this)[0]._dom;

                    var data=dataAll.data;
                    var idx=dataAll.index;
                    var target=data[0][data[0].length-1];
                    //console.info(target);
                    for (var i = 0; i < data.length; i++) {
                        //console.info(city_idx);
                        var len=data[i].length;
                        if (data[i][0].indexOf("_")!=-1) {
                            //console.info(typeof(data[i][0]));
                            data[i][0]=data[i][0].replace(/\_/g," ");
                            //console.info(data[i][0]);
                        }
                        if(city_name==data[i][0]){
                            //console.info(city_idx,data[i][0]);
                            var dbdK=data[i][len-3];
                            var cs=data[i][len-2];
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
     getData(myChart,ckey);
}
