function draw64(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
            // console.log(dataAll);
            var m=dataAll.data[0];
            var r='<div class="move_rotate_64">'+
                  '<img class="rotate_64" src="../images/64_rotate/rotate_mother.png">'+
                  '<div class="move_rotate_64_center">'+
                  '</div>'+
                  '</div>'
            div.children('div[class="move_rotate_64"]').remove();
            div.prepend(r)

            if(m==7||m==6||m==5||m==4||m==3||m==2||m==1||m==0){
              $('.rotate_64').attr('src','../images/64_rotate/rotate_'+m+'.png')
            }
            else{
              $('.rotate_64').attr('src','../images/64_rotate/rotate_mother.png')
            }

        },
        error:function(erroor){
            console.log(error);
        }
    });

}
