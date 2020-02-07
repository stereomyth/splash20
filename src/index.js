import P5 from 'p5/lib/p5.min';
import Grid from './Grid';
import Line from './Line';

import './style.css';

var grid, lines;

const lineCount = 1;

new P5(p5 => {
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);

    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);

    grid = new Grid();
    grid.build();
    grid.draw(p5);

    lines = Array(lineCount)
      .fill('')
      .map(() => new Line(grid));

    lines.forEach(line => {
      line.move();
      line.move();
    });

    lines.forEach(line => {
      line.draw(p5);
    });
  };

  p5.draw = () => {
    // console.log(lines);
  };
});
