const w = 80;
const d = Math.hypot(w, w);

export default p5 => {
  p5.createCanvas(window.innerWidth, window.innerHeight);

  // const xn = Math.ceil(window.innerWidth / d); // fill
  // const yn = Math.ceil((window.innerHeight / d) * 2) + 1; // fill
  const xn = Math.floor(window.innerWidth / d); // fit
  const yn = Math.floor((window.innerHeight / d) * 2) - 1; // fit

  p5.angleMode(p5.DEGREES);
  p5.rectMode(p5.CENTER);
  p5.translate((window.innerWidth % d) / 2, (window.innerHeight % d) / 2); // fill
  p5.translate(d / 2, d / 2); // fit

  console.log(xn, window.innerWidth % d);

  const grid = Array(yn)
    .fill('')
    .map((y, yi) =>
      // Array(yi % 2 ? xn + 1 : xn) // fill
      Array(yi % 2 ? xn - 1 : xn) // fit
        .fill('')
        .map((x, xi) => ({
          // x: xi * d - (yi % 2 ? d / 2 : 0), // fill
          // y: (yi - 1) * (d / 2), // fill
          // x: xi * d + (yi % 2 ? 3000 : 0), // fit
          x: xi * d + (yi % 2 ? d / 2 : 0), // fit
          y: yi * (d / 2), // fit
        }))
    );

  grid
    .reduce((carry, row) => [...carry, ...row], [])
    .forEach(point => {
      p5.push();
      p5.translate(point.x, point.y);

      p5.push();
      p5.rotate(45);
      p5.rect(0, 0, w, w);
      p5.pop();

      p5.push();
      p5.fill(200, 0, 0);
      p5.ellipse(0, 0, 10);
      p5.pop();

      p5.pop();
    });
};
