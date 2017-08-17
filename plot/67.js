function draw67(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
         var r='<div class="move_67">'+
                    '<span class="move_67_p">'+
                    '</span>'+
                '</div>'
            div.html(r)

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
