const rand = max => Math.floor(Math.random() * max);

export default class Grid {
  constructor() {
    this.state = [];
    this.w = 200;
    this.d = Math.hypot(this.w, this.w);
  }

  build() {
    // const xn = Math.ceil(window.innerWidth / d); // fill
    // const yn = Math.ceil((window.innerHeight / d) * 2) + 1; // fill
    const xn = (this.xn = Math.floor(window.innerWidth / this.d)); // fit
    const yn = (this.yn = Math.floor((window.innerHeight / this.d) * 2) - 2); // fit

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
            x: xi * this.d + (yi % 2 ? this.d / 2 : 0), // fit
            y: yi * (this.d / 2), // fit
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

  find() {
    return this.state[3][1];
    // const cells = this.emptyCells;

    // if (cells.length) {
    //   const cell = cells[rand(cells.length)];
    //   cell.busy = true;
    //   return cell;
    // }
  }

  nearby({ yi, xi }) {
    // console.log();
    // console.log(this.state[yi][xi - 1]);

    let ways = [];
    // if (yi - 1 >= 0 && yi - 1 < this.yn) {
    //   ways.push(this.state[yi - 1][xi]);
    // }

    if (yi % 2) {
      ways.push(this.state[yi - 1][xi + 1]); // NE y-1 x+1
      ways.push(this.state[yi + 1][xi + 1]); // SE y+1 x+1
      ways.push(this.state[yi + 1][xi]); // SW y+1
      ways.push(this.state[yi - 1][xi]); // NW y-1
    } else {
      ways.push(this.state[yi - 1][xi]); // NE y-1
      ways.push(this.state[yi + 1][xi]); // SE y+1
      ways.push(this.state[yi + 1][xi - 1]); // SW y+1 x-1
      ways.push(this.state[yi - 1][xi - 1]); // NW y-1 x-1
    }

    return ways.length ? ways[rand(ways.length)] : null;
  }

  draw(p5) {
    p5.translate((window.innerWidth % this.d) / 2, (window.innerHeight % this.d) / 2); // fill
    p5.translate(this.d / 2, this.d / 2); // fit

    p5.push();

    this.flat.forEach(point => {
      p5.push();
      p5.translate(point.x, point.y);

      p5.push();
      p5.rotate(45);
      p5.fill(60);
      p5.rect(0, 0, this.w, this.w);
      p5.pop();

      p5.push();
      p5.fill(0);
      p5.ellipse(0, 0, 10);
      p5.pop();

      p5.pop();
    });

    p5.pop();
  }
}
