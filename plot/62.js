function draw62(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    function getData(ckey){
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
                update(evt.data);

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
    function doint() {
      var new62 = '<table class="table62" style="width:'+width+'px" border="1">'+
      '<thead id="thead'+timeDatas+'" class="thead62">'+
      '<tr></tr>'+
      '</thead>'+
      '<tfoot></tfoot>'+
      '<tbody id="tbody'+timeDatas+'" class="tbody62"></tbody>'+
      '</table>';
      $(div).html(new62);
      $(div).css('overflow','hidden');
    }
    doint();
    function update(raw_data){
      var columns = raw_data.columns;
      var data = raw_data.data;
      for(var i=0;i<columns.length;i++){
          var thead62 = '<th>'+columns[i]+'</th>';
          $('#thead'+timeDatas+'>tr').append(thead62);
      }
      for(var j=1;j<data.length;j++){
          var tr62 = '<tr id="tr62_'+j+'"></tr>';
          $('#tbody'+timeDatas).append(tr62);
          for(var k=0;k<data[j].length;k++){
              var tbody62 = '<td width="'+data[0][k]+'">'+data[j][k]+'</td>';
              $('#tbody'+timeDatas+'>#tr62_'+j).append(tbody62);
          }
      }
    }
}
