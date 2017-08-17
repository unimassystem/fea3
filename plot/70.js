function draw70(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var m=dataAll.data[0];
            
            var move='<div class="transform_outside_70">'+
                        '<div class="move3_outside1_70">'+
                            '<div class="move3_outside2_70">'+
                                '<div class="move3_center_70"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'

            div.html(move)

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
