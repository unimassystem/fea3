/*构建htmldom*/
function draw317(myChart,ckey,height,titles,x,y,width,div){

  option = {
      series: [{
          type: 'liquidFill',
          // data: [0.6, 0.5, 0.4, 0.3],
          radius: '80%'
      }],
      label: {
            normal: {
                position: ['38%', '40%'],
                formatter: function(param) {
                  var val=param.seriesName
                    return val;
                },
                textStyle: {
                    fontSize: 40,
                    color: '#D94854'
                }
            }
        }
  };

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
              // console.log(data);
              var das=[],name;
              for (var i = 0; i < data.length; i++) {
                name=data[0][0];
                var dar=data[i];
                for (var k = 0; k < dar.length; k++) {
                  var val=dar[0]/dar[1];
                  val=val.toFixed(1);
                }
                das.push(val);
              }
              for (var i = 0; i < das.length; i++) {
                das[i] = das[i].replace(/"/g,"");
              }
              var o={
                  type: 'liquidFill',
                  name: name,
                  data: das,
                  radius: '80%'
              }
              
              option.series=o;
              myChart.setOption(option);
          }
      });
    }
}
