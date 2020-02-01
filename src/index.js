import P5 from 'p5/lib/p5.min';
import setup from './setup';
import draw from './draw';
import './style.css';

new P5(p5 => {
  p5.setup = () => setup(p5);
  p5.draw = () => draw(p5);
});
