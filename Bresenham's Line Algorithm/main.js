window.onload = function() {
	var canvas = document.getElementById("canvas"),
		ct = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,   
		height = canvas.height = window.innerHeight;  // so that the canvas covers the entire window

		console.log(width/2);
		ct.translate(width/2,height/2);  // bringing the origin to the center of the page
		ct.scale(2,-2);

		ct.beginPath();   // setting up a grid around the origin
		ct.moveTo(-300,0);
		ct.lineTo(300,0);
		ct.moveTo(0,-200);
		ct.lineTo(0,200);
		ct.moveTo(0, 0);
		ct.lineTo(200,200);
		ct.moveTo(0, 0);
		ct.lineTo(-200,-200);
		ct.moveTo(0, 0);
		ct.lineTo(200,-200);
		ct.moveTo(0, 0);
		ct.lineTo(-200,200);
		ct.stroke();

		
		var x0 = 100;
		var y0 = 100;
		var x1 = 100;
		var y1 = 500;
		
		
		console.log("("+x0+","+y0+") "+ "("+x1+","+y1+")");
		bresenDraw(ct,x0,y0,x1,y1);
}

function bresenDraw(ct,x0,y0,x1,y1){
	ct.fillStyle='red';

	var flag1 = false;
	var dir1 = 1;
	var dir2 = 1;

	if(Math.abs(y1 - y0) > Math.abs(x1 - x0)){
		var temp = x0; x0 = y0; y0 = temp;  // we interchange the x and y axises
		temp = x1; x1 = y1; y1 = temp;
		flag1 = true;
	}
	
	if(x1 < x0) dir1 = -1;
	if(y1 < y0) dir2 = -1;

	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var p = 2*dy - dx;

	ct.fillRect(x0,y0,1,1);   // poor way of filling a single pixel (checkout the saved webpages)

	while(x0 != x1){
		x0 = x0 + dir1;
		p = p + ((dy-(dx & -(p>=0)))<<1);   // if(p>=0) p += 2*(dy-dx) else p += 2*dy
		y0 = y0 + (dir2 & -(p>=0));
		var x = x0;
		var y = y0;
		if(flag1) { var temp = x; x = y; y = temp;}
		ct.fillRect(x,y,1,1);
	}

	ct.fillRect(x1,y1,1,1);
}

