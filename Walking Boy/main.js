window.onload = function() {
	let canvas = document.getElementById("canvas1"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	let arm1 = new Arm(width / 2, height /2, 100, 0, null);
	let arm2 = new Arm(0, 0, 100, 0, arm1);

	function renderAll() {
		ctx.clearRect(0, 0, width, height);
		arm1.render(ctx);
		arm2.render(ctx);
		arm1.angle += 1;
		arm2.angle += 1;
		requestAnimationFrame(renderAll);
	}

	renderAll();
}