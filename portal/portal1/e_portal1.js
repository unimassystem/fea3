
//---标题文字样式---
var e_title_textstyle={
    color:'#666',
    fontSize:16,
    fontWeight:'normal'
};
var e_301normal={
    areaColor:'#2d2c32',
    borderColor:'#4e4d55'
};
//26横向堆积色组
//var e_26angle_color=['rgba(195,195,195,.6)','rgba(0,92,139,0.8)','rgba(0,255,234,.5)','rgba(150,3,3,.7)'];
//26横向堆积渐变色组
var e_26Gradient_0=['rgba(0,136,172,1)','rgba(195,195,195,1)','red','yellow','blue','gray','#999','#666','#ccc','#333'];
var e_26Gradient_1=['rgba(0,136,172,0)','rgba(195,195,195,0)','red','yellow','blue','gray','#999','#666','#ccc','#333'];
//326map color
var e_326_mapcolor='#414141';
var e_326_maphovercolor='#636363';
var e_326_mapbordercolor='#c3c3c3';
var e_326_arrowcolor='#00c0f3';

//---图例文字样式---
var e_legend_textstyle={
    color:'#666',
    fontSize:12
};
//38js流数据多线波浪图区域渐变
var e_38areacolor_0=['rgba(255,102,102,1)','rgba(21,191,129,1)','rgba(255,102,102,1)','rgba(21,191,129,1)'];
var e_38areacolor_1=['rgba(255,102,102,0.3)','rgba(21,191,129,0)','rgba(255,102,102,1)','rgba(21,191,129,1)'];

// 背景图颜色样式
var e_back_color='rgba(38,137,175,0)';

// 直角系以及饼图颜色循环
var e_angle_color=['#ff4e00','#0bbaf4','#f4cb0b','#3751a7','#22de0f','#db0bf4'];
var e_angle_colors=['#8eb82b','#ff7417','#bdbdbd','#bdbdbd'];
//53柱线图线的颜色
var e_zxt_linecolor='#ccc';
/*02柱状图渐变颜色*/
var e_zzt_jb_0=['rgba(0,136,172,1)','red','blue','yellow','red','blue','yellow'];
var e_zzt_jb_1=['rgba(0,149,149,0.03)','blue','yellow','red','blue','yellow','red'];
var e_barwidth='30%';
/*21柱状图渐变颜色*/
var e_zzt_jbh_0=['rgba(0,149,149,0.03)','rgba(99,99,99,.1)','rgba(195,195,195,.1)','blue','yellow','blue','yellow'];
var e_zzt_jbh_1=['rgba(0,136,172,1)','rgba(99,99,99,1)','rgba(195,195,195,1)','red','blue','blue','yellow'];

/*-------------------------------------------折线图----------------------------------*/
/*var e_line_linecolor=['#e9dd06','#00f3fc','#4249ca']
;
此颜色配置不包含图例颜色，因此会导致图例和线条显色不对应的问题出现*/

//折线图平均线
var e_markline_data=[
    /*{type : 'average', name: '平均值'}*///（显示：把{type : 'average', name: '平均值'}加上）（不显示：把{type : 'average', name: '平均值'}去掉，但是要保留[]）
];

//全局折线图颜色
var e_lineglobal_color=['red','blue','#ccc'];

//---折线图(坐标轴)文字样式
var e_line_textstyle={
	color:'#666',
	fontSize:12
};


//线条是否平滑
var e_line_smooth=true;//true代表线条平滑，false代表线条尖锐
//--------------------------面积图--------------------------
//面积图全局颜色
var e_areaglobal_color=['#e9dd06','#00f3fc','#4249ca','#e9dd06','#00f3fc','#4249ca'];
//面积图面积颜色在 0 处时的颜色
var e_areastyle_0color=['#e9dd06','#00f3fc','#4249ca','#e9dd06','#00f3fc','#4249ca'];

//面积图面积颜色在 1 处时的颜色
var e_areastyle_1color=['#e9dd06','#00f3fc','#4249ca','#e9dd06','#00f3fc','#4249ca'];

//新增面积图线条颜色
var e_arealine_color=['#e9dd06','#00f3fc','#4249ca','#e9dd06','#00f3fc','#4249ca'];

//-------------------------多颜色单数据柱状图-----------------------
var e_itemnormal_color=['#00f3fc','#e9dd06','#4249ca','#00f3fc','#e9dd06','#4249ca','#e9dd06','#4249ca','#00f3fc','#e9dd06','#4249ca'];

//---柱状图(坐标轴)文字样式
var e_bar_textstyle={
	color:'#666',
	fontSize:12
};


/*阴影内外环*/
//-----饼图内外环
//饼图图例是否显示
var e_pie_nw_show=false;
//----图形阴影的模糊大小,1是内环，2是外环
var e_pie_shadowBlur_1=6;
var e_pie_shadowBlur_2=10;
//----阴影水平方向上的偏移距离
var e_pie_shadowOffsetX_1=3;
var e_pie_shadowOffsetX_2=10;
//----阴影垂直方向上的偏移距离
var e_pie_shadowOffsetY_1=6;
var e_pie_shadowOffsetY_2=10;
//----阴影颜色
var e_pie_shadowColor_1='rgba(14,48,67,1)';
var e_pie_shadowColor_2='rgba(14,48,67,1)';

//----------默认饼图外环----------
var e_pie_mr_shadowBlur_1=6;
var e_pie_mr_shadowBlur_2=1;
//----阴影水平方向上的偏移距离
var e_pie_mr_shadowOffsetX_1=3;
var e_pie_mr_shadowOffsetX_2=2;
//----阴影垂直方向上的偏移距离
var e_pie_mr_shadowOffsetY_1=6;
var e_pie_mr_shadowOffsetY_2=2;
//----阴影颜色
var e_pie_mr_shadowColor_1='rgba(122,122,122,1)';
var e_pie_mr_shadowColor_2='rgba(122,122,122,1)';




//----柱线图渐变颜色
var e_bar_color_jb1=['#f0ff00','#cf0000','#009d97','#86a8ff','#00ffe4','#4249ca','#e9dd06','#00f3fc','#4249ca','#e9dd06','#00f3fc','#4249ca'];  // 0% 处的颜色
var e_bar_color_jb2=['#00b7b5','#d4d100','#8b1899','#1a00b7','#aa2c0f','#ef1600','#00f3fc','#e9dd06','#ef1600','#00f3fc','#e9dd06','#ef1600']; // 100% 处的颜色

var e_line_zx_color='red';
//-----柱线图颜色
var e_bar_zx_shadowColor='#004490';//柱线图阴影颜色
//-----柱线图阴影的模糊大小
var e_bar_zx_shadowBlur=1;
//-----柱线图阴影水平方向上的偏移距离
var e_bar_zx_shadowOffsetX=3;

//----柱线图阴影垂直方向上的偏移距离
var e_bar_zx_shadowOffsetY=1;

//---散点图(坐标轴)文字样式
var e_scatter_textstyle={
	color:'#666',
	fontSize:12
};

//---堆积图(坐标轴)文字样式
var e_barstack_textstyle={
	color:'#666',
	fontSize:12
};

//-------------------------地图散点-----------------------------

var e_mapscatter_visul_color=['#ef1600','#e4d60e','#339ca8'];
var e_mapscatter_visul_textstyle={
	color:'#666',
	fontSize:12
};
//43地图散点排名图右侧top10，这个名字的样式
var e_43_barnamestyle={
    color:'#4d5f7a',
    fontWeight:'bold',
    fontSize:14,
   /* fontFamily:'sans-serif',
    fontStyle:'normal'*/
};
//43地图散点排名横柱旁边Y轴的字的样式
var e_43_barlabelstyle={
    color:'#4d5f7a',
    fontWeight:'bold',
    fontSize:14,
    /*fontFamily:'sans-serif',
    fontStyle:'normal'
    align:'left',
    baseline:'middle'*/
};
//---地图散点·地图颜色·正常状态---
var e_mapscatter_geo_itemnormal={
	areaColor: '#a6d8c0',//块背景
    borderColor: '#f0f0f0'//区域边线
};
//---地图散点·地图颜色·鼠标放置---
var e_mapscatter_geo_itememphasis={
	label:{show:true},
    areaColor:'#7bbb9b',
    borderColor:'#0d8447',
    borderWidth:1
};
//43地图散点圆点的阴影
var e_43portal1_1_dot={
    shadowBlur:5,
    shadowColor:'#414141',
    shadowOffsetY:1,
    shadowOffsetX:1,
};
//---地图散点·点颜色·鼠标放置---
var e_mapscatter_scatter_itememphasis={
	borderColor: '#fff',
    borderWidth: 1
};

//-------------------------地图-----------------------------

var e_map_visul_color=['#ef1600','#e4d60e','#339ca8'];
var e_map_visul_textstyle={
	color:'#666',
	fontSize:12
};
//---地图·正常状态---
var e_map_itemnormal={
	label:{
		show:false,
		textStyle:{color:'#f0f0f0'}
	},//地名样式
	borderColor:'#24ab6a'
};
//---地图·鼠标放置---
var e_map_itememphasis={
	label:{show:true},
	borderColor:'#0d8447',
	borderWidth:1
};


//-------------------------热力图-----------------------

//---背景颜色---
var e_hot_back='rgba(38,137,175,0)';
//---坐标轴样式---
var e_hot_textstyle={
	color:'#666',
	fontSize:12
};
//---热力图映射---
var e_hot_visul_color=['#ef1600','#e4d60e','#339ca8'];

//-------------------------南丁格尔玫瑰图-----------------------

//---背景颜色---
var e_rose_back='rgba(0,0,0,0)';
//---块的颜色循环---
var e_rose_color=['#005eaa','#e6b600','#0098d9','#2b821d','#c12e34','#339ca8'];

//-------------------------迁徙图-----------------------
//地图·区域颜色
var e_maparea_color='#142136';
//地图·区域边框线颜色
var e_mapareaborder_color='#283a57';
//---背景颜色---
var e_mapline_back='rgba(0,0,0,0)';


//---327地图·正常状态---
var e_mapline_itemnormal='rgba(99,99,99,1)';
var e_mapline='#fff';
//地图·区域颜色
var e_maparea_color='#142136';
//地图·区域边框线颜色
var e_mapareaborder_color='#283a57';
//---地图·鼠标放置---
var e_mapline_itememphasis='#868686';
var e_map_shadowwidth=10;
var e_map_shadowcolor='#414141';
var e_map_shadowofsetx=10;
var e_map_shadowofsety=10;




//---地图·鼠标放置---
var e_mapline_itememphasis={
	areaColor: '#27c1b7'
};

//------------------------关系图---------------------

//---背景颜色---
var e_gCircle_back='rgba(0,0,0,0)';
//---圆形颜色---
var e_gCircle_color=['#11d3ee','#ff00f0','#24da00','#f19149',"#ef1600","#f37814","#72b2ee"];
//---圆形关系图线条初始样式---
var e_circlrline_normal={
	color: '#666',
    width:1,
    curveness: 0.3//线条弯曲的程度
};
//---力导向图线条初始样式---
var e_forceline_normal={
    color: '#666',
    width:1
};
//---自定义关系图线条初始样式---
var e_selfline_normal={
    color: '#666',
    width:1
};
//---线条·鼠标放上去·样式---
var e_circlrline_emphasis={
	color: 'red',
  	width:2,
    curveness: 0.3
};
//---线条·鼠标放上去·样式---
var e_forceline_emphasis={
    color: 'red',
    width:2
};
//---线条·鼠标放上去·样式---
var e_selfline_emphasis={
    color: 'red',
    width:2
};


//------------------------桑基图------------------------

//---背景颜色---
var e_sankey_back='rgba(38,137,175,0)';
//---块颜色循环---
var e_sankey_color=["#005db0","#fcce10","#11ddee","#fad860","#9bca63","#a0a7e6","#96dee8"];
//---标签样式---
var e_sankey_label={
	normal:{
        show:true,
        textStyle:{
        	color:'#666',
    		fontSize:12,
    		fontWeight:'normal'
        }
    },
    emphasis:{
    	show:true,
        textStyle:{
        	color:'#666',
    		fontSize:12,
    		fontWeight:'normal'
        }
    }
};
//---桑基图样式--
var e_sankey_item={
	normal: {
        borderWidth: 1,
        borderColor: '#aaa'
    },
    emphasis:{
    	borderWidth: 2,
        borderColor: '#aaa'
    }
};
//---桑基图·线样式--
var e_sankey_line={
	normal: {
        color: 'rgba(0,240,255,0.5)',
        curveness: 0.5
    },
    emphasis:{
    	color: 'rgba(0,240,255,0.5)',
        curveness: 0.5
    }
};

//---柱线图(坐标轴)---
var e_barline_textstyle={
	color:'#666',
	fontSize:12
};
//---柱线图柱线颜色---
var e_barline_color=["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee"];
var e_19_line_normal = {
    color: 'red'
};

//---面积图颜色---
var e_area_color=["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee"];
// ---面积图背景颜色---
var e_area_back='rgba(0,0,0,0)';
//---面积坐标轴颜色---
var e_area_textstyle={
	color:'#666',
	fontSize:12
};

//---横向柱状颜色---
var e_rowbar_color=["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee"];
//---横向柱状(坐标轴)文字样式
var e_rowbar_textstyle={
	color:'#666',
	fontSize:12
};

//----------------------------------地图热力散点----------------

//---背景颜色---
var e_maphotscatter_back='rgba(0,0,0,0)';
//---隐射颜色---
var e_maphotscatter_visulecolor=['#ef1600','#e4d60e','#339ca8'];
//---隐射字体样式
var e_maphotscatter_visuletextStyle={
    color:'#666'
};
//---点样式---
var e_maphotscatter_point={
	symbol:'pin',//点形状
    symbolSize :16,//点大小
    itemStyle:{
        normal:{
            color:'yellow',//初始点颜色
            label:{show:false}//是否显示标签
        },
        emphasis:{
	    	color:'yellow',//触发后颜色
            label:{show:false}//触发后是否显示标签
	    }
    }
};

//---内环图背景颜色---
var e_pies_back='rgba(0,0,0,0)';
//---内环图环颜色---
var e_pies_color=["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee",'#60c0dd','#d7504b','#c6e579','#26c0c0'];


//-----------------------24.js仪表盘------------------

//---坐标轴---
var e_gauge_linecolor={
    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
    width: 3,
    shadowColor : '#333', //默认透明
    shadowBlur: 1
};
var e_gauge_linecolor_left={
    color: [[0.29, '#ebebeb'],[0.72, '#636363'],[1, '#00c0f3']],
    width: 2,
    shadowColor : '#414141', //默认透明
    shadowBlur: 1,
    shadowOffsetY:2,
    shadowOffsetX:2
};
var e_gauge_linecolor_right={
    color: [[0.29, '#ebebeb'],[0.72, '#636363'],[1, '#00c0f3']],
    width: 2,
    shadowColor : '#414141', //默认透明
    shadowBlur: 1,
    shadowOffsetY:2,
    shadowOffsetX:2
};

//---坐标轴标签---
var e_gauge_linelabel={
    /*fontWeight: 'bolder',*/
    color: '#333',
    shadowColor : '#333', //默认透明
    shadowBlur: 1
};
//---坐标轴刻度---
var e_gauge_tick={            // 坐标轴小标记
    length :10,        // 属性length控制线长
    lineStyle: {       // 属性lineStyle控制线条样式
        color: 'auto',
        shadowColor : e_41_shadow_color, //默认透明
        shadowBlur: 10
    }
};
//--标题---
var e_gauge_title={
    offsetCenter: [0, '-25%'],
    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        fontWeight: 'bolder',
        fontSize: 20,
        fontStyle: 'italic',
        color: '#333',
        shadowColor : '#333', //默认透明
        shadowBlur: 10
    }
};
//--仪表盘详情---
var e_gauge_detail={
    shadowColor : e_41_shadow_color, //默认透明
    shadowBlur: 5,
    offsetCenter: [0, '30%'],       // x, y，单位px
    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        fontWeight: 'bolder',
        color: '#333'
    }
};
//---指针样式---
var e_41_itemstyle = {
    normal:{
        color: 'auto',//指针颜色，auto为指向区间的颜色
        borderColor: '#000',
        borderWidth: 0,
        borderType: 'solid',
        shadowBlur: 0,//阴影大小
        shadowColor: '#333',
    }
};
//----// 分隔线---长的---
var e_gauge_splitLine = {
    length :20,         // 属性length控制线长
    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
        width:3,
        color: '#333',
        shadowColor : '#333', //默认透明
        shadowBlur: 10
    }
};
var e_gauge_axisLabel = { //坐标轴小标记
    textStyle: {       // 属性lineStyle控制线条样式
        fontWeight: 'bolder',
        color: '#333',
        shadowColor : '#333', //默认透明
        shadowBlur: 10
    }
};

//---横向柱状堆积图·背景颜色
var e_rowbarstack_back='rgba(0,0,0,0)';
//---横向柱状堆积图(坐标轴)文字样式
var e_rowbarstack_textstyle={
	color:'#666',
	fontSize:12
};
//---横向柱状堆积图·柱子样式
var e_rowbarstack_color=["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee"];

//面积堆积图背景颜色
var e_areastack_back='rgba(0,0,0,0)';
//---面积图堆积图颜色---
var e_areastack_color=["#5db51d","#e4dc0e","#ef1600","#f37814","#72b2ee"];
//---面积堆积图坐标轴颜色---
var e_areastack_textstyle={
	color:'#666',
	fontSize:12
};

//---K线图(坐标轴)文字样式
var e_k_textstyle={
    color:'#666',
    fontSize:12
};


//----门户页面的每个图表的边框
function getBorder(type){
    var shuzhi  = parseInt(type);
    var noBorders = [8,10,13,18,24];//无边框图形
    if(shuzhi > 300){
        return 'no_border';
    }else if($.inArray(shuzhi,noBorders) != -1){
        return 'no_border';
    }else{
        return 'plot_border';
    }
}

//---雷达图---------------
//雷达图的指示器名字的颜色
var e_radername_color='rgb(238, 197, 102)';
//坐标轴区域中的分隔线的颜色
var e_splitline_color=[
    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
].reverse();
//坐标轴线线的颜色
var e_axisline_color='rgba(238, 197, 102, 0.5)';
//图形的颜色
var e_itemstylenormal_color=['#c00000','#719014','#ffc000','#ed7d31','#c00000','#719014','#ffc000','#719014'];//前4个值没用但是要放着

//----------------------------------41.js 三个仪表盘的样式-----------------------------
//字体样式
var e_41_font_color = '#000';
//阴影
var e_41_shadow_color = '#000';
//line 线
var e_41_line_color = '#000';

/*/----------------------19.js柱状图网格辅助线----------------------------/*/
var e_19_splitLine = {
  show:false
};
