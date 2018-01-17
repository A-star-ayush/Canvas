window.onload = function() {
	var canvas = document.getElementById("canvas");
	var ct = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	draw.angle = -45;  // should preceede the function call
	draw(canvas.width/2-75, 3*canvas.height/4, 150.0, 0.0, 0);   // (x, y, size, initial angle, level)

	function draw(x, y, size, angle, level) {
		if(level==5) return;
		ct.translate(x, y);
		ct.rotate((angle*Math.PI)/180.0);
		ct.fillRect(0, 0, size, size);
		draw(-size/2,-size/2, 0.5*Math.sqrt(2)*size, draw.angle, level+1);
		draw(size/2, -size/2, 0.5*Math.sqrt(2)*size, draw.angle, level+1);
	}	
};