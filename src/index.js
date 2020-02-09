import P5 from 'p5/lib/p5.min';
import Grid from './Grid';
import Line from './Line';
import './style.css';

let grid, lines;
let p5;

const lineCount = 0;
const width = 20;
const d = Math.hypot(width, width);
const pad = d / 5;

const tw = window.innerWidth + 2 * pad;
const th = window.innerHeight + 2 * pad;
const xn = Math.floor(tw / d);
const yn = Math.floor(th / (d / 2) - 1);

const light = window.matchMedia('(prefers-color-scheme: light)').matches;
const theme = light ? { bg: 255, line: 200 } : { bg: 20, line: 50 };

const offset = () => {
  p5.translate((tw % d) / 2, ((th % (d / 2)) - 1) / 2);
  p5.translate(d / 2 - pad, d / 2 - pad);
};

new P5(P5 => {
  p5 = P5;

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(theme.bg);

    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
    p5.strokeCap(p5.PROJECT);

    offset();

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
    p5.stroke(theme.line);
    p5.strokeWeight(width / 3);

    if (grid.emptyCells.length) {
      lines.push(new Line(grid));
    }

    lines.forEach(line => {
      line.draw(p5);
      line.move();
    });
  };
});
