import Tone from 'tone';
import Canvas from './Canvas';
import Instrument from './Instrument';

const App = {
    canvas: new Canvas('app'),

    lineWidth: 10,

    notes: [
        {
            note: 'F3',
            color: { r: 224, g: 46, b: 85 },
        },
        {
            note: 'G#3',
            color: { r: 244, g: 78, b: 63 },
        },
        {
            note: 'C4',
            color: { r: 247, g: 240, b: 82 },
        },
        {
            note: 'C#4',
            color: { r: 6, g: 214, b: 160 },
        },
        {
            note: 'D#4',
            color: { r: 28, g: 202, b: 216 },
        },
        {
            note: 'F4',
            color: { r: 181, g: 97, b: 161 },
        },
        {
            note: 'G#4',
            color: { r: 181, g: 97, b: 135 },
        },
    ],

    reverb: new Tone.Freeverb({
        roomSize: 0.98,
        dampening: 10000,
    }).toMaster(),

    draw() {
        this.canvas.background(22, 25, 37);
        this.instruments.forEach(instrument => instrument.step());
        window.requestAnimationFrame(this.draw.bind(this));
    },

    init() {
        const spacing = this.canvas.width / this.notes.length;
        
        this.instruments = this.notes.map((note, index) => {
            const { r, g, b } = note.color;

            return new Instrument({
                note: note.note,
                x: spacing * index + spacing / 2 - this.lineWidth / 2,
                y: 0,
                width: this.lineWidth,
                height: this.canvas.height,
                color: { r, g, b },
                canvas: this.canvas,
                chain: this.reverb,
            });
        });

        window.requestAnimationFrame(this.draw.bind(this));
    },
};

export default App;
