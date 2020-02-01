const w = 80;
const d = Math.hypot(w, w);

export default p5 => {
  p5.createCanvas(window.innerWidth, window.innerHeight);

  const xn = Math.ceil(window.innerWidth / d);
  const yn = Math.ceil((window.innerHeight / d) * 2);

  p5.angleMode(p5.DEGREES);
  p5.rectMode(p5.CENTER);
  p5.translate((window.innerWidth % d) / 2, (window.innerHeight % d) / 2);

  for (let yi = 0; yi < yn; yi++) {
    const odd = yi % 2;

    p5.push();
    if (odd) {
      p5.translate(d / 2, 0);
    }

    p5.push();
    for (let xi = 0; xi < (odd ? xn - 1 : xn); xi++) {
      p5.push();
      p5.rotate(45);
      p5.rect(0, 0, w, w);
      p5.pop();

      p5.push();
      p5.fill(200, 0, 0);
      p5.ellipse(0, 0, 10);
      p5.pop();

      p5.translate(d, 0);
    }

    p5.pop();
    p5.pop();
    p5.translate(0, d / 2);
  }
};
