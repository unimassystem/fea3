

function draw08(myChart,ckey,height,titles,x,y,width,div){
	var timeDatas = new Date().getTime();
	//-------------构建dom--------------------

	var info_box='<div class="all-info'+timeDatas+' all-info"></div>';
	$(div).css('overflow','hidden');
    div.html(info_box);
    $(".all-info"+timeDatas).css('width',width);
    $.ajax({
	    type : 'get',
	    url:'/db/jsonp/ssdb0/'+ckey,
	   //	url:'/db/jsonp/ssdb0/ww_test1',
	    cache : false,
	    dataType : 'jsonp',
	    success:function(dataAll){			
			data=dataAll.data;	
			var myCol=dataAll.columns;
			var dt=data[0];	
			for (var i = 0; i < myCol.length; i++){								
				var div=$(
					'<div class="info info-'+i+'">\
						<p>'+myCol[i]+'</p>\
						<span>'+dt[i]+'</span>\
					</div>'
				);
				$('.all-info'+timeDatas).append(div);				
			}			
	    }                               
	});
	/*$("body").on("click","a",function(e){
		stopDefault(e);
	    var t=$(this).attr("targett");
	    var h=$(this).attr("href");  		    
	    var p=$(this).parents(".all-info").parent();
	    targetT(t,h,p);
	    return false;
	});*/
	function stopDefault(e){
		if ( e && e.preventDefault ) {
		 	e.preventDefault(); 
		}
  		else{
  			window.event.returnValue = false; 
  		}         
	};
}
		
	
	



