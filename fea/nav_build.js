define(["validate.additional"], function(){
	var maxId = 0;
	var nestable = $('#zyml_list');
	var validForm;
	var theRequest ={};
    var key,ntitle,yn,nmh,editor;

    function check_portal(){
        $(".radio").remove();
        $.getJSON("../portal/portal.json",function(data){
            $.each(data,function(name,value){
                //console.info(name);
                var div='<div class="radio" style="padding-left: 38%;">\
                            <label>\
                                <input type="radio" name="bag" data-id="'+name+'">'+value+'\
                            </label>\
                        </div>';
                $("#choose").append(div);
            })
        });
    };
    check_portal();

    $("#btn_box a").eq(1).hover(function(){
        $(this).find('img').attr('src','img/icon/add-hover.png');
    },function(){
        $(this).find('img').attr('src','img/icon/add.png');
    });
    $("#btn_box a").eq(2).hover(function(){
        $(this).find('img').attr('src','img/icon/save-hover.png');
    },function(){
        $(this).find('img').attr('src','img/icon/save.png');
    });
    $("#btn_box a").eq(3).hover(function(){
        $(this).find('img').attr('src','img/icon/yulan-hover.png');
    },function(){
        $(this).find('img').attr('src','img/icon/yulan.png');
    });
    $("#btn_box a").eq(4).hover(function(){
        $(this).find('img').attr('src','img/icon/back-hover.png');
    },function(){
        $(this).find('img').attr('src','img/icon/back.png');
    });
    $.ajax({
        type: "get",
        async: true,
        dataType:"jsonp",
        cache:false,
        url: "/db/scan/ssdb0/dashboard:/dashboard:~/200",             
        success: function(data) {
            $("#keyList").empty();
           for (var i = 0; i < data.length; i++) {
            var d=data[i];
                for(var j in data[i]){
                    var t=JSON.parse(d[j]);
                    t=t[0].dtitle;
                    //console.info(t);
                    var li=$(
                        '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
                        );              
                    $("#keyList").append(li);
                }
           }                             
        },
        error:function(XMLHttpRequest,message){
            console.log(message)
        }
    });
    $.ajax({
        type: "get",
        async: true,
        dataType:"jsonp",
        cache:false,
        url: "/db/scan/ssdb0/dashboard2:/dashboard2:~/200",             
        success: function(data) {
            $("#keyListdb2").empty();
           for (var i = 0; i < data.length; i++) {
            var d=data[i];
                for(var j in data[i]){
                    var t=JSON.parse(d[j]);
                    t=t[0].dtitle;
                    //console.info(t);
                    var li=$(
                        '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
                        );              
                    $("#keyListdb2").append(li);
                }
           }                             
        },
        error:function(XMLHttpRequest,message){
            console.log(message)
        }
    });
    $.ajax({
        type: "get",
        async: true,
        dataType:"jsonp",
        cache:false,
        url: "/db/scan/ssdb0/am:/am:~/200",             
        success: function(data) {
           // console.info(data);
           $("#keyListam").empty();
            for (var i = 0; i < data.length; i++) {
                var d=data[i];
               for(var j in data[i]){
                    var t=JSON.parse(d[j]);
                    t=t[0].aTitle;
                    //console.info(t);
                    var li=$(
                        '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
                        );              
                    $("#keyListam").append(li);
               }
           }                      
        },
        error:function(XMLHttpRequest,message){
            console.log(message)
        }
    });
    $.ajax({
        type: "get",
        async: true,
        dataType:"jsonp",
        cache:false,
        url: "/db/scan/ssdb0/dp:/dp:~/200",             
        success: function(data) {
            //console.info(data);
           $("#keyListdp").empty();
            for (var i = 0; i < data.length; i++) {
                var d=data[i];
               for(var j in data[i]){
                    var t=JSON.parse(d[j]);
                    t=t[0].mtitle;
                    //console.info(t);
                    var li=$(
                        '<li data-id="'+j+'"><a href="#">'+t+'</a></li>'
                        );              
                    $("#keyListdp").append(li);
               }
           }                      
        },
        error:function(XMLHttpRequest,message){
            console.log(message)
        }
    });
    $("body").on("click","#keyList li",function(){
        var val=$(this).attr("data-id");
        var val1=$(this).text();
        $('input[name="dirkey"]').val(val);
        $('input[name="dirname"]').val(val1);
    });
    $("body").on("click","#keyListdb2 li",function(){
        var val=$(this).attr("data-id");
        var val1=$(this).text();
        $('input[name="dirkey"]').val(val);
        $('input[name="dirname"]').val(val1)
    });
    $("body").on("click","#keyListam li",function(){
        var val=$(this).attr("data-id");
        var val1=$(this).text();
        $('input[name="dirkey"]').val(val);
        $('input[name="dirname"]').val(val1)
    });
    $("body").on("click","#keyListdp li",function(){
        var val=$(this).attr("data-id");
        var val1=$(this).text();
        $('input[name="dirkey"]').val(val);
        $('input[name="dirname"]').val(val1)
    });
	var loadForm = function(data){
		$('#edit_dir_from').loadForm(data);
	};	
	var saveData = function(){
	   var json = getTreeData();
      // console.info(json);
		if(!json){
			alert("还未编辑导航！");
		}else{
            alert("保存成功！")
        }
		//var string=JSON.stringify(json);
		$.ajax({
			url: "/db/put/ssdb0/"+key,
			type: "post",
        	data: {value:json},
        	dataType: "json",
        	success: function(res){
        		alert("保存成功！");
        	}
		});
	};
    
    var getId = function(id){
    	if(id && $.isNumeric(id)){
    		id = parseInt(id);
    		if(id > maxId){
    			maxId = id;
    		}
    		return id;
    	} else {
    		return ++maxId;
    	}
    };
    
    var editNode = function(id, name,dirkey,yn,dircs){
       // alert();
    	var node =  $('#zyml_list li.dd-item[data-id="'+id+'"]');
    	if(node.length > 0){
    		node.attr({"data-name":name,"data-key":dirkey,"data-tit":yn});
    		node.data({"name":name,"key":dirkey,"tit":yn,"cs":dircs});
           //node.key("dirkey", dirkey);
           //console.info(node);
    		node.find('.dd3-content span:first').html(name);
            node.find('.dd3-content .dbdKey:first').html(dirkey);
    	}
    };
    
    var addNode = function(pId, dirName,dirkey,yn,dircs){
    	var pnode = null;
    	if($.isNumeric(pId) && parseInt(pId) > 0){
    		pnode =  $('#zyml_list li.dd-item[data-id="'+pId+'"]');
    		if(pnode.has("ol.dd-list").length == 0){
    			pnode.append($('<ol class="dd-list">'));
    		}
    	} else {
    		pnode = $('#zyml_list');
    	}
    	createNode(pnode.children('ol.dd-list:first'), {name: dirName,key:dirkey,tit:yn,cs:dircs});
    };

    var createNode = function(ol, node){
        //alert();
        //console.info(node);
    	var id = getId(node.id);
    	var text = node.name || ("Node-"+id);
        var dashboardKey=node.key;
        var t=node.tit;
        var cs=node.cs;
    	var child = $(
    		'<li class="dd-item dd3-item" data-cs="'+cs+'" data-tit="'+t+'"data-id="'+id+'" data-name="'+text+'" data-key="'+dashboardKey+'">'+
				'<div class="dd-handle dd3-handle"></div>'+
				'<div class="dd3-content">'+
					'<span>'+text+'</span>'+
                    '<span class="dbdKey" style="margin-left:10px;">'+dashboardKey+'</span>'+
					'<div class="actions" style="display: none;">'+
						'<button href="#addDirModal" data-toggle="modal" class="btn btn-primary mini  add-node"><i class="fa fa-plus"></i></button>'+
						'<button href="#addDirModal" data-toggle="modal" class="btn btn-warning mini edit-node"><i class="fa fa-edit"></i></button>'+
						'<button href="javascript: void(0);" class="btn mini btn-danger del-node"><i class="fa fa-remove"></i></button>'+
					'</div>'+
				'</div>'+
			'</li>'
    	);
    	ol.append(child);
        initBtnEvent(); 
    	if(node.children && node.children.length > 0){
    		var col = $('<ol class="dd-list">');
    		child.append(col);
    		for(var i=0;i<node.children.length;i++){
    			createNode(col, node.children[i]);
        	}
    	}
    };
    $("body").on("click","#yulan_btn",function(){
        $("#bcgChoose").modal("toggle");
    });
    $("#submit").click(function(){
        var inp=$("#choose").find('input');
        var mhC;
        for (var i = 0; i < inp.length; i++) {
            if(inp[i].checked==true){
                mh=$(inp[i]).attr('data-id');
            }
        }
        $.getJSON("../portal/portal.json",function(data){
            $.each(data,function(name,value){
                if(mh==name) {
                    //console.info(mh);
                   // $("#key").text()+'&ntitle='+ntitle+'&editor='+editor
                    window.open('../portal/portal'+mh+'/portal'+mh+'.fh5?key='+$("#key").text()+'&ntitle='+ntitle+'&editor='+editor);
                    return true;
                }
            })
        });
        $("#bcgChoose").modal("toggle");
    });
    var onAddClick = function(){
    	var data = $(this).closest('li.dd-item').data();
        //console.info(this);
    	var id = data?data.id:0;
		validForm.resetForm();
		loadForm({
			nId: id,
			type: "add"
		});
		$('#addDirModal form input[name="nId"]').val(id);
		$('#addDirModal form input[name="type"]').val("add");
    };
    
    var initBtnEvent = function(){
    	/*$('a.btn.green').click(function(){
    		$('#addDirModal form input[name="nId"]').val("");
    		$('#addDirModal form input[name="type"]').val("add");
    		$('#addDirModal form input[name="dirname"]').val("");
    		
    	});*/
    	$('#zyml_list').on("mouseenter.modalhover", ".dd3-content", function(){
        	$(this).children('.actions').css("display", "");
        });
        $('#zyml_list').on("mouseleave.modalhover", ".dd3-content", function(){
        	$(this).children('.actions').css("display", "none");
        });
    	$('#zyml_list').on("click.modnode", ".dd3-content .actions .btn.add-node", onAddClick);

    	$('#zyml_list').on("click.modnode", ".dd3-content .actions .btn.edit-node", function(){

    		var odata = $(this).closest('li.dd-item').data();
            //console.info(odata);
    		var id = odata.id;
    		var name = odata.name;
            var key=odata.key;
            //console.info(key);
            var tit=odata.tit;
            var cs=odata.cs;
            
    		validForm.resetForm();
    		loadForm({
    			nId: id,
    			type: "edit",
    			dirname: name,
                dirkey:key,
                tit:tit,
                cs:cs
    		});
            if(cs!='undefined'){
                console.info(cs);
                $('input[name="dircs"]').val(cs);  
            }
            
           // console.info($('input[name="dircs"]').val(cs));
    	});

    	$('#zyml_list').on("click.modnode", ".dd3-content .actions .btn.del-node", function(){
    		$(this).closest('li.dd-item').remove();
            //console.info(this);
    	});
    };
    
    var getTreeData = function(){
        dataArr=[];
        ntitle=ntitle;
        var oo={
            "num":nestable.nestable('serialize'),
            "ntitle":ntitle,
            //"nmh":nmh,
            "editor":editor
        };
        dataArr.push(oo);
        console.info(dataArr);
    	return window.JSON.stringify(dataArr);
    };
   
    var GetRequest=function(){
        var url = location.search; //获取url中"?"符后的字串
        var a=decodeURI(url);
        if (a.indexOf("?") != -1) {
            var str = a.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        key=theRequest.key;
        ntitle=theRequest.ntitle;
        nmh=theRequest.mh;
        editor=theRequest.editor;
        return theRequest;
      }; 
    return {
        init: function () {
            GetRequest();
            if (key){
                $("#key").addClass("btn btn-info");
                $("#key").text(key);
            }           
        	$.ajax({
                type: "get",
                //async: true,
                dataType:"jsonp",
                cache:false,
                url: "/db/jsonp/ssdb0/"+key,          
                success: function(data) {
                   // var data=JSON.parse(data);
                    //nestable = $('#zyml_list');
                    
                    if(data && data[0]) {
                        var ol = nestable.children('ol.dd-list:first');
                        var data=data[0].num;
                        ol.empty();
                        for(var i=0;i<data.length;i++){
                            createNode(ol, data[i]);
                        }
                    }                   
                    nestable.nestable({
                        maxDepth: 2  //最多三层目录
                    });
                                          
                },
                error:function(XMLHttpRequest,message){
                    console.log(message)
                }
            });
        	
        	var form = $('#edit_dir_from');
        	$.metadata.setType('attr','validate');
        	validForm = form.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'validate-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: ".ignore-validate",
                //meta: "validate",
                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("name") == "pwdRad") { // for uniform radio buttons, insert the after the given container
                        error.addClass("no-left-padding").appendTo("#pwdRad_error");
                    } else if (element.attr("name") == "service") { // for uniform checkboxes, insert the after the given container
                        error.addClass("no-left-padding").appendTo("#service_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavoir
                    }
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).closest('.validate-inline').removeClass('ok'); //display OK icon
                    $(element).closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).closest('.control-group').removeClass('error'); // set error class to the control group
                },
                success: function (label) {
                	if (label.attr("id") == "service-error" || label.attr("id") == "pwdRad-error") { // for checkboxes and radip buttons, no need to show OK icon
                        label.closest('.control-group').removeClass('error').addClass('success');
                        label.remove(); // remove error label here
                    } else { 
                    	label.addClass('valid').addClass('ok') // mark the current input as valid and display OK icon
                    	.closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
                    }
                },
                submitHandler: function () {
                    yn="";
                	var type = $('input[name="type"]').val();
                	var id = $('input[name="nId"]').val();
                	var dirname = $('input[name="dirname"]').val();
                    var dirkey=$('input[name="dirkey"]').val();
                    var dircs=$('input[name="dircs"]').val();
                    var yes=$("#YN input:eq(0)");   

                    if(yes[0].checked==true){
                        yn=dirname;
                    }
                    //console.info(yn);
                	if(type == "edit"){
                        //alert("..")
                		editNode(id,dirname,dirkey,yn,dircs);
                        //return false;
                	} else {
                       // alert();
                		addNode(id,dirname,dirkey,yn,dircs);
                	}
                }
            });
        	
        	$("#save_dir_btn").click(function(){
        		form.submit();
        	});
        	$("#save_btn").click(function(){
        		saveData();
        	});
        	$("#add_btn").click(onAddClick);
        	
        	$('#test_id').hover(function(){
        		$(this).children().css("display", "");
        	}, function(){
        		$(this).children().css("display", "none");
        	});
            $("#back_btn").on('click',function(){
    //alert();
                window.location.href='nav_mgr.fh5';
            });
        },
        getTreeData: function(){
        	return getTreeData();
        },
        saveData: function(){
        	saveData();
        }
    };
});