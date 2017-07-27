function drawrouteMap(myChart,ckey,height,titles,x,y,width,div){
    var timeDatas = new Date().getTime();
    var map_div=$('<div id="container'+timeDatas+'" style="height:100%;width:100%;"></div>');
    div.html(map_div);
    // var map = new BMap.Map("container");
    $.ajax({
        type : 'get',
        url:'/db/jsonp/ssdb0/'+ckey,
        cache : false,
        async:false,
        dataType : 'jsonp',
        success:function(res){
           // console.info(res);
            localStorage.res=JSON.stringify(res);
        }
    });
    var initALL=JSON.parse(localStorage.res);//所有的值
    var initLength=initALL.data.length;//数据的长度
    var initData=initALL.data;
    //console.info(initData[0][1],initData[0][2]);
            //---获取每辆车的数据
    var everyCar={};
    $.each(initData||[],function(k,value){
        var v1=value[0];
        everyCar[v1]?(everyCar[v1].carp.push(value)):everyCar[v1]={carp:[value]};
    });
    //console.info(everyCar);
    var len=Object.getOwnPropertyNames(everyCar).length//车辆总数

    //---将每辆车经过的点存到一个数组里，n辆车n个不同的数据(先一辆车)
    var e_carp_listArr=[],list=[];;
    $.each(everyCar,function(k,v){
        list=[];
        var e_carp=v.carp;
        for (var i = 0; i < e_carp.length; i++) {
            var p=new BMap.Point(e_carp[i][1],e_carp[i][2]);
            list.push(p);
        };
        e_carp_listArr.push(list);
    });

    //---初始化地图
    var map=new BMap.Map('container'+timeDatas);
    map.centerAndZoom(new BMap.Point(initData[0][1], initData[0][2]),5);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    var  mapStyle ={
        features: ["road", "building","water","land"],//隐藏地图上的poi
        style : "dark"  //设置地图风格为高端黑
    }
    map.setMapStyle(mapStyle);
    function showPoly(e_carp_listArr,map){
   // console.info(e_carp_listArr[0]);
        for (var i = 0; i < e_carp_listArr.length; i++) {
            var list=e_carp_listArr[i];
            //循环显示点对象
            /*for (var j = 0; j < list.length; j++) {
               var marker = new BMap.Marker(list[j]);
               map.addOverlay(marker);
            }*/
            //因为途径点<=10,所以得分组
            var group=Math.floor(list.length/11);
            var mode=list.length%11;
           // console.info( mode);

            var driving=new BMap.DrivingRoute(map,{onSearchComplete:function (results) {
                if (driving.getStatus()==BMAP_STATUS_SUCCESS) {
                    var plan=driving.getResults().getPlan(0);
                    var  num = plan.getNumRoutes();
                   // console.info("plan.num ："+num);
                    for (var j = 0; j < num; j++) {
                        var pts= plan.getRoute(j).getPath();    //通过驾车实例，获得一系列点的数组
                        var polyline = new BMap.Polyline(pts,{strokeColor:"red", strokeWeight:2, strokeOpacity:0.7});
                        map.addOverlay(polyline);
                    }
                }
            }});

            for(var j =0;j<group;j++){
               var waypoints = list.slice(j*11+1,(j+1)*11);
               driving.search(list[j*11], list[(j+1)*11],{waypoints:waypoints});//waypoints表示途经点
            }
            if( mode != 0){
                var waypoints = list.slice(group*11,list.length-1);//多出的一段单独进行search
                driving.search(list[group*11],list[list.length-1],{waypoints:waypoints});
            }
        }
    };
    showPoly(e_carp_listArr,map);
}
//---绘制路线
