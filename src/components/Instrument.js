import Tone from 'tone';

class Instrument {
	constructor({ note, x, y, width, height, color, canvas, chain }) {
		this.note = note;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = { ...color, a: 0.99 };
		this.canvas = canvas;
		this.chain = chain;
		this.fadeDirection = -1;

		this.fade = true;

		this.synth = new Tone.MonoSynth({
			frequency: 'C4',
			volume: -30,
			oscillator: {
				type: 'sine',
			},
			envelope: {
				attack: 1,
				decay: 1,
				sustain: 0.9,
				release: 1,
			},
			filterEnvelope: {
				attack: 0.06,
				decay: 0.2,
				sustain: 0.5,
				release: 2,
				baseFrequency: 200,
				octaves: 7,
				exponent: 1.2,
			},
		}).chain(this.chain);

		this.queueNoteForRandomTime();
	}

	playNote(length) {
		this.synth.triggerAttackRelease(this.note, length);
	}

	queueNoteForRandomTime() {
		this.timeout = setTimeout(() => {
			const randomNoteLength = Math.floor(Math.random() * 2.5 + 1);

			this.playNote(randomNoteLength);
			this.setFullAlpha(randomNoteLength);
			this.queueNoteForRandomTime();
		}, Math.random() * 30000);
	}

	setFullAlpha(length) {
		setTimeout(() => {
			this.fade = true;
		}, length * 1000);

		this.color.a = 1;
		this.fade = false;
	}

	drawLine() {
		const { r, g, b, a } = this.color;

		this.canvas.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		this.canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	step() {
		if (this.color.a > 0) {
			if (this.fade) {
				this.color.a = this.color.a - 0.01;
			} else {
				if (this.color.a >= 1 || this.color.a <= 0.85) {
					this.fadeDirection = 0 - this.fadeDirection;
				}
				this.color.a = this.color.a - this.fadeDirection * 0.005;
			}
			this.drawLine();
		}
	}

	pause() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		} else {
			this.queueNoteForRandomTime();
		}
	}
}

export default Instrument;
