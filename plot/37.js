//地图攻击路线图
function draw37(myChart,ckey,height,titles,xname,yname,width,div) {
    var x=[];
    var str=[];
    var tl=[];
    var value = [];
    var once=true;
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
            map: 'china',
            left: 0,
            right: 0,
            silent: true,
            itemStyle: {
                normal: {
                    borderColor: '#003',
                    opacity:1

                }
            }
        },
        series: [
          // {
          //   type: 'lines',
          //   coordinateSystem: 'geo',
          //   data: [[[117,36.4],[118.46,32.03]]],
          //   large: true,
          //   zlevel:3,
          //   effect:{
          //     show:true,
          //     symbolSize:5,
          //     symbol:'arrow',
          //     color:'#ff0000',
          //     loop:{
          //         boolean:false
          //     }
          //   },
          //   largeThreshold: 100,
          //   lineStyle: {
          //       normal: {
          //           color:'#ff0000',
          //           opacity: 0.5,
          //           width: 1,
          //           curveness: 0.3
          //       }
          //   },
          //   // 设置混合模式为叠加
          //   blendMode: 'lighter'
          // }
        ]
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
        var starts=[],ends=[],name_cms=[],name_cme=[];
        function update(myChart,raw_data){
            var datas=JSON.parse(raw_data);
            console.log(raw_data);
            var name=datas.columns;
            var data=datas.data;

            for(var i=0;i<datas.data.length*2;i++){
                for(var j=0;j<data.length;j++){
                    var start=data[j];
                    // value.shift();
                    starts.push([start[0],start[1],start[2]]);
                }
                for (var j=0;j<data.length;j++) {
                    var end=data[j];
                    ends.push([end[4],end[5],end[6]]);
                }
                for(var q=0;q<starts.length;q++){
                    var stjw = starts[q];
                    //var jwd=[];
                    name_cms.push(stjw[1],stjw[2]);
                    //name_cms
                }
                for(var q=0;q<ends.length;q++){
                    var stjw = ends[q];
                    //var jwd=[];
                    name_cme.push(stjw[1],stjw[2]);
                    //name_cms
                }
                var valueA = [name_cms[i],name_cme[i]]
                value.shift();
                value.push(valueA);
                console.log(value);
                console.log(valueA);
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
            }//end for
            option.series=o;
            //myChart.setOption(option,true);
        }
        //getData(myChart,ckey,div);
        getData(myChart,ckey);

    }

    myChart.setOption(option,true);
};








  //myChart.setOption(option,true);
