export default class Line {
  constructor(grid) {
    this.grid = grid;
    this.points = [];

    const start = grid.find();
    if (start) {
      this.points = [start];
    }
  }

  draw(p5) {
    p5.stroke(255);
    p5.strokeWeight(10);

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
