function draw44(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用44.js');
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){ 
            // console.log(dataAll);
            var columns = dataAll.columns; 
            var data = dataAll.data;
            // console.log(columns);
            // console.log(data);
            var new44 = '<table class="table44" style="width:'+width+'px" border="1">'+
                            '<thead id="thead'+timeDatas+'" class="thead44">'+
                                '<tr></tr>'+
                            '</thead>'+
                            '<tfoot></tfoot>'+
                            '<tbody id="tbody'+timeDatas+'" class="tbody44"></tbody>'+
                        '</table>';
            $(div).html(new44);
            $(div).css('overflow','hidden');
            for(var i=0;i<columns.length;i++){
                var thead44 = '<th>'+columns[i]+'</th>';
                $('#thead'+timeDatas+'>tr').append(thead44);
            }
            for(var j=1;j<data.length;j++){
                var tr44 = '<tr id="tr44_'+j+'"></tr>';
                $('#tbody'+timeDatas).append(tr44);
                for(var k=0;k<data[j].length;k++){
                    var tbody44 = '<td width="'+data[0][k]+'">'+data[j][k]+'</td>';
                    $('#tbody'+timeDatas+'>#tr44_'+j).append(tbody44);
                }
            }
        },
        error:function(erroor){
            console.log(error);
        } 
    });

}    