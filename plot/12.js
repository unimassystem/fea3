function draw12(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
        color:e_angle_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,
             textStyle:e_legend_textstyle,
            data:[]
        },
        series : []
    };

    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            success:function(dataAll){
                //console.info(dataAll);
                var index=dataAll.index;
                var data=dataAll.data;
                var name=dataAll.columns;
                var lenth=name.length;
                var cutLen=lenth;
                if (name[lenth-1].indexOf('target')==-1) {
                    cutLen=lenth;
                }else{
                    cutLen=lenth-3;
                }
                if(name.indexOf('width')!=-1){
                  cutLen=cutLen-2;
                }
                var seriesObj=[],inx=[];
                var center;
                for (var i = 0; i < index.length; i++) {
                   inx.push(index[i].toString());
                }
                for (var i = 0; i < cutLen; i++) {
                    var oArr=[];
                    for (var j = 0; j < data.length; j++) {
                        var o={
                            name:inx[j],
                            value:data[j][i],
                        }
                        oArr.push(o);
                    }
                    if(cutLen==1){
                        center=['50%','60%'];

                    }else if(cutLen>=2){
                        center=[((i*50)+25)+'%','60%'];
                    }
                    //console.info(center);
                    var oo={
                        name:name[i],
                        type: 'pie',
                        radius :['15%','55%'],
                        roseType : 'radius',
                        center:center,
                        data:oArr,
                        label:{
                            normal:{
                                show:true,
                                position: 'outside',
                                formatter:"{b} : {c} ({d}%)"
                            }
                        },
                        itemStyle: {
                            /*normal:{
                                label:{show:true,position: 'outside'}
                            },*/
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    };
                    seriesObj.push(oo);
                }

                //console.info(oArr);
                option.legend.data=inx;
                option.series=seriesObj;
                myChart.setOption(option);

                myChart.on('click', function (params) {
                    // console.info(params);
                    var city_idx = params.dataIndex;
                    var city_name=params.name;
                    //console.info(city_idx,city_name);
                    var p=$(this)[0]._dom;;

                    var data=dataAll.data;
                    var cul=dataAll.columns;
                    var idx=dataAll.index;
                    //console.info(data);
                    var target=data[0][data[0].length-1];
                    for (var i = 0; i < data.length; i++) {
                        var len=data[i].length;
                        if(city_name==idx[i]){
                            var dbdK=data[i][len-3];
                            var cs=data[i][len-2];
                            if(cul.indexOf('width')!=-1){
                              var m1=cul.indexOf('width');
                              var k=data[i][m1];
                              var m2=cul.indexOf('height');
                              var g=data[i][m2];
                              targetC(p,target,dbdK,cs,k,g);
                            }else{
                              targetC(p,target,dbdK,cs);
                            }
                            /*console.info(city_name,idx[i]);
                            console.info(dbdK,cs);*/
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

    getData(myChart,ckey,div);
}
