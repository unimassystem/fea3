function draw30(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
            success:function(res){
                //组装数组格式
                var data=res.data;
                var yipArr=[];
                var yimbArr=[];
                var dkAll=[];
                //获取yip；
                for (var i = 0; i < data.length; i++) {
                    var start=data[i];
                    yipArr.push(start[0]);
                    yimbArr.push([start[0],start[1]]);
                    var dk={
                        name:data[i][2],
                        value:data[i][3]
                    };
                    dkAll.push(dk);
                }
                //给yip去重
                var json={};
                var yip_dis=[];
                for(var i = 0; i < yipArr.length; i++){
                    if (!json[yipArr[i]]){
                        json[yipArr[i]] = true;
                        yip_dis.push(yipArr[i]);
                    }
                };
                //获取yip相同时候每个yip的值
                var name_child={};
                var yipAll=[];
                for (var i = 0; i < yip_dis.length; i++) {
                    var c=[];
                    var n=0;
                    for (var j = 0; j < data.length; j++) {
                        if(yip_dis[i]==data[j][0]){
                            n=n+data[j][3];
                        }
                    }
                    name_child={
                        name:yip_dis[i],
                        value:n
                    };
                    yipAll.push(name_child);
                }
                //给yip以及mbp的数组去重
                var js={};
                var yipmb_dis=[];
                for(var i = 0; i < yimbArr.length; i++){
                    if (!js[yimbArr[i]]){
                        js[yimbArr[i]] = true;
                        yipmb_dis.push(yimbArr[i]);
                    }
                };
                //yip相等的情况下，获取相等的mip
                var mipAll=[];
                for (var i = 0; i < yipmb_dis.length; i++) {
                    var cnt=0;
                    for (var j = 0; j < data.length; j++) {
                        if(yipmb_dis[i][0]==data[j][0]&&yipmb_dis[i][1]==data[j][1]){
                            cnt=cnt+data[j][3];
                        }
                    }
                    var mip={
                        name:yipmb_dis[i][1],
                        value:cnt
                    };
                    mipAll.push(mip);
                }
                //console.info(mipAll);console.info(yipAll);console.info(dkAll);
                var seriesData=[];
                seriesData.push(yipAll,mipAll,dkAll);
                //创建series
                var columns=res.columns;
                var index=[];
                var seriesObj=[];
               // var radius=30,nR=0,wR=0;
                var radius=[['0','30%'],['35%','55%'],['60%','80%']];
                for (var i = 0; i < 3; i++) {
                    index.push(columns[i]);//legends
                    //设置内外半径
                    /*nR=wR1;*/
                    //console.info([nR,wR]);
                    /*wR=parseInt(nR+10)+'%';
                    wR1=parseInt(radius+i*10+10)+'%';*/
                    var oo={
                        name:columns[i],
                        type: 'pie',
                        radius :radius[i],
                        center: ['50%', '55%'],
                        data:seriesData[i],
                        itemStyle: {
                            normal:{
                                label:{show:false}
                            },
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
                option.legend.data=index;
                option.series=seriesObj;
                myChart.setOption(option);

            }
        });
    }
    getData(myChart,ckey,div);
}
