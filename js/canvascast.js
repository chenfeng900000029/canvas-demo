
////鼠标按下去
//div.onmousedown = function(a){
//
//}
////鼠标移动
//div.onmousemove=function(a){
//}
////鼠标松开
//div.onmouseup=function(z){
//	painting=false
//	//console.log(z)
//}


//ctx.fillStyle='darkgoldenrod'	//设置绘画颜色
//ctx.fillRect(0,0,100,100)		//设置绘画坐标  大小
//
//ctx.strokeStyle='yellowgreen'  //描边颜色
//ctx.strokeRect(200,200,100,100)	//大小
//ctx.clearRect(20,20,10,10)   //清除 坐标20，20  大小 10，10
//
//ctx.beginPath()
//ctx.moveTo(300,300)
//ctx.lineTo(300,80)
//ctx.lineTo(180,180)
//ctx.fill()
var yyy=document.getElementById('xxx') //获取canvas
var ctx=yyy.getContext('2d')   //获取上下文2d
var lineWidth=5
autoSetCanvasSize(yyy)
listenToMouse(yyy)

thin.onclick=function(){
	lineWidth=2
}
thick.onclick=function(){
	lineWidth=4
}

clear.onclick=function(){
	ctx.clearRect(0,0,yyy.width,yyy.height)
}
download.onclick=function(){
var url=	yyy.toDataURL("image/png")
	console.log(url)
 var a=document.createElement('a')
 document.body.appendChild(a)
 a.href=url
 a.download='画'
 //a.target='_blank'
 a.click()
}
function drwCircle(x,y,radius){
ctx.beginPath()
//ctx.arc(x,y,radius,0,Math.PI*2) 打点
ctx.fill()
}
var using=false
var lastPoint={x:undefined,y:undefined}

function drawLine(x1,y1,x2,y2){
	ctx.beginPath()
	ctx.moveTo(x1,y1)  //起点
	ctx.lineWidth=lineWidth
	ctx.lineTo(x2,y2)	//重点
	ctx.stroke()
	ctx.closePath()
}
red.onclick=function(){
	ctx.fillStyle='#F83508'
	ctx.strokeStyle='#F83508'
	red.classList.add('active')
	blue.classList.remove('active')
	green.classList.remove('active')
}
green.onclick=function(){
	ctx.fillStyle='#26E8C6 '
	ctx.strokeStyle='#26E8C6'
	green.classList.add('active')
	red.classList.remove('active')
	blue.classList.remove('active')
}
blue.onclick=function(){
	ctx.fillStyle='#1FCAFE'
	ctx.strokeStyle='#1FCAFE'
	green.classList.remove('active')
	blue.classList.add('active')
	red.classList.remove('active')
	
	
}


eraserEnable=false
pen.onclick=function(){
	eraserEnable=false
	pen.classList.add('active')
	eraser.classList.remove('active')
}
eraser.onclick=function(){
	eraserEnable=true
	eraser.classList.add('active')
	pen.classList.remove('active')
}




function autoSetCanvasSize(canvas){
	viewHW()
window.onresize=function(){
	viewHW()
}
function viewHW(){
	var pageWight=document.documentElement.clientWidth
	var pageHeight=document.documentElement.clientHeight
	canvas.width=pageWight
	canvas.height=pageHeight
}
}

function listenToMouse(canvas){

//特性检测
if(document.body.ontouchstart!==undefined){
canvas.ontouchstart=function(aaa){
	var x=aaa.touches[0].clientX
	var y=aaa.touches[0].clientY
	
	using=true
	if(eraserEnable){
		ctx.clearRect(x-5,y-5,10,10)
	}else{
		lastPoint={x:x,y:y}
	}	
}
canvas.ontouchmove=function(aaa){
	var x=aaa.touches[0].clientX
	var y=aaa.touches[0].clientY
	if(!using){return}
	if(eraserEnable){
		ctx.clearRect(x-5,y-5,10,10)
	}else{
		var newPoint={x:x,y:y}
		drwCircle(x,y,2)
		drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
		lastPoint=newPoint
	}
}
canvas.ontouchend=function(aaa){
	using=false
}		//触屏设备
}else{
	canvas.onmousedown=function(aaa){
	var x=aaa.clientX
	var y=aaa.clientY
	
	using=true
	if(eraserEnable){
		ctx.clearRect(x-5,y-5,10,10)
	}else{
		lastPoint={x:x,y:y}
	}	
}
canvas.onmousemove=function(aaa){
	var x=aaa.clientX
	var y=aaa.clientY
	if(!using){return}
	if(eraserEnable){
		ctx.clearRect(x-5,y-5,10,10)
	}else{
		var newPoint={x:x,y:y}
		drwCircle(x,y,2)
		drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
		lastPoint=newPoint
	}
}
canvas.onmouseup=function(aaa){
	using=false
}//非触屏设备
}

	
}

