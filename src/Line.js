export default class Line {
  constructor(grid) {
    this.grid = grid;
    this.points = [];

    const start = grid.find();
    if (start) {
      this.points = [start];
    }
  }

  move() {
    const point = this.grid.nearby(this.points[this.points.length - 1]);
    if (point) {
      this.points.push(point);
    } else {
      console.log('stuck');
      this.stuck = true;
    }
  }

  draw(p5) {
    p5.stroke(p5.color(0, 255, 0));
    p5.strokeWeight(this.grid.w / 3);

    this.points.forEach((point, i, points) => {
      if ((points.length > 1 && i > 0) || points.length === 1) {
        const point0 = points[i - 1] || point;
        p5.line(point0.x, point0.y, point.x, point.y);
      }
    });
  }
}
