window.onload = function() {
	var canvas = document.getElementById("canvas"),
		ct = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,   
		height = canvas.height = window.innerHeight;  // so that the canvas covers the entire window
														// but do not do width = window.innerWidth = canvas.width..
	
	// ct.fillRect(0, 0, widht, height);  // to fill the canvas with solid balck color

	// Drawing random lines
	 /*for(var i=0; i<100; ++i){
		ct.beginPath();
		ct.moveTo(Math.random()*width, Math.random()*height);
		ct.lineTo(Math.random()*width, Math.random()*height);
		ct.stroke();
	}*/

	// Circle
	/* ct.beginPath();
	ct.arc(95,40,40,0,2*Math.PI);  // Center at (95,40) and radius of 40; complete circle from 0 to 2pi
	ct.stroke(); */
	
	//Text
	/*ct.font = "30px Arial"
	ct.fillText("Simple Text",10,50);  // (text,x,y)
	ct.strokeText("Stroke Text",10, 100);*/

	// Linear Gradient (can be used for strokeStyle as well)
	/*var gd = ct.createLinearGradient(0,0,200,0); // (x0,y0,x1,y1)
	gd.addColorStop(0,"red");  // the stops are marked onto the width [normalized between 0 and 1]
	gd.addColorStop(0.4,"white");
	gd.addColorStop(1,"black");
	ct.fillStyle = gd;
	ct.fillRect(10,10,150,180);*/  // Note: the range for the gradient and the rectangle

	// For circular gradient change createLinearGradient to createRadialGradient(x0,y0,r0,x1,y1,r1)
	/*var gd = ct.createRadialGradient(75,50,5,90,60,100);
	gd.addColorStop(0,"red");
	gd.addColorStop(0.5,"green");
	gd.addColorStop(1,"black");
	ct.fillStyle = gd;
	ct.fillRect(10,10,150,80);*/

	// Displaying Image
	/*var img = document.getElementById("myImage");
	ct.drawImage(img,10,10, 120, 120);  // image at 10,10 with width and height 120,120 (last 2 are optional)
	*/

	// Drawing a grid
	/*var top = [100,50];
	var bottom = [100,800];
	for(var i=0;i<99;++i){
		ct.beginPath();
		ct.moveTo(top[0],top[1]);
		ct.lineTo(bottom[0], bottom[1]);
		ct.stroke();
		top[0]+=15;
		bottom[0]+=15;
	}

	var left = [100, 50];
	var right = [1570, 50];
	for(var i=0;i<51;++i){
		ct.beginPath();
		ct.moveTo(left[0],left[1]);
		ct.lineTo(right[0], right[1]);
		ct.stroke();
		left[1]+=15;
		right[1]+=15;
	}*/
	
	// Infer in which octant (x1,y1) lies relative to (x0,y0)
	/*function getOctant(x0,y0,x1,y1){
		var x = x1 - x0;
		var y = y1 - y0;
		return [[[1, 2], [8, 7]], [[4, 3], [5, 6]]][(x < 0) ? 1:0][(y < 0) ? 1:0][(Math.abs(x) < Math.abs(y)) ? 1:0]
    }*/

    
    // filling at mouse press
    /*canvas.onmousedown = fillPressedPixel;
    function fillPressedPixel(e) {  // declaring the function here so that we can directly use the ct (context of the canvas)
    									// instead of going through e.SrcElement.getContext("2d");..
		ct.fillRect(e.offsetX,e.offsetY,1,1);
    }*/
}


/*
// By default the color in black which can be changed for different operations by setting the appropriate variable:
ct.fillStyle = 'green';  // These can be gradient as well (checkout the gradient example above)
ct.strokeStyle = 'red';

// Translate the origin of the canvas
ct.translate(width/2,height/2);  // bringing the origin to the center of the page

// Scaling	(can be used with circle to create ellipsoids etc, also with text, lines, etc)	
ct.scale(0.8, 1.5); // shrink the x values by 0.8 and extend the y values by 1.5

// To reset any transformations in place
ct.setTransform(1, 0, 0, 1, 0, 0);

// To save the current canvas state
ct.save()  // To restore from it use: ct.restore()

// ct.setLineDash([5, 3]); // To draw dashed line (- - - -) where dashes are 5px and spaces are 3px

// ct.fillStyle = "#" + Math.floor(Math.random()*0xffffff).toString(16);  // to choose a random color every time

// ct.clearRect(0, 0, window.innerWidth, window.innerHeight);  // to clear the specified region of the canvas

// ct.globalAlpha(0.5);  // Sets the level of transparency / opacity (should be followed by a fillStyle or beginPath, etc)
*/
