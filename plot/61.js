function draw61(myChart,ckey,height,titles,x,y,width,div){
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
            var new61 = '<table class="table61" style="width:'+width+'px" border="1">'+
                            '<thead id="thead'+timeDatas+'" class="thead61">'+
                                '<tr></tr>'+
                            '</thead>'+
                            '<tfoot></tfoot>'+
                            '<tbody id="tbody'+timeDatas+'" class="tbody61"></tbody>'+
                        '</table>';
            $(div).html(new61);
            $(div).css('overflow','hidden');
            for(var i=0;i<columns.length;i++){
                var thead61 = '<th>'+columns[i]+'</th>';
                $('#thead'+timeDatas+'>tr').append(thead61);
            }
            for(var j=1;j<data.length;j++){
                var tr61 = '<tr id="tr61_'+j+'"></tr>';
                $('#tbody'+timeDatas).append(tr61);
                for(var k=0;k<data[j].length;k++){
                    var tbody61 = '<td width="'+data[0][k]+'">'+data[j][k]+'</td>';
                    $('#tbody'+timeDatas+'>#tr61_'+j).append(tbody61);
                }
            }
        },
        error:function(erroor){
            console.log(error);
        }
    });

}
