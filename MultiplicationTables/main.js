var canvas;

window.onload = function(){
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ct = canvas.getContext("2d");
	ct.translate(canvas.width/2,canvas.height/2);  // bringing the origin to the center of the page
														// (makes generating points easy)
	draw();
}

function draw() {
	draw.table = (draw.table + 0.1) || 1;   // simulating behaviour of a static variable
	draw.Linecolor = draw.Linecolor || "#5000FF";

	var ct = canvas.getContext("2d");

	// Remember even after translating the origin of the canvas, the directions haven't changed
	// The positive y-axis is still pointing down
	
	ct.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	ct.font = "30px Arial";
	ct.fillStyle = "white";
	ct.fillText(draw.table + "", -canvas.width/2 + 10, -canvas.height/2 + 50); 

	var radius = 300;
	
	ct.strokeStyle = draw.Linecolor;

	ct.beginPath();
	ct.arc(0,0,radius,0,2*Math.PI);  // Centered at (0,0) and radius of 40; complete circle from 0 to 2pi
	ct.stroke();
	ct.stroke();
	

	if((Math.floor(draw.table*10)%40)==0) { draw.Linecolor = "#" + Math.floor(Math.random()*0xffffff).toString(16); }
	// Changing colors when draw.table becomes a multiple of 4

	var nPoints = 100;
	var points = generatePoints(nPoints, radius);

	for(var i=0;i<nPoints;++i){
		ct.beginPath();
		ct.moveTo(points[i].x, points[i].y);
		var next = points[Math.round((i*draw.table))%nPoints];
		ct.lineTo(next.x, next.y);
		ct.stroke();
	}	

	window.requestAnimationFrame(draw);
	/* The number of callbacks is usually 60 times per second, but will generally match the 
	   display refresh rate in most web browsers as per W3C recommendation*/
}

function generatePoints(n, r){  // generates n points around the circle (centered at origin)
	var arr = [];
	var sector = (2*Math.PI)/n;
	for(i=0;i<n;++i){
		var theta = i*sector;
		arr[i] = { x: r*Math.cos(theta), y: r*Math.sin(theta) };
	}

	return arr;
}
