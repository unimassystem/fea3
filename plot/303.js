function draw303(myChart,ckey,height,titles,x,y,width,div){
    // console.log('调用303.js');
   
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){ 
            // console.log(dataAll);
            var index = dataAll.index[0]; 
            var data = dataAll.data[0];

            var new303 = '<div class="box303" style="width:'+width+'px;">'+
                    '<div class="box303-title">'+index+'</div>'+
                    '<div class="box303-main">'+data+'</div>'+
                '</div>';
            $(div).html(new303);   
        },
        error:function(erroor){
            console.log(error);
        } 
    });

}    