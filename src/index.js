import * as P5 from 'p5';
import './style.css';

new P5(p5 => {
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.background(40);
  };

  p5.draw = () => {};
});
