const rand = max => Math.floor(Math.random() * max);

export default class Grid {
  constructor(w, d) {
    this.state = [];
    this.w = w;
    this.d = d;
  }

  build(xn, yn) {
    this.xn = xn;
    this.yn = yn;

    this.state = Array(yn)
      .fill('')
      .map((y, yi) =>
        Array(yi % 2 ? xn - 1 : xn)
          .fill('')
          .map((x, xi) => ({
            x: xi * this.d + (yi % 2 ? this.d / 2 : 0),
            y: yi * (this.d / 2),
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
    const cells = this.emptyCells;

    if (cells.length) {
      const cell = cells[rand(cells.length)];
      // const cell = this.state[0][0];
      cell.busy = true;
      return cell;
    }
  }

  nearby({ yi, xi }) {
    let ways = [];
    const dir = yi % 2 ? { e: 1, w: 0 } : { e: 0, w: -1 };

    // console.log(xi, xi + dir.e);
    // console.log(this.xn);

    const minY = yi > 0;
    const maxY = yi < this.yn - 1;
    const minX = yi % 2 ? -1 : 0;
    const maxX = this.xn - 1;

    if (minY && xi < maxX) {
      // console.log('can NE');
      const cell = this.state[yi - 1][xi + dir.e];
      if (!cell.busy) {
        ways.push(cell); // NE y-1 x+1
      }
    }
    if (maxY && xi < maxX) {
      // console.log('can SE');
      const cell = this.state[yi + 1][xi + dir.e];
      if (!cell.busy) {
        ways.push(cell); // SE y+1 x+1
      }
    }
    if (maxY && xi > minX) {
      // odd >0 even >-1
      // console.log('can SW');
      const cell = this.state[yi + 1][xi + dir.w];
      if (!cell.busy) {
        ways.push(cell); // SW y+1
      }
    }
    if (minY && xi > minX) {
      // console.log('can NW');
      const cell = this.state[yi - 1][xi + dir.w];
      if (!cell.busy) {
        ways.push(cell); // NW y-1
      }
    }
    // console.log('---');

    if (ways.length) {
      const choice = rand(ways.length);
      ways[choice].busy = true;
      return ways[choice];
    }
  }

  leave(point) {
    point.busy = false;
  }

  draw(p5) {
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
      p5.ellipse(0, 0, this.w / 3);
      p5.pop();

      p5.pop();
    });

    p5.pop();
  }
}
