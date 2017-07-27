$(document).ready(function(){
    function check_portal(){
        $("#mh_list li").remove();
        $.getJSON("../portal/portal.json",function(data){
            $.each(data,function(name,value){
                //console.info(name);
                var div='<li data-id="'+name+'"><a href="#">'+value+'</a></li>';
                $("#mh_list").append(div);
            })
        });
    };
    check_portal();

    var tbody=$("#useManage tbody");
    var user=$("#useManage tbody tr");
    var newTr=$("#useModal");
    //var userName=$.cookie('userName');
    var language = {
        "emptyTable" : "表中数据为空",
        'search':'搜索',
        "paginate" : {
            "first" : "首页",
            "previous" : "上页",
            "next" : "下页",
            "last" : "末页"
        }
    };
    var mgr=$("#useManage").DataTable({
        'searching':true,
        'language':language,
        'lengthChange': false,
        'ordering':true,
        'info':false,
        "columns": [
            { "title": "应用ID"},
            { "title": "中文名称"},
            { "title": "导航" },
            { "title": "门户" },
            { "title": "logo" },
            { "title": "创建者" },
            { "title": "轮播时间" },
            { "title": "门户背景" },
            { "title": "图表方案" },
            { "title": "操作" },
          ],
        "columnDefs": [
            {
              "data": null,
              "width":"18%",
              "defaultContent": '<button class="edit btn btn-info">编辑</button><button class="del btn btn-danger">删除</button>',
              "targets":-1
            }
          ],
        "ajax": {
            url: '/db/scan/ssdb0/use:/use:~/200',
            'dataType':'jsonp',
            'dataSrc':function(res){
                // console.info(res);
                var allData=[];
                $.each(res,function(name,value){
                    for(i in value){
                        var val=JSON.parse(value[i]);
                        // var valArr=[val.id,val.nav,val.pot,val.logo,val.editor];
                        var nav2 = val.nav.split(':');
                        if(nav2 == null){
                          var nav2=['null','null'];
                        }
                        if(val.lb == '' || val.lb == null){
                          val.lb=0;
                        }
                        if(val.bg == '' || val.bg == null){
                          val.bg='#fff';
                        }
                        if(val.name == '' ||val.name == null){
                          val.name='';
                        }
                        if(val.plan == ''||val.plan == null){
                          val.plan='1';
                        }
                        var valArr=[val.id,val.name,nav2[1],val.pot,val.logo,val.editor,val.lb,val.bg,val.plan];
                        allData.push(valArr);
                    }
                });
                return allData;
            }
        },
    });

    var addData=function(){
        var bg_n=$('#bg_btn').attr('role');
        if(bg_n==1){
          var bg=$('.bg_cs').val();
        }
        if(bg_n==2){
          var bg1=$('.start_jb').val();
          var bg2=$('.end_jb').val();
          if(bg1 == ''){
            bg1='#fff';
          }
          if(bg2 == ''){
            bg2='#fff';
          }
          var bg=bg1+'&'+bg2;
        }
        if(bg_n==3){
          var bg=$('#img_xx').val();
        }
        if(bg==''){
          bg='#fff';
        }
        $('input[data-id="7"]').val(bg);
        var addTr=[];
        for (var i = 0; i <9; i++) {
            var text=$('input[data-id="'+i+'"]').val();
            addTr.push(text);
        }
        mgr.row.add( [
            addTr[0],
            addTr[1],
            addTr[2],
            addTr[3],
            addTr[4],
            addTr[5],
            addTr[6],
            addTr[7],
            addTr[8],
            '<button class="edit btn btn-primary">编辑</button>'+
            '<button class="del btn btn-danger">删除</button>'
        ]).draw();
        saveData();
        // window.location.reload();
    };

    // 上传图片

    $(".dataTables_wrapper .dataTables_filter").find("input").attr("placeholder","请输入关键字");
    var inputval='<button id="search123" type="button" name=""></button>';
    $(".dataTables_wrapper .dataTables_filter").find("label").append(inputval);
    $("body").find("#search123").addClass("anniu");

    var add='<div class="btn group" style="float: right;margin-right: 4px;padding:0;">\
            <button id="add_btn" class="btn btn-primary" style="padding:4px 12px;">新增</button>\
        </div>';
    $("#useManage_filter").append(add);
    $("#add_btn").click(function(){
        $("#saveOK_btn").css("display","none");
        $("#ok_btn").css("display","inline-block");
        $("#addModal").modal("toggle");
        $('.demo_cs').slideDown();
        $('.demo_jb').hide();
        $('.demo_bgt').hide();
        $("#use").attr('readonly',false);
        newTr.find('input').val("");
        getNav();
        setTimeout(function(){
          var nav_xz=$('#nav_list li:first').attr('data-id');
          $('input[data-id="2"]').val(nav_xz);
          var mh_xz=$('#mh_list li:first').attr('data-id');
          $('input[data-id="3"]').val(mh_xz);
          $('input[data-id="8"]').val('1');
        },300)
        if($('body #img_main_tc').length<1){
          getImg();
        }
    });
    $('input[data-id="6"]').keyup(function () {
       $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理
       $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用

    $("#ok_btn").click(function(){
        $.ajax({
            type: "get",
            async: false,
            dataType:"jsonp",
            cache:false,
            url: "/db/scan/ssdb0/use:/use:~/200",
            success: function(data) {
                // console.log(data);
              if($('input[data-id="0"]').val() == '' || $('input[data-id="0"]').val() == null){
                alert('应用ID不能为空')
              }else{
                var yingyong = 'use:' + $('input[data-id="0"]').val();
                var yingyong2 = [];
                for(var i=0;i<data.length;i++){
                    for(var j in data[i]){
                        yingyong2.push(j);
                    }
                }
                if(yingyong2.indexOf(yingyong) != -1){
                    alert("ID重复，请重新设定！");
                }else{
                  if($('input[data-id="1"]').val() ==''){
                    alert("中文名称不能为空！");
                  }else{
                    // console.log('ok');
                    $("#addModal").modal("toggle");
                    addData();
                  }
                }
                if($('input[data-id="6"]').val() == ''){
                  $('input[data-id="6"]').val('0');
                }else{
                  var fist_num=$('input[data-id="6"]').val();
                  var se_num=Math.floor(fist_num);
                  $('input[data-id="6"]').val(se_num);
                }
              }
            },
            error:function(XMLHttpRequest,message){
                console.log(message);
            }
        });
    });
    $("#gb_btn,#ck_gb").on('click',function() {
      /* Act on the event */
      $('input[data-id="0"]').removeAttr('readonly');
    });
    $("#saveOK_btn").click(function(){
        if($('input[data-id="1"]').val()==''){
          alert("中文名称不能为空!");
        }else{
          $('input[data-id="0"]').removeAttr('readonly');
          saveData();
        }
    });
    $("body").on('click','.edit',function(){
        $("#saveOK_btn").css("display","inline-block");
        $("#ok_btn").css("display","none");
        $("#addModal").modal("toggle");
        $("#use").attr('readonly',true);
        $('input[data-id="0"]').attr('readonly',true);
        editData(this);
        if($('body #img_main_tc').length<1){
          getImg();
        }
    });
    var delData=function(dom){
        var key=$(dom).parent().parent().children(":first").text();
        //key=key.replace(new RegExp(/(:)/g),"_");
        //var useId='use:'+key;
        //console.info(useId);
        $.ajax({
            type: "get",
            async: true,
            dataType:"json",
            cache:false,
            url:'/db/del/ssdb0/use:'+key,
            success:function(){}
        });
        mgr
        .row( $(dom).parent().parent())
        .remove()
        .draw();
    };

    $("body").on('click','.del',function(){
        delData(this);
    });
    var saveData=function(){
        var data=getData();

        // 替换nav中的冒号；
       // var nav=data.nav;
       // useId=nav.replace(new RegExp(/(:)/g),"_");
        var dataStr=JSON.stringify(data);
        // console.info(dataStr);
        var useData = 'use:' + $('input[data-id="0"]').val();
        $.ajax({
            type: "post",
            async: true,
            dataType:"json",
            cache:false,
            url:'/db/put/ssdb0/' + useData,
            data:{value:dataStr},
            success: function(data) {
                window.location.reload();
            },
            error:function(error){
                console.log(error);
                window.location.reload();
            }
        });
    };
    var getData=function(){
          if($('input[data-id="6"]').val() == ''){
            $('input[data-id="6"]').val('0');
          }else{
            var fist_num=$('input[data-id="6"]').val();
            var se_num=Math.floor(fist_num);
            $('input[data-id="6"]').val(se_num);
          }
          var bg_n=$('#bg_btn').attr('role');
          if(bg_n==1){
            var bg=$('.bg_cs').val();
          }
          if(bg_n==2){
            var bg1=$('.start_jb').val();
            var bg2=$('.end_jb').val();
            if(bg1 == ''){
              bg1='#fff';
            }
            if(bg2 == ''){
              bg2='#fff';
            }
            var bg=bg1+'&'+bg2
          }
          if(bg_n==3){
            var bg=$('#img_xx').val();
          }
          if(bg == ''){
            bg='#fff';
          }
          $('input[data-id="7"]').val(bg);

            var nav_s='nav:'+$('input[data-id="2"]').val();
            var string={
                "id":$('input[data-id="0"]').val(),
                "name":$('input[data-id="1"]').val(),
                "nav":$('input[data-id="2"]').val(),
                "pot":$('input[data-id="3"]').val(),
                "logo":$('input[data-id="4"]').val(),
                "editor":$('input[data-id="5"]').val(),
                "lb":$('input[data-id="6"]').val(),
                "bg":$('input[data-id="7"]').val(),
                "plan":$('input[data-id="8"]').val(),
            };
          //console.info(string);
          return string;

    };
    var editData=function(a){
        var tr=$(a).parent().parent();
        for (var i = 0; i < 9; i++) {
          if(i == 7){
            var td=tr.children().eq(i).text();
            newTr.find('input[data-id="'+i+'"]').val(td);
            var jb_mh=td.split("&");
            var jb_cs=td.split("#");
            if(jb_mh[1] != '' && jb_mh[1] != null){
              $('#bg_btn').attr('role','2');
              $('.bg_jb').show();
              $('.bg_cs').hide();
              $('#img_xx').hide();
              $('.start_jb').val(jb_mh[0]);
              $('.start_jb').next('span').children('span').css('background-color', jb_mh[0]);
              $('.end_jb').val(jb_mh[1]);
              $('.end_jb').next('span').children('span').css('background-color', jb_mh[1]);
              $('.demo_jb').slideDown();
              $('.demo_cs').hide();
              $('.demo_bgt').hide();
            }else{
              if(jb_cs[1] != null){
                $('#bg_btn').attr('role','1');
                $('.bg_cs').show();
                $('.bg_jb').hide();
                $('#img_xx').hide();
                $('.bg_cs').val(td);
                $('.bg_cs').next('span').children('span').css('background-color', td);
                $('.demo_cs').slideDown();
                $('.demo_jb').hide();
                $('.demo_bgt').hide();
              }else{
                if(td.split(":") !='' && td.split(":") != null){
                  $('#bg_btn').attr('role','3');
                  $('#img_xx').show();
                  $('.bg_cs').hide();
                  $('.bg_jb').hide();
                  $('#img_xx').val(td);
                  $('.demo_bgt').slideDown();
                  $('.demo_cs').hide();
                  $('.demo_jb').hide();
                }
              }
            }
          }
            if(i == 2){
                var td='nav:' + tr.children().eq(i).text();
                newTr.find('input[data-id="'+i+'"]').val(td);
            }else{
              var td=tr.children().eq(i).text();
              newTr.find('input[data-id="'+i+'"]').val(td);
            }

        }


    };
    var getNav=function(){
        $.ajax({
            type: "get",
            async: true,
            dataType:"jsonp",
            cache:false,
            url: "/db/scan/ssdb0/nav:/nav:~/200",
            success: function(data) {
                $("#nav_list").empty();
                for (var i = 0; i < data.length; i++) {
                    var d=data[i];
                   for(var j in data[i]){
                        var t=JSON.parse(d[j]);
                        t=t[0].ntitle;
                        var li=$(
                            '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
                            );
                        $("#nav_list").append(li);
                   }
               }
            },
            error:function(XMLHttpRequest,message){
                console.log(message)
            }
        });
    };
    var getImg=function(){
      $.ajax({
          type: "get",
          async: false,
          dataType:"jsonp",
          cache:false,
          url: "/db/scan/ssdb0/img:/img:~/200",
          success: function(data) {
            // console.log(data);
            var w=$(window).width()*0.8;
            var h=$(window).height()*0.7;
            var t=-h*0.6;
            var l=-w*0.5;
            var h1=h-50;
            var div='<div id="img_main_tc" style="width:'+w+'px;height:'+h+'px;margin-top:'+t+'px;margin-left:'+l+'px;position:fixed;z-index:1050;top:50%;left:50%;"><div class="nav_img"><h5>图片库选择</h5><button class="img_tc_ok btn btn-success">确认</button><button class="img_tc_close btn btn-info">关闭</button></div><div id="img_box_xs" style="height:'+h1+'px"><div id="container"></div></div></div>'
            $('body').prepend(div);
            $("#img_main_tc").hide();
            for (var i = 0; i < data.length; i++) {
                var d=data[i];
               for(var j in data[i]){
                    var t=JSON.parse(d[j]);
                    // console.log(t);
                    var ms=t.ms;
                    var src=t.img;
                    var box='<div class="boxs">'+
                                '<div class="boxs_img" role="'+j+'">'+
                                	'<a>'+
                                    '<img src="../images/logo/'+src+'">'+
                                  '</a>'+
                                  '<a>图片描述:'+ms+'</a>'+
                                  '<a>图片名称:'+src+'</a>'+
                                '</div>'+
                            '</div>'
                    $("#container").append(box);
                    setTimeout(function(){
                      imgLocation("container","boxs");
                    },50)
               }
           }

          },
          error:function(XMLHttpRequest,message){
              console.log(message)
          }
      });
    }
    $("body").on('click','.img_tc_close',function(){
      $("body #img_main_tc").remove();
    })
    $.jUploader({
        button: 'logo_btn', // 这里设置按钮id
        action: '/putfile3?portal='+$('input[data-id="2"]').val(), // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
        cancelable: true, // 可取消上传
        allowedExtensions: ['png','gif','jpg'], // 只允许上传
        messages: {
            upload: '上传图片',
            cancel: '取消上传',
            emptyFile: "{file} 为空，请选择一个文件.",
            invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
            onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
        },
        onUpload:function(fileName){
            $('input[data-id="3"]').val(fileName);
        },
        onComplete: function (fileName, response) {
            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
            alert("上传成功");

        }
    });
    $("#nav_btn").click(function(){
        getNav();
    });

    $("#img_btn").click(function(){
      if($('#img_main_tc').length>0){
        $("#img_main_tc").show();
      }else{
        getImg();
        $("#img_main_tc").show();
      }
      imgLocation("container","boxs");
    });
    $("body").on("click","#nav_list li",function(){
        var val=$(this).attr("data-id");
        $('input[data-id="2"]').val(val);
    });
    $("body").on("click",".boxs_img",function(){
        $(".boxs_img").removeClass('click_boxs');
        $(this).addClass('click_boxs');
    });
    $("body").on("click",".img_tc_ok",function(){
        if($('.boxs_img').hasClass('click_boxs')){
          // var n=$('.click_boxs a:last').html();
          // var m=n.split(":");
          // $('input[data-id="3"]').val(m[1]);
          var m=$('.click_boxs').attr("role");
          if($('.img_tc_ok').attr('role') == null){
            $('input[data-id="4"]').val(m);
          }else{
            $('#img_xx').val(m);
            $('.img_tc_ok').removeAttr('role');
          }
          $("#img_main_tc").remove();
        }else{
          alert('并没有选中图片！')
        }
    });
    // $("body").on("click","#img_list li",function(){
    //     var val=$(this).children().html();
    //     $('input[data-id="3"]').val(val);
    // });
    $("body").on("click","#mh_list li",function(){
        var val=$(this).attr("data-id");
        $('input[data-id="3"]').val(val);
    });
    // $("#ok_btn").click(function(){
    //     $("#addModal").modal('toggle');
    // });
    function bj_gb(){
      $('.bg_jb').hide();
      $('#img_xx').hide();
    };
    bj_gb();

    $('body').on('click', '.yz_jb', function() {
      /* Act on the event */
      $('.yz_cs').removeClass('border_xz_demo');
      $('.yz_jb').removeClass('border_xz_demo');
      $('.yz_bgt').removeClass('border_xz_demo');
      if($(this).hasClass('border_xz_demo')){
        $(this).removeClass('border_xz_demo');
      }else{
        $(this).addClass('border_xz_demo');
        var jb1=$(this).children('span').eq(0).attr('data-id');
        var jb2=$(this).children('span').eq(1).attr('data-id');
        $('.start_jb').val(jb1);
        $('.start_jb').next('span').children('span').css('background-color', jb1);
        $('.end_jb').val(jb2);
        $('.end_jb').next('span').children('span').css('background-color', jb1);
      }
    });
    $('body').on('click', '.yz_bgt', function() {
      /* Act on the event */
      $('.yz_cs').removeClass('border_xz_demo');
      $('.yz_jb').removeClass('border_xz_demo');
      $('.yz_bgt').removeClass('border_xz_demo');
      if($(this).hasClass('border_xz_demo')){
        $(this).removeClass('border_xz_demo');
      }else{
        $(this).addClass('border_xz_demo');
        var bgt=$(this).attr('data-id');
        $('#img_xx').val(bgt);
      }
    });
    $('body').on('click', '#img_xx', function() {
      /* Act on the event */
      if($('#img_main_tc').length>0){
        $("#img_main_tc").show();
      }else{
        getImg();
        $("#img_main_tc").show();
      }
      imgLocation("container","boxs");
      $('.img_tc_ok').attr('role', 'bg');
    });
    $('body').on('click', '#bg_list li', function() {
      var val=$(this).attr("data-id");
      $('#bg_btn').attr('role',val)
      if(val == 1){
        $('.bg_cs').show();
        $('.demo_cs').slideDown();
        $('.demo_jb').hide();
        $('.demo_bgt').hide();
        $('.bg_jb').hide();
        $('#img_xx').hide();
      }
      if(val == 2){
        $('.bg_jb').show();
        $('.demo_jb').slideDown();
        $('.demo_cs').hide();
        $('.demo_bgt').hide();
        $('.bg_cs').hide();
        $('#img_xx').hide();
      }
      if(val == 3){
        $('#img_xx').show();
        $('.demo_bgt').slideDown();
        $('.demo_cs').hide();
        $('.demo_jb').hide();
        $('.bg_jb').hide();
        $('.bg_cs').hide();

      }
    });

    $('.demo').each( function() {
			$(this).minicolors({
				control: $(this).attr('data-control') || 'hue',
				defaultValue: $(this).attr('data-defaultValue') || '',
				inline: $(this).attr('data-inline') === 'true',
				letterCase: $(this).attr('data-letterCase') || 'lowercase',
				opacity: $(this).attr('data-opacity'),
				position: $(this).attr('data-position') || 'bottom left',
				change: function(hex, opacity) {
					if( !hex ) return;
					if( opacity ) hex += ', ' + opacity;
					try {
						// console.log(hex);
					} catch(e) {}
				},
				theme: 'bootstrap'
			});

  });
  $('#mh_list_cj li').click(function() {
    var plan=$(this).attr('data-id');
    $('input[data-id="8"]').val(plan);
  });
  $('body').on('click', '.yz_cs', function() {
    /* Act on the event */
    $('.yz_cs').removeClass('border_xz_demo');
    $('.yz_jb').removeClass('border_xz_demo');
    $('.yz_bgt').removeClass('border_xz_demo');
    var n = $('.yz_cs').index(this);
    $('input[data-id="8"]').val(n+1);
    if($(this).hasClass('border_xz_demo')){
      $(this).removeClass('border_xz_demo');
    }else{
      $(this).addClass('border_xz_demo');
      var cs=$(this).attr('data-id');
      $('.bg_cs').val(cs);
      $('.bg_cs').next('span').children('span').css('background-color', cs);
    }
  });
});
