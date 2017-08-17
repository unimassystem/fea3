//地图攻击路线图
function draw301(myChart,ckey,height,titles,xname,yname,width,div) {
    var x=[];
    var str=[];
    var tl=[];
    var value = [];
    for(var j=0;j<10;j++){
        value.push([[0,0],[0,0]]);
    }
    var once=true;
    // var map_n
    var option={
        // backgroundColor:e_back_color,
        color:e_angle_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        geo:{
            map:'world',
            left: 0,
            right: 0,
            silent: true,
            zoom:0.6,
            roam:{
              boolean:true
            },
            silent:{
              boolean:false
            },
            // nameMap: nameMap,//可以显示中文
            itemStyle: {
              normal:e_301normal,
              emphasis: {
                  areaColor: '#7bbb9b'
              }
            }
        },
        //layoutCenter: ['50%', '50%'],
        series: []
    };

    function getData(myChart,ckey){
      var ws=null;
      var ip_addr = document.location.hostname;
      var mq_topic = ckey;
      var url = "ws://"+ip_addr+":8998/"+mq_topic;
      if (ws !=null && ws.url !=url){
          ws.close();
          ws =null;
      }
      if (ws==null){
          ws = new WebSocket(url);
          ws.onmessage = function (evt) {
              //console.log(evt.data);
              update(myChart,evt.data);
          };
          ws.onclose = function(){
              //alert("Connection is closed");
              ws=null;
          };
          ws.error = function()
          {
              //alert("Error Happended");
              ws.close();
              ws=null;
          };

      }//end if
    }
    function update(myChart,raw_data){
        var datas=JSON.parse(raw_data);
        // console.log(datas);
        var name=datas.columns;
        var data=datas.data;
        for(var i=0;i<data.length;i++){
          var  starts=[data[i][1],data[i][2]];
          var  ends=[data[i][4],data[i][5]];
          var  name_cms=[starts,ends];
          value.shift();
          value.push(name_cms);

        }
        //console.log(value);
        var o={
          type: 'lines',
          coordinateSystem: 'geo',
          large: true,
          zlevel:3,
          effect:{
            show:true,
            symbolSize:5,
            symbol:'arrow',
            color:'#ff0000',
            loop:{
                boolean:false
            }
          },
          nameMap: nameMap,//可以显示中文
          largeThreshold: 100,
          lineStyle: {
              normal: {
                  color:'#ff0000',
                  opacity: 0.5,
                  width: 1,
                  curveness: 0.3
              }
          },
          // 设置混合模式为叠加
          blendMode: 'lighter',
          data:value
        };
        //str.push(o);
        option.series=o;
        option.geo.map=datas.columns[0];
        myChart.setOption(option);
        myChart.on('click', function (params) {
            // console.log(params);
            // console.log(datas);
            var city_idx = params.dataIndex;
            var city_name=params.seriesName.split('-->');
            var p=$(this)[0]._dom;
            var data=datas.data;
            var target=data[0][data[0].length-1];
            for (var i = 0; i < data.length; i++) {
                var len=data[i].length;
                var dbdK=data[i][len-3];
                var cs=data[i][len-2];
                targetC(p,target,dbdK,cs);
                return true;
            }
        });
    }//end for
    getData(myChart,ckey);
    myChart.setOption(option);


};








  //myChart.setOption(option,true);
