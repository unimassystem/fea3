/*构建htmldom*/
function draw314(myChart,ckey,height,titles,x,y,width,div){
  option = {
      tooltip: {},
      visualMap: {
          show:false,
          max: 100,
          inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
      },
      xAxis3D: {
        /*X轴的设置含有字的颜色*/
        axisLine:{
            lineStyle:{
                color:'#0084ff'
            }
        },
          type: 'category',
          name:''
      },
      yAxis3D: {
        /*Y轴的设置含有字的颜色*/
        axisLine:{
            lineStyle:{
                color:'#0084ff'
            }
        },
          type: 'category',
          name:''
      },
      zAxis3D: {
        /*Z轴的设置含有字的颜色*/
         axisLine:{
            lineStyle:{
                color:'#0084ff'
            }
        },
          type: 'value',
          name:''
      },
      grid3D: {
        /*X,Y,Z颜色，包含字的颜色此属性权重次与XYZ单独设置颜色，*/
        axisLine:{
            lineStyle:{
                color:'#133057'
            }
        },
        /*分割线颜色*/
        splitLine:{
            lineStyle:{
                color:'#133057'
            }
        },
        /*鼠标hover分割线颜色*/
        axisPointer:{
            lineStyle:{
                color:'#0070c6'
            }
        },
        /*默认图形大小*/
        show:true,
          boxWidth: 110,
          boxDepth: 80,
          viewControl:{
            autoRotate :true
          },
          light: {
              main: {
                  intensity: 1.2
              },
              ambient: {
                  intensity: 0.3
              }
          }
      },
      series: [{
          type: 'bar3D',
          shading: 'color',

          label: {
            /*每个柱子头上的标注*/
              show: false,
              textStyle: {
                  fontSize: 16,
                  borderWidth: 1
              }
          },

          itemStyle: {
              opacity: 0.8
          },

          emphasis: {
            /*鼠标hover的字体颜色和形状颜色*/
              label: {
                  textStyle: {
                      fontSize: 20,
                      color: '#64faff'
                  }
              },
              itemStyle: {
                  color: '#900'
              }
          }
      }]
  }
  // myChart.setOption(option);
  getData(myChart,ckey,div);
  function getData(myChart,ckey,div){
      $.ajax({
          type : 'get',
          url:'/db/jsonp/ssdb0/'+ckey,
          cache : false,
          dataType : 'jsonp',
          //async : false,
          success:function (dataAll){
              // console.info(dataAll);
              var data=dataAll.data;
              var columns=dataAll.columns;
              var x_val=[],y_val=[],d_val=[];
              for (var i = 0; i < data.length; i++) {
                if(x_val.indexOf(data[i][0]) == -1){
                  x_val.push(data[i][0])
                }
                if(y_val.indexOf(data[i][1]) == -1){
                  y_val.push(data[i][1])
                }
              }
              if(!columns[3]){
                d_val=data;
              }else{
                d_val=data;
              }
              option.xAxis3D.data=x_val;
              option.yAxis3D.data=y_val;
              option.series[0].data=d_val;
              myChart.setOption(option);
              myChart.on('click', function (params) {
                var p_data=params.data;
                var p=$(this)[0]._dom;//div
                // console.log(p);
                for (var i = 0; i < p_data.length; i++) {
                  var len=p_data.length;
                    var target=p_data[len-1];
                    var dbdK=p_data[len-3];
                    var cs=p_data[len-2];
                    targetC(p,target,dbdK,cs);
                    return true;
                }
              });
          }
      });
    }
}
