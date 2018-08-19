class Canvas {
	constructor(id) {
		const canvas = document.getElementById(id);

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		if (canvas.getContext) {
			this.ctx = canvas.getContext('2d');
			this.ctx.canvas.width = this.width;
			this.ctx.canvas.height = this.height;
		}
	}

	background(r, g, b, a = 1) {
		this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}

export default Canvas;