import p5 from "p5";

class Player {
  private x: number;
  private y: number;
  private angle: number;
  private angle_dir: number;
  private dx: number;
  private dy: number;
  private arraw_x: number;
  private arrow_y: number;
  private p: p5;

  constructor(p: p5) {
    this.x = 300;
    this.y = 0;
    this.angle = 90;
    this.angle_dir = 0;
    this.dx = 0;
    this.dy = 0;
    this.arraw_x = 0;
    this.arrow_y = 0;
    this.p = p;
  }

  private draw() {
    this.angle += this.angle_dir;
    this.angle_dir *= 0.5;
    this.dy += 1;
    this.dx *= 0.99;
    this.y += this.dy;
    this.x += this.dx;
    this.arraw_x = Math.cos(this.angle * Math.PI / 180) * 40 + this.x;
    this.arrow_y = Math.sin(this.angle * Math.PI / 180) * 40 + this.y;
    this.p.fill(255);
    this.p.ellipse(this.x, this.y, 30, 30);
    this.p.stroke(255);
    this.p.line(this.x, this.y, this.arraw_x, this.arrow_y);
    this.p.ellipse(this.arraw_x, this.arrow_y, 10, 10);
  }

  private jump() {
    this.dx = -Math.cos(this.angle * Math.PI / 180) * 20;
    this.dy = -Math.sin(this.angle * Math.PI / 180) * 20;
  }

  public update() {
    this.keyPressed();
    if (this.arrow_y > 400) {
      this.jump();
    }
    this.draw();
  }

  public keyPressed() {
    if (this.p.keyCode === this.p.LEFT_ARROW) {
      this.angle_dir += -0.1;
    } else if (this.p.keyCode === this.p.RIGHT_ARROW) {
      this.angle_dir += 0.1;
    }
  }
}

const sketch = (p: p5) => {
  let player: Player = new Player(p);
  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(0);
    player.update();
  };
}

let p = new p5(sketch);