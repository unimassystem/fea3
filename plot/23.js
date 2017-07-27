function draw23(myChart,ckey,height,titles,xname,yname,width,div,border,zindex,legends) {
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
    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            success:function(dataAll){
                // console.info(dataAll);
                var index=dataAll.index;
                var data=dataAll.data;
                var columns=dataAll.columns;
                var dataAll2 = dataAll;//在复制一个dataAll
                var index2=dataAll2.index;
                var data2=dataAll2.data;
                var columns2=dataAll2.columns;
                var seriesObj=[];
                // console.log(data[1]);
                var radius=[['0','30%'],['40%','55%']];

                var oArr1=[];
                var oArr2=[];
                var oArr3=[oArr1,oArr2];
                var oArr6 = [];
                var oArr7 = new Array();
                for(var i = 0;i < columns.length-1;i++){
                    for (var j = 0; j < data.length; j++) {
                        var o={
                            value:data[j][2],
                            name:data[j][i]
                        }
                        oArr3[i].push(o);
                        if(i == 0){
                            oArr7.push(o);
                        }

                    }
                    // console.log(oArr7);
                }
                // console.log(oArr1);
                for(i=0;i<oArr1.length;i++){
                    var values = 0;
                    var names = '空';
                    if(oArr7[i] == ''){
                        // console.log('空');
                    }else{
                        for(j=0;j<oArr7.length;j++){
                            if(oArr1[i].name==oArr7[j].name){
                                values = values+oArr1[j].value;
                                names = oArr1[j].name;
                                oArr7[j] = '';
                            }else{}
                        }
                        ass = {
                            value:values,
                            name:names
                        }
                        oArr6.push(ass);
                    }
                }
                // console.log(oArr6);

                    seriesObj=[
                        {
                            name:columns[0],
                            type: 'pie',
                            radius : radius[0],
                            center: ['50%', '60%'],
                            data:oArr6,
                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            itemStyle: {
                                normal:{
                                    label:{
                                        show:false,
                                        position: 'outside',
                                        formatter:"{b} : \n{c} \n({d}%)"
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 1.5)'
                                }
                            }
                        },
                        {
                            name:columns[1],
                            type: 'pie',
                            radius : radius[1],
                            center: ['50%', '60%'],
                            data:oArr2,
                            itemStyle: {
                                normal:{
                                    label:{
                                        show:true,
                                        position: 'outside',
                                        formatter:"{b} : {c} ({d}%)"
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ];
                //console.info(oArr);
                var dataName = [];
                for(i=0;i<data.length;i++){
                    // console.log(data[i][1]);
                    dataName.push(data[i][0]);
                    dataName.push(data[i][1]);
                }
                // console.log(dataName);
                /* 数组去重 开始 */
                Array.prototype.unique3 = function(){
                    var res = [];
                    var json = {};
                    for(var i = 0; i < this.length; i++){
                        if(!json[this[i]]){
                            res.push(this[i]);
                            json[this[i]] = 1;
                        }
                    }
                    return res;
                }
                /* 数组去重 结束 */
                dataName = dataName.unique3();
                // console.log(dataName);

                option.legend.data=dataName;
                option.series=seriesObj;
                myChart.setOption(option);
            },
            error:function(error){
                console.log(error);
            }
        });
    }
    getData(myChart,ckey,div);
}
