function draw76(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    getData(myChart,ckey,div);
    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
              var datas=dataAll.data[0];
              var tips=datas[0];
              var arr1=[];
              var key=dataAll.columns[0];
                  arr1.push(key);
              if(dataAll.columns.indexOf('color')!=-1){
                var color1=datas[1];
                var color=color1.split(';');
              }else{
                var color=['#16c0cd','#178194']
              }
                myChart.setOption({
                  legend: {
                    show:legendss,
                    orient:orients,
                    top:tops,
                    left:lefts,
                    data:arr1,
                    textStyle:e_legend_textstyle
                  },
                    title: {
                        text: (tips * 1),
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            color: '#16c0cd',
                            fontSize: 50,
                            fontWeight:'bold'
                        }
                    },
                    series: [{
                        name: key,
                        type: 'pie',
                        radius: ['50%', '81%'],
                        hoverAnimation: false,
                        color:color,
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: [{
                              value: tips,
                              itemStyle: {
                                  normal: {
                                    color: color[0],
                                    shadowBlur: 10,
                                    shadowColor: '#137f92'
                                  }
                              }
                          }, {
                              value: 100 - tips,
                              itemStyle:{
                                  normal:{
                                      color:color[1]
                                  }
                              },
                          }]
                    }]

                })

            }
        });
    }

}


    //console.info(dataAll);
