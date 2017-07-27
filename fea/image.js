$(document).ready(function(){

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
            { "title": "图片ID"},
            { "title": "图片描述"},
            { "title": "图片名称" },
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
            url: '/db/scan/ssdb0/img:/img:~/200',
            'dataType':'jsonp',
            'dataSrc':function(res){
                // console.info(res);
                var allData=[];
                $.each(res,function(name,value){
                    for(i in value){
                        var val=JSON.parse(value[i]);
                        // console.log(val);
                        // var valArr=[val.id,val.nav,val.pot,val.logo,val.editor];
                        var valArr=[val.id,val.ms,val.img];
                        allData.push(valArr);
                    }
                });
                return allData;
            }
        },
    });

    // var mb_tc=function(){
    //   if($('#addModal').is(':hidden')){
    //     $("#addModal").modal("toggle");
    //   }else{
    //     $("#addModal").modal("toggle");
    //   }
    // };
    var addData=function(){
        var addTr=[];
        for (var i = 0; i <3; i++) {
            var text=$('input[data-id="'+i+'"]').val();
            addTr.push(text);
        }
        mgr.row.add( [
            addTr[0],
            addTr[1],
            addTr[2],
            '<button class="edit btn btn-primary">编辑</button>'+
            '<button class="del btn btn-danger">删除</button>'
        ]).draw();
        // saveData();
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
        // $("#addModal").modal("toggle");
        $("#addModal").modal("toggle");
        newTr.find('input').val("");


    });

    $("#ok_btn").click(function(){
        $.ajax({
            type: "get",
            async: false,
            dataType:"jsonp",
            cache:false,
            url: "/db/scan/ssdb0/img:/img:~/200",
            success: function(data) {
                // console.log(data);
              if($('input[data-id="0"]').val() == '' || $('input[data-id="0"]').val() == null){
                alert('图片ID不能为空')
              }else{
                var key=$('input[data-id="0"]').val();
                var result=key.match(/^[A-Za-z_][A-Za-z0-9_]{1,10}$/);
                if (result==null) {
            			alert('ID格式不正确！');
            			return false;
            		}else{
                  var yingyong = 'img:' + $('input[data-id="0"]').val();
                  var yingyong2 = [];
                  for(var i=0;i<data.length;i++){
                      for(var j in data[i]){
                          yingyong2.push(j);
                      }
                  }
                  if(yingyong2.indexOf(yingyong) != -1){
                      alert("ID重复，请重新设定！");
                  }else{
                    // var up_img=$('input[data-id="2"]').val();
                    // var up_imgs=up_img.match(/^([a-zA-Z0-9_]+)(.gif|.jpg|.jpeg|.GIF|.JPG|.JPEG|.png)+$/);
                    // if(up_imgs == null){
                    //   alert('图片名不能为中文')
                    // }else{
                      // $("#addModal").modal("toggle");
                      saveData();
                      // addData();
                    // }
                  }
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
      if(newTr.find('input[data-id="0"]').attr('role') == 'edit'){
        var addTr=[];
        var dataAll=newTr.find('input[data-id="0"]').attr('datas').split("?");
        for (var i = 0; i <dataAll.length; i++) {
            var text=dataAll[i];
            addTr.push(text);
        }
        mgr.row.add( [
            addTr[0],
            addTr[1],
            addTr[2],
            '<button class="edit btn btn-primary">编辑</button>'+
            '<button class="del btn btn-danger">删除</button>'
        ]).draw();
        newTr.find('input[data-id="0"]').removeAttr('role');
        newTr.find('input[data-id="0"]').removeAttr('datas');
      }

    });
    // $("#gb_btn,#ck_gb").on('click',function() {
    //   /* Act on the event */
    //   $('input[data-id="0"]').removeAttr('readonly');
    // });
    $("#saveOK_btn").click(function(){
        $('input[data-id="0"]').removeAttr('readonly');
        saveData();
        // saveData();
    });
    // $("#saveOK_btn").click(function(){
    //     $('input[data-id="0"]').removeAttr('readonly');
    //     $("#addModal").modal("toggle");
    //
    //     saveData();
    // });



    $("body").on('click','.edit',function(){
        $("#saveOK_btn").css("display","inline-block");
        $("#ok_btn").css("display","none");
        // $("#addModal").modal("toggle");
        $("#addModal").modal("toggle");
        $("#use").attr('readonly',true);
        $('input[data-id="0"]').attr('readonly',true);
        editData(this);
        // $('#addModal').modal({backdrop: 'static', keyboard: false});
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
            url:'/db/del/ssdb0/img:'+key,
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
       var up_img=data.img;
      //  alert(up_img);
       var up_imgs=up_img.match(/^([a-zA-Z0-9_]+)(.gif|.jpg|.jpeg|.GIF|.JPG|.JPEG|.png)+$/);
       if(up_imgs == null){
         alert('图片名不能为中文');
         var role_data=$('input[data-id="0"]').attr('datas')
         var role=role_data.split("?");
        //  console.log(JSON.stringify(role[2]));
        //  alert(JSON.stringify(role[2]));
         $('input[data-id="2"]').val(role[2]);
       }else{
        var dataStr=JSON.stringify(data);
        // console.info(dataStr);
        var useData = 'img:' + $('input[data-id="0"]').val();
        $.ajax({
            type: "post",
            async: true,
            dataType:"json",
            cache:false,
            url:'/db/put/ssdb0/' + useData,
            data:{value:dataStr},
            success: function(data) {
                // window.location.reload();
                // window.location.reload(true);
            },
            error:function(error){
                console.log(error);
                // window.location.reload(true);
            }
        });
        addData();
        $("#addModal").modal("toggle");
      }
    };
    var getData=function(){

          var string={
              "id":$('input[data-id="0"]').val(),
              "ms":$('input[data-id="1"]').val(),
              "img":$('input[data-id="2"]').val(),
          };
        //console.info(string);
        return string;

    };
    var editData=function(a){
        var tr=$(a).parent().parent();
        var ys='';
        for (var i = 0; i < 3; i++) {
            var td=tr.children().eq(i).text();
            newTr.find('input[data-id="'+i+'"]').val(td);
            ys+=td+'?';
        }
        newTr.find('input[data-id="0"]').attr('datas', ys);
        newTr.find('input[data-id="0"]').attr('role', 'edit');

        //点击之后删除这行，然后新增一行进去
      // setTimeout(function(){
        mgr
        .row(tr)
        .remove()
        .draw();
        // tr.remove();
      // },1500)
    };

    $.jUploader({
        button: 'logo_btn', // 这里设置按钮id
        action: '/putfile3', // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
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
            $('input[data-id="2"]').val(fileName);

        },
        onComplete: function (fileName, response) {
            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
            // console.log(response);
              alert("上传成功");
        }
    });

    // $("#ok_btn").click(function(){
    //     $("#addModal").modal('toggle');
    // });
});
