// JavaScript Document

function imgLocation(parent,content){
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth = ccontent[0].offsetWidth;
	var num = Math.floor($("#img_main_tc").width() / imgWidth)
	cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto";
	var boxsHeightArr=[];
	for(var i= 0; i<ccontent.length;i++){
		if(i<num){
			boxsHeightArr.push(ccontent[i].offsetHeight);
			// boxsHeightArr[i] = ccontent[i].offsetHeight;
		}else{
			var minheight = Math.min.apply(null,boxsHeightArr);
			var minIndex = getminheightLocation(boxsHeightArr,minheight);
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minheight+"px";
			ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
			boxsHeightArr[minIndex] = boxsHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
	}
}

function getminheightLocation(boxsHeightArr,minHeight){
	for(var i in boxsHeightArr){
		if(boxsHeightArr[i] == minHeight){
			return i;
		}
	}
}
function getChildElement(parent,content){
	var contentArr = []
	var allcontent = parent.getElementsByTagName("*");
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}
