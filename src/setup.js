import Grid from './Grid';
import Line from './Line';

export default p5 => {
  p5.createCanvas(window.innerWidth, window.innerHeight);

  p5.angleMode(p5.DEGREES);
  p5.rectMode(p5.CENTER);

  const grid = new Grid();

  grid.build();
  grid.draw(p5);

  const lines = Array(5)
    .fill('')
    .map(() => new Line(grid));

  lines.forEach(line => {
    line.draw(p5);
  });

  console.log(lines);
};
