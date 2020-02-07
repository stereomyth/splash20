const w = 200;
const d = Math.hypot(w, w);

const rand = max => Math.floor(Math.random() * max);

export default class Grid {
  constructor() {
    this.state = [];
  }

  build() {
    // const xn = Math.ceil(window.innerWidth / d); // fill
    // const yn = Math.ceil((window.innerHeight / d) * 2) + 1; // fill
    const xn = (this.xn = Math.floor(window.innerWidth / d)); // fit
    const yn = (this.yn = Math.floor((window.innerHeight / d) * 2) - 2); // fit

    this.state = Array(yn)
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
            xi,
            yi,
          }))
      );
  }

  get flat() {
    return this.state.reduce((carry, row) => [...carry, ...row], []);
  }

  get emptyCells() {
    return this.flat.filter(cell => !cell.busy);
  }

  // function getRandom() {
  //   return Math.random();
  // }

  find() {
    const cells = this.emptyCells;
    console.log(cells.length);

    if (cells.length) {
      const cell = cells[rand(cells.length)];
      cell.busy = true;
      return cell;
    }
  }

  // emptyCheck({ x, y }) {
  //   return !this.state[y][x].busy;
  // }

  draw(p5) {
    p5.translate((window.innerWidth % d) / 2, (window.innerHeight % d) / 2); // fill
    p5.translate(d / 2, d / 2); // fit

    p5.push();

    this.flat.forEach(point => {
      p5.push();
      p5.translate(point.x, point.y);

      // p5.push();
      // p5.rotate(45);
      // p5.rect(0, 0, w, w);
      // p5.pop();

      p5.push();
      p5.fill(200, 0, 0);
      p5.ellipse(0, 0, 10);
      p5.pop();

      p5.pop();
    });

    p5.pop();
  }
}
