function draw307(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用307.js');
   
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){ 
            // console.log(dataAll);
            var data = dataAll.data[0];

            var new307 = '<div class="box307" style="width:'+width+'px;">'+data[0]+'</div>';
            $(div).html(new307);   
        },
        error:function(erroor){
            console.log(error);
        } 
    });

}    