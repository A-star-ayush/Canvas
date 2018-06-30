/* To do : wrap everything in an anonymous function to avoid namespace issues OR use modules */
/* Will have to generate the output code in normalized coordinates since the canvas size might not be the same as this one*/
/* Selection tool */
/* Markers and scales to help draw perfect drawings (include anagle and distance indicators) */

"use strict";

var objects = [];
var canvas;
var ct;
var opt1 = false, opt2 = false, opt3 = false;
var tooltips = [];

window.onload = function() {
	/* Set the size for the canvas (necessary step) */
	canvas = document.getElementById("canvas");
	ct = canvas.getContext("2d");
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	tooltips[0] = document.getElementById("toolTip1");
	tooltips[1] = document.getElementById("toolTip2");

	setToolBoxFrame();
	assignToolActions();
	registerKeys();

	canvas.addEventListener("mousemove", function(e) {
		tooltips[0].innerHTML = parseInt(e.offsetX) + " , " + parseInt(e.offsetY);
	}, false);
};

function setToolBoxFrame() {
	let frames = document.getElementsByClassName("toolFrame");
	let toolbox = document.getElementById("toolbox");
	
	frames[0].onmousedown = function() {
		document.onmousemove = function(e) {
			let x = e.pageX;
			let y = e.pageY;
			toolbox.style.top = y+"px";
			toolbox.style.left = x+"px";
	}; };

	frames[0].onmouseup = function() {
		document.onmousemove = null;
	};

	frames[1].onclick = function() {
		let input = prompt("Enter a color, alpha: ");
		if (input != null) {
			input = input.split(",");
			let opacity = input.length > 1 ? (parseFloat(input[1]) != NaN ? parseFloat(input[1]) : 1.0) : 1.0;
			ct.globalAlpha = opacity;
			frames[1].style.opacity = opacity;
			ct.fillStyle = ct.strokeStyle = input[0];
			frames[1].style.backgroundColor = input[0];
	} };
}

function assignToolActions() {
	let prevSelected = null;

	let line = document.getElementById("line");
	let rectangle = document.getElementById("rectangle");
	let circle = document.getElementById("circle");
	let curve = document.getElementById("curve");
	let objectTool = document.getElementById("objectTool");
	let marker = document.getElementById("marker");

	line.onclick = rectangle.onclick = circle.onclick = curve.onclick = marker.onclick = function(e) {
		e.target.style.opacity = 0.3;
		if (prevSelected != null && prevSelected != e.target)
			prevSelected.style.opacity = 1.0;
		prevSelected = e.target;
	};

	// additional handlers for the same event are set using addEventListener
	line.addEventListener('click', defineLine, false);
	rectangle.addEventListener('click', defineRectangle, false);
	circle.addEventListener('click', defineCircle, false);
	curve.addEventListener('click', defineCurve, false);
	marker.addEventListener('click', defineMarkers, false);
	
	objectTool.onclick = function() {
		if (objectTool.style.opacity == 0.3) {
			objectTool.style.opacity = 1.0;
			let objectBar = document.getElementById("objectBar");
			objectBar.style.display = "none";
			while (objectBar.firstChild) {
    			objectBar.removeChild(objectBar.firstChild);
		} }
		else {
			objectTool.style.opacity = 0.3;
			if (objects.length > 0) {
				let obectBar = document.getElementById("objectBar");
				objectBar.style.display = "block";
				for (let i = 0; i < objects.length; ++i) {
					let object = document.createElement("button");
					object.id = "object" + i;
					object.className += " object";
					object.innerHTML = "object" + i+"<br>"+objects[i].type+": "+objects[i].color+","+objects[i].opacity+"<br>";
					for (let j = 0; j < objects[i].points.length; ++j)
						object.innerHTML += parseInt(objects[i].points[j]) + " ";
					objectBar.appendChild(object);
	} } } };
}

function registerKeys() {
	document.onkeydown = function(e) {
		let option = null;
		switch(e.keyCode) {
			case 90: 
				if (objects.length > 0)
					objects.pop();
				redraw();
				break;
			case 65: 
				opt1 = !opt1;
				option = "option1";
				break;
			case 83: 
				opt2 = !opt2;
				option = "option2";
				break;
			case 68:
				opt3 = !opt3;
				option = "option3";
		}

		if (option != null) {
			let ele = document.getElementById(option);
			if (ele.style.backgroundColor == "red")
				ele.style.backgroundColor = "white";
			else
				ele.style.backgroundColor = "red";

	} };
}

function defineLine() {
	let x_start, y_start, x_end, y_end;
	
	canvas.onmousedown = function(e) {
		x_start = e.offsetX; y_start = e.offsetY;
		canvas.onmousemove = function(e) {
			redraw();
			ct.beginPath();
			ct.moveTo(x_start, y_start);
			if (opt1 == true) {  // Horizontal Line
				ct.lineTo(e.offsetX, y_start);
				x_end = e.offsetX;
				y_end = y_start;
			}
			else if (opt2 == true) {  // Vertical Line
				ct.lineTo(x_start, e.offsetY);
				x_end = x_start;
				y_end = e.offsetY;
			}
			else {  // Arbitary Line
				ct.lineTo(e.offsetX, e.offsetY);
				x_end = e.offsetX;
				y_end = e.offsetY;
			}
			ct.stroke();
			tooltips[1].innerHTML = ((Math.atan2(y_end - y_start, x_end - x_start) / Math.PI) * 180).toFixed(2) 
				+ " , " + Math.sqrt(Math.pow(x_start - x_end, 2) + Math.pow(y_start - y_end, 2)).toFixed(2);	
	 }; };

	canvas.onmouseup = function() {
		objects.push({ type:"line", points: [x_start, y_start, x_end, y_end], color: ct.strokeStyle, 
			opacity: ct.globalAlpha });
		canvas.onmousemove = null;
	};
}

function defineRectangle() {
	let x1, y1, width, height;

	canvas.onmousedown = function(e) {
		let x_start, y_start;
		x_start = e.offsetX; y_start = e.offsetY;
		canvas.onmousemove = function(e) {
			redraw();
			if (opt1 == true) { // Fill Rectangle
				if (opt3 == true) {  // Aspect Ratio
					let dx = e.offsetX - x_start;
					let dy = e.offsetY - y_start;
					let max = Math.abs(dx) > Math.abs(dy) ? dx : dy;
					ct.fillRect(x_start, y_start, max, max);
					width = max;
					height = max;
				}
				else {
					ct.fillRect(x_start, y_start, e.offsetX - x_start, e.offsetY - y_start);
					width = e.offsetX - x_start;
					height = e.offsetY - y_start;
				}
				x1 = x_start;
				y1 = y_start;
			}
			else if (opt2 == true) {  // Stretch from Center
				let dx = Math.abs(x_start - e.offsetX);
				let dy = Math.abs(y_start - e.offsetY);
				if (opt3 == true) {
					let max = dx > dy ? dx : dy;
					ct.strokeRect(x_start - dx, y_start - dy, 2*max, 2*max);
					width = 2*max;
					height = 2*max;
				}
				else {
					ct.strokeRect(x_start - dx, y_start - dy, 2*dx, 2*dy);
					width = 2*dx;
					height = 2*dy;
				}
				x1 = x_start - dx;
				y1 = y_start - dy;
			}
			else {  // Stroke Rectangle
				if (opt3 == true) {
					let dx = e.offsetX - x_start;
					let dy = e.offsetY - y_start;
					let max = Math.abs(dx) > Math.abs(dy) ? dx : dy;
					ct.strokeRect(x_start, y_start, max, max);
					width = max;
					height = max;
				}
				else {
					ct.strokeRect(x_start, y_start, e.offsetX - x_start, e.offsetY - y_start);
					width = e.offsetX - x_start;
					height = e.offsetY - y_start;
				}
				x1 = x_start;
				y1 = y_start;
				tooltips[1].innerHTML = width + " , " + height;
			
	} }; };

	canvas.onmouseup = function() {
		objects.push({ type:"rectangle", points: [x1, y1, width, height], color : ct.fillStyle, 
			opacity: ct.globalAlpha, fill: opt1 });
		canvas.onmousemove = null;
	};
}

function defineCircle() {
	let start_x, start_y, radius;

	canvas.onmousedown = function(e) {
		let center_x, center_y;
		center_x = e.offsetX; center_y = e.offsetY;
		canvas.onmousemove = function(e) {
			redraw();
			let x, y;
			x = e.offsetX; y = e.offsetY;
			radius = Math.sqrt(Math.pow(x - center_x, 2) + Math.pow(y - center_y, 2));
			ct.beginPath();
			if (opt2 == false) {
				ct.arc(x, y, radius, 0, 2*Math.PI);
				start_x = x;
				start_y = y;
			}
			else {
				ct.arc(center_x, center_y, radius, 0, 2*Math.PI);
				start_x = center_x;
				start_y = center_y;
			}
			if (opt1 == true)
				ct.fill();
			else
				ct.stroke();
			tooltips[1].innerHTML = radius.toFixed(2);
	};};
		
	canvas.onmouseup = function() {
		objects.push({ type: "circle", points: [start_x, start_y, radius], color: ct.fillStyle, 
			opacity: ct.globalAlpha, fill: opt1 });
		canvas.onmousemove = null;
	};
}

function defineCurve() {
}

function defineMarkers() {
	canvas.onmousedown = function(e) {
		
	}
}

function redraw() {
	ct.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < objects.length; ++i) {
		let color_backup = ct.fillStyle;
		let opacity_backup = ct.globalAlpha;
		ct.fillStyle = ct.strokeStyle = objects[i].color;
		ct.globalAlpha = objects[i].opacity;
		if (objects[i].type == "line") {
			ct.beginPath();
			ct.moveTo(objects[i].points[0], objects[i].points[1]);
			ct.lineTo(objects[i].points[2], objects[i].points[3]);
			ct.stroke();
		} else if (objects[i].type == "rectangle") {
			if (objects[i].fill == false)
				ct.strokeRect(objects[i].points[0], objects[i].points[1], objects[i].points[2], objects[i].points[3]);
			else 
				ct.fillRect(objects[i].points[0], objects[i].points[1], objects[i].points[2], objects[i].points[3]);
		} else if (objects[i].type == "circle") {
			ct.beginPath();
			ct.arc(objects[i].points[0], objects[i].points[1], objects[i].points[2], 0, 2*Math.PI);
			if (objects[i].fill == false)
				ct.stroke();
			else
				ct.fill();
		}
		ct.fillStyle = ct.strokeStyle = color_backup; 
		ct.globalAlpha = opacity_backup;
	}
}