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
      if (points.length === 1) {
        p5.line(point.x, point.y, point.x, point.y);
      } else {
        if (i) {
          p5.line(points[i - 1].x, points[i - 1].y, point.x, point.y);
        }
      }
    });
  }
}
