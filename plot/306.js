function draw306(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用306.js');
   
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){ 
            // console.log(dataAll);
            var data = dataAll.data[0];

            var new306 = '<div class="box306" style="width:'+width+'px;">'+data[0]+'</div>';
            $(div).html(new306);   
        },
        error:function(erroor){
            console.log(error);
        } 
    });

}    