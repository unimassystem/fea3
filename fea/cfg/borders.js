
//----门户页面的每个图表的边框
function getBorder(type){
    var shuzhi  = parseInt(type);
    var noBorders = [8,10,13,18,24,46];//无边框图形
    if(shuzhi > 300){
        return 'no_border';
    }else if($.inArray(shuzhi,noBorders) != -1){
        return 'no_border';
    }else{
        return 'plot_border';
    }
}
