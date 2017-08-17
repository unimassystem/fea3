function draw15(myChart,ckey,height,titles,xname,yname,width,div){
    option = {
        // backgroundColor:e_back_color,
        color:e_gCircle_color,
        title:{
            text:titles,
            textStyle:e_title_textstyle,
            left:'center',
            top:'2%'
        },
        //tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                //name: 'Les Miserables',
                type: 'graph',
                layout: 'force',
                //symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show:true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                width:2,
                height:2,
                roam: true,
                lineStyle: {
                    normal:e_forceline_normal,
                    emphasis:e_forceline_emphasis
                }
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
                //console.info(dataAll);
                var data=dataAll.data[0][0];
                data = JSON.parse(data);
                var nodesOld=data.nodes;
                var nodesNew=[],linksNew=[];
                var categories = [];
                for (var i = 0; i < 6; i++) {
                    categories[i] = {
                        name: '类目' + i
                    };
                }
                data.nodes.forEach(function (node) {
                    node.value = node.size;
                    node.name=node.label;
                    //node.x=node.y=null;
                    node.symbolSize = node.size;
                    node.draggable=true;
                });

                option.series[0].categories=categories;
                option.series[0].data=data.nodes;
                option.series[0].links=data.links;
                myChart.setOption(option);
            }
        });
        myChart.on('click', function (params) {
            //console.info(params);
            var p=$(this)[0]._dom;
            var name=params.name;
            var pdata=params.data;//x=cs;y=top/up..;color=pageid
            var cs=pdata.x;
            var target=pdata.y;
            var dbdK=pdata.color;
            if (name==pdata.label) {
               // console.info(p,target,dbdK,cs);
               targetC(p,target,dbdK,cs);
                return true;
            }
        });
    };
};
