function draw63(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        dataType : 'jsonp',
        success:function(dataAll){
          var data=dataAll.data[0];
          var dbdk=data[0];
          var cs=data[1];
          var d2=data[2];
          if (dbdk.indexOf("dashboard2")!=-1) {
            var src_63='dbd2_view.fh5?key='+dbdk+'&'+cs+'&d2title='+d2;
          }else if(dbdk.indexOf("dashboard")!=-1){
            var src_63='dbd_view.fh5?key='+dbdk+'&dtitle='+d2;
          }else if(dbdk.indexOf("dp")!=-1){
            var src_63='more_view.fh5?key='+dbdk+'&'+cs+'&mtitle='+d2;
          }else if(dbdk.indexOf("am")!=-1){
            var src_63='am_run.fh5?key='+dbdk+'&dtitle='+d2;
          }
          var div1='<div><iframe frameborder="0" scrolling="no" height="100%" width="100%" src="'+src_63+'"></iframe></div>'
          div.html(div1);
        },
        error:function(erroor){
            console.log(error);
        }
    });

}
