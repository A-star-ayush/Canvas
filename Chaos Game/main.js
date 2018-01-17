window.onload = function() {
	var canvas = document.getElementById("canvas"),
		ct = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,   
		height = canvas.height = window.innerHeight;

		// parameters
		var ncp = Random(5000);   // number of control points
		var cp = [];
		for(var i=0;i<=ncp;++i) { cp[i] = {x: Random(width), y: Random(height)}; }  // the control points
		var weights = [ Math.random() ]; weights[1] = 1 - weights[0];
		var pos = {x: Random(width), y: Random(height)};  // starting position
		var iterations = 50000;

		console.log("NCP:"+ncp+" Weights: "+weights[0]+","+weights[1]+" Start position:("+pos.x+","+pos.y+")");
		
		for(var i=0;i<ncp;++i) {
			ct.fillRect(cp[i].x, cp[i].y, 5, 5);
		}

		for(var i=0;i<iterations;++i){   // filling individual pixels using ct.fillRect is not the best way but will do for now 
			ct.fillRect(pos.x, pos.y, 1, 1);
			var pos2 = cp[Random(ncp)];
			pos.x = weights[0]*pos.x + weights[1]*pos2.x;
			pos.y = weights[0]*pos.y + weights[1]*pos2.y;
		}
};

function Random(n){
	return Math.floor(Math.random()*n);
}

// sample parameters for the serpinski's equilateral traingle
		/* var ncp = 3;
		var cp = [ {x: 400, y: 400}, {x: 600, y: 100}, {x: 800, y: 400}];
		var weights = [ 0.5 ]; weights[1] = 1- weights[0];
		var pos = {x: Random(width), y: Random(height)};
		var iterations = 10000; */

// sample parameters for a square (try ranging weights[0] from 0.1 to 1.0)
		/* var ncp = 4;
		var cp = [ {x: 400, y: 400}, {x: 400, y: 800}, {x: 800, y: 400}, {x: 800, y:800}];
		var weights = [ 0.5 ]; weights[1] = 1- weights[0];
		var pos = {x: Random(width), y: Random(height)};
		var iterations = 10000;*/

// sample parameters for around the circle (lookout for the beautiful pattern at weight[0]=0.3 and ncp=10. Also increase ncp
	// from 2 onwards and see the pattern emerge ... do till ncp=20)
		/*var _x = width/2;
		var _y = height/2;
		var _r = 400;
		var ncp = 10;
		var dtheta = (2.0*Math.PI)/ncp;  // we are placing the control points equi-distant on the circumference
		var cp = [];
		for(var i=0;i<ncp;++i){ 
			cp[i] = { x: _x + _r*Math.cos(i*dtheta), y: _y + _r*Math.sin(i*dtheta) }; 
		}
		var weights = [ 0.3 ]; weights[1] = 1- weights[0];
		var pos = {x: _x, y: _y};  // starting from the centre of the circle
		var iterations = 50000;
*/

// sample parameters for sampling every 2and / 3rd/ 4th ... point in a confined space
		/*var w = 300;
		var h = 300;
		var _x = width/8;
		var _y = height/8;
		var ncp = w*h;
		var cp = [];
		var every = 3;
		for(var i=0;i<ncp;++i){
			cp[i] = { x: _x + (i*every)%w, y: _y + (i*every)/h };
		}
		var weights = [0.5]; weights[1] = 1 - weights[0];
		var pos = { x: _x, y: _y };
		var iterations = 50000;*/
		
