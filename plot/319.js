/*构建htmldom*/
function draw319(myChart,ckey,height,titles,x,y,width,div){
    // var txt_div='<div id="txt_info">\
    //             <ul class="list-unstyled" ></ul>\
    //         </div>';
    // div.html(txt_div);
    // div.find("#txt_info").css('width',width);
    // div.find("#txt_info").css('height',height);
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        dataType : 'jsonp',
        success:function(dataAll){
            var datas=dataAll.data;
            var datass=datas[0]
            setInterval(function(){
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hours = date.getHours();
                var Minutes = date.getMinutes();
                var Seconds = date.getSeconds();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                if (Minutes >= 0 && Minutes <= 9) {
                    Minutes = "0" + Minutes;
                }
                if (Seconds >= 0 && Seconds <= 9) {
                    Seconds = "0" + Seconds;
                }

                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + hours + seperator2 + Minutes
                        + seperator2 + Seconds;
                var divs='<span style="font-size:'+datass[0]+'px;color:'+datass[1]+'">'+currentdate+'</span>'
                div.children('div:first').children('span').remove();
                div.children('div:first').append(divs)
            },1000)
        }
    });
}
   /* src="../images/test3and4_IM_icon_.png"
*/
