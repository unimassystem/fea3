/*构建htmldom*/
function draw316(myChart,ckey,height,titles,x,y,width,div){

  option = {
    // backgroundColor: '#000',
    globe: {
        baseTexture: '../images/logo/data-1491890179041-Hkj-elqpe.jpg',
        heightTexture: '../images/logo/data-1491889019097-rJQYikcpl.jpg',

        displacementScale: 0.1,

        shading: 'lambert',

        environment: '../images/logo/data-1491837999815-H1_44Qtal.jpg',

        light: {
            ambient: {
                intensity: 0.1
            },
            main: {
                intensity: 1.5
            }
        },

        layers: [{
            type: 'blend',
            blendTo: 'emission',
            texture: '../images/logo/data-1491890291849-rJ2uee5ag.jpg'
        }, {
            type: 'overlay',
            texture: '../images/logo/data-1491890092270-BJEhJg96l.png',
            shading: 'lambert',
            distance: 5
        }]
    },
    series: []
}
  // myChart.setOption(option);
  getData(myChart,ckey,div);
  function getData(myChart,ckey,div){
      $.ajax({
          type : 'get',
          url:'/db/jsonp/ssdb0/'+ckey,
          cache : false,
          dataType : 'jsonp',
          //async : false,
          success:function (dataAll){
              // console.info(dataAll);
              // var data=dataAll.data;

              myChart.setOption(option);
          }
      });
    }
}
