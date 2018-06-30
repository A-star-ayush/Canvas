function Arm(x, y, length, angle, parent) {
	this.x = x;
	this.y = y;
	this.length = length;
	this.angle = angle;
	// this.relax = relax;
	// this.swing = swing;
	this.parent = parent;
}

Arm.prototype = {
	getTotalAngle : function() {
		var angle = this.angle;
		var parent = this.parent;
		while(parent) {
			angle += parent.angle;
			parent = parent.parent;
		}
		return (angle / 180) * Math.PI;
	},

	getEndX : function() {
		return this.x + (this.length * Math.cos(this.getTotalAngle()));
	},

	getEndY : function() {
		return this.y + (this.length * Math.sin(this.getTotalAngle()));
	},

	render : function(ctx) {
		if (this.parent) {
			this.x = this.parent.getEndX();
			this.y = this.parent.getEndY();
		}

		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.getEndX(), this.getEndY());
		ctx.stroke();
	}
};