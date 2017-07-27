function draw49(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
  if(legends == 'left'){
    var legendss=true;
    var orients='vertical';
    var lefts='left';
    var tops='top';
  }
  if(legends == 'right'){
    var legendss=true;
    var orients='vertical';
    var lefts='right';
    var tops='top';
  }
  if(legends == 'top'){
    var legendss=true;
    var orients='horizontal';
    var lefts='center';
    var tops='top';
  }
  if(legends == 'bottom'){
    var legendss=true;
    var orients='horizontal';
    var lefts='center';
    var tops='bottom';
  }
  if(legends == 'false'){
    var legendss=false;
    var orients='horizontal';
    var lefts='center';
    var tops='bottom';
  }
    option={
        // backgroundColor:e_back_color,
        color:e_angle_colors,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip:{
            trigger:'axis'
        },
        animation: false,
        legend: {
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,
             textStyle:e_legend_textstyle,
            data:[]
        },
        xAxis: {
            name:xname,
            nameTextStyle:e_bar_textstyle,
            type: 'category',
            splitLine:{
                show:false
            },
            data: [],
            axisLine:{
                onZero:false
            },
            // silent: false,
            axisLine: {onZero: true},
            // splitLine: {show: false},
            // splitArea: {show: false},
            axisLabel:{textStyle:e_bar_textstyle}
        },
        yAxis: {
            // name:yname,
            nameTextStyle:e_bar_textstyle,
            splitLine:{
                show:false
            },
            // inverse: true,
            // splitArea: {show: false},
            type: 'value',
            axisLabel:{textStyle:e_bar_textstyle},
            // axisTick:{show:false}
        },
        dataZoom: [{
            type: 'inside'
        }],
        series: []
    };
    getData(myChart,ckey);
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
              //  console.info(dataAll);

               var data=dataAll.data;
               var columns=dataAll.columns;
               var index=dataAll.index;
              //  var xname=columns[0];
               if(columns[columns.length-1] != 'target'){
               var s_today=[],s_yes=[],x_today=[],x_yes=[],x_name=[],str=[];
               for (var i = 0; i < data.length; i++) {
                   s_today.push(data[i][0]);
                   x_today.push(-data[i][1]);
                   s_yes.push(data[i][2]);
                   x_yes.push(-data[i][3]);
                  //  x_name.push(data[i][0]);
               }

               for (var i = 1; i < columns.length; i++) {
                  if(i=0){
                    var o1={
                      name:columns[i],
                      type:'bar',
                       stack: 'one',
                      data:s_today,
                    }
                  }
                  if(i=1){
                    var o2={
                      name:columns[i],
                      type:'bar',
                       stack: 'one',
                      data:x_today,
                    }
                  }
                  if(i=2){
                    var o3={
                      name:columns[i],
                      type:'bar',
                       stack: 'one',
                      data:s_yes,
                    }
                  }
                  if(i=3){
                    var o4={
                      name:columns[i],
                      type:'bar',
                       stack: 'one',
                      data:x_yes,
                    }
                  }
                  str.push(o1);
                  str.push(o2);
                  str.push(o3);
                  str.push(o4);

               }

               option.series=str;
                option.xAxis.data=index;
                option.xAxis.name=xname;
                myChart.setOption(option,true);
            }
          }
        });
    }
};
