function draw73(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
            /*
            ws.onopen = function() {
                ws.send(mq_topic);
            };
            */
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
        for (var key in datas){
            var tips=datas[key];
            var arr1=[];
            arr1.push(key);
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
                  text: (tips * 1) + '%',
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
                  radius: ['70%', '100%'],
                  hoverAnimation: false,
                  center:['50%','50%'],
                  itemStyle:{
                      normal:{
                          color:'#178194'
                      }
                  },
                  label: {
                      normal: {
                          show: false,
                      }
                  },
                  data: [{
                        value: tips,
                        itemStyle: {
                            normal: {
                              color: '#16c0cd',
                              shadowBlur: 10,
                              shadowColor: '#137f92'
                            }
                        }
                    }, {
                        value: 100 - tips,
                    }]
              }]

          })
        }

    }
    getData(myChart,ckey);
};
