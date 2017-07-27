function draw17(myChart,ckey,height,titles,xname,yname,width,div) {
    option = {
        // backgroundColor:e_back_color,
        color:e_sankey_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'3%'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        animation: false,
        series: [
            {
                type: 'sankey',
                layout: 'none',
                data:[],
                links:[] ,
                top:'10%',
                label:e_sankey_label,
                itemStyle:e_sankey_item,
                lineStyle:e_sankey_line
            }
        ]
    };
    getData(myChart,ckey,div);
    function getData(myChart,ckey,div){
        $.ajax({
            type : 'get',
            url:'/db/jsonp/ssdb0/'+ckey,
            cache : false,
            dataType : 'jsonp',
            //async : false,
            success:function (dataAll){
               // var dataAll=eval("(" + dataAll + ")");
                var data=dataAll.data[0][0];
                data = JSON.parse(data);
                var nodesOld=data.nodes;
                var nodesNew=[];
                option.series[0].data=nodesOld;
                option.series[0].links=data.links;
                myChart.setOption(option);
            }
        });
    };

};
