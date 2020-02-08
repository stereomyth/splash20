import P5 from 'p5/lib/p5.min';
import Grid from './Grid';
import Line from './Line';
import './style.css';

let grid, lines;
let p5;

const lineCount = 50;
const width = 20;
const d = Math.hypot(width, width);
const pad = d / 3;

const tw = window.innerWidth + 2 * pad;
const th = window.innerHeight + 2 * pad;
const xn = Math.floor(tw / d);
const yn = Math.floor(th / (d / 2) - 1);

const offset = () => {
  p5.translate((tw % d) / 2, ((th % (d / 2)) - 1) / 2);
  p5.translate(d / 2 - pad, d / 2 - pad);
};

new P5(P5 => {
  p5 = P5;

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);

    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
    p5.strokeCap(p5.PROJECT);

    offset();

    p5.textSize(32);
    p5.fill(255);

    grid = new Grid(width, d);
    grid.build(xn, yn);
    // grid.draw(p5);

    lines = Array(lineCount)
      .fill('')
      .map(() => new Line(grid));

    lines.forEach(line => {});
  };

  p5.draw = () => {
    offset();
    p5.stroke(255);
    p5.strokeWeight(width / 3);

    lines.forEach(line => {
      line.move();
      line.draw(p5);
    });
  };
});
