
function draw66(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
  var lineStyle = {
      normal: {
          width: 1,
          opacity: 0.5
      }
  };
    option = {
        // backgroundColor: '#333',
        legend: {
            show:legendss,
            orient:orients,
            top:tops,
            left:lefts,
            data: [],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
        },
        parallelAxis: [],
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 250,
        //     right: 20,
        //     bottom: 30,
        //     dimension: 2,
        //     calculable: true,
        //     inRange: {
        //         color: ['#d94e5d','#eac736','#50a3ba'].reverse()
        //     },
        //     text: [],
        //     textGap: 20,
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        parallel: {
            left: '8%',
            right: '10%',
            bottom: 100,
            parallelAxisDefault: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        },
        series: []
    };
    getData(myChart,ckey);
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            success:function(dataAll){
              var data=dataAll.data;
              var arr1=[],arr2=[],arr3=[],All1=[],leg=[];
              var col=dataAll.columns;
              var dataA={};
              col.shift();
              for (var i = 0; i < data.length; i++) {
                var data2=data[i][5];
                var data3=data[i][1];
                if(arr2.indexOf(data2)==-1){
                  arr2.unshift(data2);
                }
                if(arr3.indexOf(data3)==-1){
                  arr3.push(data3);
                }
              }
              data.forEach(function (route) {
                  var ys = route[0];
                  if (!dataA[ys]) {
                      dataA[ys] = [];
                  }
                  leg.push(ys);
                  route.shift();
                  // console.log(route);
                  dataA[ys].push(route);
                  var a={
                    name:ys,
                    type: 'parallel',
                    lineStyle: lineStyle,
                    data:dataA[ys]
                  };
                  arr1.push(a);
              });

              for (var i = 0; i < col.length; i++) {
                if(i==0){
                  var o={
                    dim:i,
                    name:col[i],
                    type:'category',
                    axisLabel:{
                     margin:-60
                    },
                    data:arr3
                  }
                }
                if(i == col.length-1){
                  var o={
                    dim:i,
                    name:col[i],
                    type:'category',
                    data:['差','一般','良好','优']
                    // data:arr2
                  }
                }
                if(i!=0&&i!=col.length-1){
                  var o={
                    dim:i,
                    name:col[i]
                  }
                }
                All1.push(o);
              }
              option.parallelAxis=All1;
              option.series=arr1;
              option.legend.data=leg;
              myChart.setOption(option);
          }
      });
    }
  }
