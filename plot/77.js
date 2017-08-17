function draw77(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    option={
        // backgroundColor:e_back_color,
        legend: {
            show:legendss,
            orient:orients,
            top:tops,
            left:lefts,
            data: [],
            textStyle: {color: '#d2e1e8'}
        },
        xAxis: {
            name:xname,
            type: 'category',
            splitLine:{
                show:false
            },
            axisLine:{
                lineStyle:{
                    color:'#d2e1e8',
                    width:2
                }
            },
            data: [],
            // axisTick: {show: false},
            // axisLine: {show: false},
            // axisLabel: {
            //     // margin: 20,
            //     textStyle: {
            //         color: '#ddd',
            //         fontSize: 14
            //     }
            // }
        },
        yAxis: {
            show:true,
            nameTextStyle:{
                color:'#d2e1e8'
            },
            axisLabel:{
                textStyle:{
                    color:'#d2e1e8'
                }
            },
            splitLine:{
                lineStyle:{
                    color:'#383838',
                    type:'dashed'
                }
            },
            axisLine:{
                lineStyle:{
                    width:2,
                    color:'#d2e1e8',


                }
            }
        },
        tooltip:{},
        animationEasing: 'elasticOut',
        series: []
    };

    getData(myChart,ckey,div);
    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
                var datas=dataAll.data;
                var colum=dataAll.columns;
                var inx=dataAll.index;
                var arr1=[],arr2=[];
                var len=colum.length;
                var led=colum;
                if(colum.indexOf('barwidth') !=-1){
                  len=len-2;//2017.8.4 ycj 自定义bar的粗细，颜色[位置在width前面]
                  led.pop();
                  led.pop();
                }
                var lens=datas[0].length;
                for(var k=0;k<len;k++){
                  var arr3=[];
                  var bar_color=[];
                  for (var i = 0; i < datas.length; i++) {
                    if(colum.indexOf('barwidth') !=-1){
                      var bar_width=datas[i][lens-2];
                      bar_color.push(datas[i][lens-1]);
                    }else{
                      var bar_width='20%';
                      bar_color=['#e2e354','#e2e354','#e2e354'];
                    }
                    var o={
                            value:datas[i][k],
                            name:inx[i][k],
                            // symbol: 'image://' + paperDataURI,
                            symbol:'../images/bar_77/bar_77.png',
                            symbolRepeat: true,
                            symbolSize: [bar_width, '1%'],
                            // symbolOffset: [0, 10],
                            symbolMargin: '20%',
                            animationDelay: function (dataIndex, params) {
                                return params.index * 30;
                            }
                          }
                          arr3.push(o);
                  }
                    var oo={
                      type: 'pictorialBar',
                      name:colum[k],
                      hoverAnimation: true,
                      barCategoryGap:'-30%',
                      barGap:'-50%',
                      label: {
                          normal: {
                              show: true,
                              position: 'top',
                              textStyle: {
                                  fontSize: 16,
                                  color: '#d2e1e8'
                              }
                          }
                      },
                      // barGap:'0%',
                      color:bar_color,
                      data: arr3,
                    }
                    arr1.push(oo);

                }
                option.series=arr1;
                option.legend.data=led;
                option.xAxis.data=inx;
                myChart.setOption(option);


            }
        });
    }

}


    //console.info(dataAll);
