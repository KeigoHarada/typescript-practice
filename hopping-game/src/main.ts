import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
};

new p5(sketch);

class Block {
  x: number;
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Player {
  x: number;
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Camera {
  x: number;
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Field {
  blocks: Block[];
  player: Player;
  camera: Camera;
  constructor() {
    this.blocks = [];
    this.player = new Player();
    this.camera = new Camera();
  }
}

class Game {
  field: Field;
  constructor() {
    this.field = new Field();
  }
}