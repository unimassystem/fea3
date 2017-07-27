function draw50(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    option = {
        // backgroundColor:e_back_color,
        color:e_angle_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid:{
            bottom:'10px'
        },
        legend: {
          show:legendss,
          orient:orients,
          top:tops,
          left:lefts,
            textStyle:e_legend_textstyle,
            data:[]
        },
        series : []
    };
    getData(myChart,ckey);
    function getData(myChart,ckey){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            success:function(dataAll){
              //console.info(dataAll);
              var index=dataAll.index;
              var data=dataAll.data;
              var name=dataAll.columns;
              var lenth=name.length;
              var cutLen;
              if (name[lenth-1].indexOf('target')==-1) {
                  cutLen=lenth;
              }else{
                  cutLen=lenth-3;
              }
              var seriesObj=[],inx=[];
              var center;
              for (var i = 0; i < index.length; i++) {
                 inx.push(index[i].toString());
              }
              for (var i = 0; i < cutLen; i++) {
                  var oArr=[];
                  for (var j = 0; j < data.length; j++) {
                      var o={
                          name:inx[j],
                          value:data[j][i],
                      }
                      oArr.push(o);
                  }
                  if(cutLen==1){
                      center=['50%','60%'];

                  }else if(cutLen>=2){
                      center=[((i*50)+25)+'%','60%'];
                  }
                  var o={
                    name:name[i],
                    type:'pie',
                    radius:['50%','70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                          show: true,
                          position: 'outside',
                          formatter:'{b}: {d}%'
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: true
                      }
                    },
                    data:oArr
                  }
                  seriesObj.push(o);
              }
              //console.info(oArr);
              option.legend.data=inx;
              option.series=seriesObj;
              myChart.setOption(option);
              myChart.on('click', function (params) {
                 //console.info(params);
                 var city_idx = params.dataIndex;
                 var city_name=params.name;
                 var p=$(this)[0]._dom;//div

                 var data=dataAll.data;
                 var idx=dataAll.index;
                 //console.info(data);
                 var target=data[0][data[0].length-1];
                 for (var i = 0; i < data.length; i++) {
                     var len=data[i].length;
                     if(city_name==idx[i]){
                         //console.info(city_idx,data[i][0]);
                         var dbdK=data[i][len-3];
                         var cs=data[i][len-2];
                         targetC(p,target,dbdK,cs);
                         return true;
                     }
                 }
               });
          }
      });
  }
  }
