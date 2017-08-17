function draw68(myChart,ckey,height,titles,x,y,width,div){
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
            var new68 = '<div class="divta_68" style="width:'+width+'px">'+titles+'</div><table class="table68" style="width:'+width+'px" border="1">'+
                            '<thead id="thead'+timeDatas+'" class="thead68">'+
                                '<tr></tr>'+
                            '</thead>'+
                            '<tfoot></tfoot>'+
                            '<tbody id="tbody'+timeDatas+'" class="tbody68"></tbody>'+
                        '</table>';
            $(div).html(new68);
            $(div).css('overflow','hidden');
            for(var i=0;i<columns.length;i++){
                var thead68 = '<th>'+columns[i]+'</th>';
                $('#thead'+timeDatas+'>tr').append(thead68);
            }
            for(var j=1;j<data.length;j++){
                var tr68 = '<tr id="tr68_'+j+'"></tr>';
                $('#tbody'+timeDatas).append(tr68);
                for(var k=0;k<data[j].length;k++){
                    var tbody68 = '<td width="'+data[0][k]+'">'+data[j][k]+'</td>';
                    $('#tbody'+timeDatas+'>#tr68_'+j).append(tbody68);
                }
            }
        },
        error:function(erroor){
            console.log(error);
        }
    });

}
