function draw308(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用308.js');
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
            var new308 = '<table class="table308" style="width:'+width+'px" border="1">'+
                            '<thead id="thead'+timeDatas+'" class="thead308">'+
                                '<tr></tr>'+
                            '</thead>'+
                            '<tfoot></tfoot>'+
                            '<tbody id="tbody'+timeDatas+'" class="tbody308"></tbody>'+
                        '</table>';
            $(div).html(new308);
            $(div).css('overflow','hidden');
            for(var i=0;i<columns.length;i++){
                var thead308 = '<th>'+columns[i]+'</th>';
                $('#thead'+timeDatas+'>tr').append(thead308);
            }
            for(var j=0;j<data.length;j++){
                var tr308 = '<tr id="tr308_'+j+'"></tr>';
                $('#tbody'+timeDatas).append(tr308);
                for(var k=0;k<data[j].length;k++){
                    var tbody308 = '<td>'+data[j][k]+'</td>';
                    $('#tbody'+timeDatas+'>#tr308_'+j).append(tbody308);
                }
            }
        },
        error:function(erroor){
            console.log(error);
        } 
    });

}    