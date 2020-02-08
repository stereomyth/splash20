const off = 0;

export default class Line {
  constructor(grid) {
    this.grid = grid;
    this.points = [];

    const start = grid.find();
    if (start) {
      this.points = [start];
    } else {
      this.stuck = true;
    }
  }

  move() {
    if (!this.stuck) {
      const point = this.grid.nearby(this.points[this.points.length - 1]);
      if (point) {
        this.points.push(point);
      } else {
        this.stuck = true;
      }
    }
  }

  draw(p5) {
    if (this.points.length) {
      const point1 = this.points[this.points.length - 1];
      const point0 = this.points[this.points.length - 2] || {
        x: point1.x + off,
        y: point1.y + off,
      };
      p5.line(point0.x, point0.y, point1.x, point1.y);
    }
  }
}
