import p5 from "p5";
import { rand, constrain } from "./user_math";

class Player {
  public x: number;
  public y: number;
  private angle: number;
  private angle_dir: number;
  public dx: number;
  public dy: number;
  public arrow_x: number;
  public arrow_y: number;

  constructor() {
    this.x = 300;
    this.y = 0;
    this.angle = 90;
    this.angle_dir = 0;
    this.dx = 0;
    this.dy = 0;
    this.arrow_x = 0;
    this.arrow_y = 0;
  }

  public jump() {
    this.dx = -Math.cos(this.angle * Math.PI / 180) * 20;
    this.dy = -Math.sin(this.angle * Math.PI / 180) * 20;
  }

  private draw(p: p5) {
    this.angle += this.angle_dir;
    this.angle_dir *= 0.9;
    this.dy += 1;
    this.dx *= 0.99;
    this.y += this.dy;
    this.x = 300;
    this.arrow_x = Math.cos(this.angle * Math.PI / 180) * 40 + this.x;
    this.arrow_y = Math.sin(this.angle * Math.PI / 180) * 40 + this.y;
    p.fill(255);
    p.ellipse(this.x, this.y, 30, 30);
    p.stroke(255);
    p.line(this.x, this.y, this.arrow_x, this.arrow_y);
    p.ellipse(this.arrow_x, this.arrow_y, 10, 10);
  }

  public operate(p: p5) {
    if (p.keyIsPressed) {
      if (p.keyCode === p.LEFT_ARROW) {
        this.angle_dir += -0.1;
      } else if (p.keyCode === p.RIGHT_ARROW) {
        this.angle_dir += 0.1;
      }
    }
  }

  public update(p: p5) {
    if (this.arrow_y > 400) {
      this.jump();
    }
    this.draw(p);
  }
}

class Field {
  public stage: Block[][];

  constructor(stageSize: number) {
    this.stage = this.createStage(stageSize);
  }

  private createUpperBlocks(count: number): Block[] {
    let blocks: Block[] = [];
    let lastYIndex: number = 0;
    for (let i = 0; i < count; i++) {
      let block = new Block();
      block.x = i * 50;
      block.y = 350;

      if (i > 5) {
        let yIndex = lastYIndex + Math.floor(rand(-2, 2));
        yIndex = constrain(yIndex, 0, 6);
        block.y = block.y - yIndex * 50;
        lastYIndex = yIndex;
      }

      if (i >= count - 2) {
        block.type = 2;
      }
      blocks.push(block);
    }
    return blocks;
  }

  public createStage(stageSize: number): Block[][] {
    let upperBlocks: Block[] = this.createUpperBlocks(stageSize);
    let stage: Block[][] = [];

    upperBlocks.forEach((block, index) => {
      stage[index] = [];
      for (let y = block.y; y <= 400; y += 50) {
        let newBlock = new Block();
        newBlock.x = block.x;
        newBlock.y = y;
        newBlock.type = block.type;
        stage[index].push(newBlock);
      }
    });

    return stage;
  }

  public moveStage(cameraX: number) {
    this.stage.forEach((column) => {
      column.forEach(block => {
        block.x -= cameraX;
      });
    });

  }

  public draw(p: p5) {
    this.stage.forEach((column) => {
      column.forEach(block => {
        if (block.type === 1) {
          p.fill(255);
          p.rect(block.x, block.y, 50, 50);
        }
      });
    });
  }
}

class Block {
  public x: number;
  public y: number;
  public type: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.type = 1;
  }
}


class Camera {
  public x: number;

  constructor(x: number) {
    this.x = x;
  }
}

class Game {
  private player: Player;
  private field: Field;
  private camera: Camera;

  constructor(player: Player, field: Field, camera: Camera) {
    this.player = player;
    this.field = field;
    this.camera = camera;
  }

  public detectCollision() {
    let playerX = this.player.x;
    let playerY = this.player.y;
    let playerArrowX = this.player.arrow_x;
    let playerArrowY = this.player.arrow_y;

    this.field.stage.map((row) => {
      row.map(block => {
        if (block.type === 1) {
          if (playerX + 20 > block.x && playerX - 20 < block.x + 50
            && playerY + 30 > block.y && playerY - 30 < block.y + 50) {
            this.player.dx = -1;
          }
          if (playerArrowX + 10 > block.x && playerArrowX - 10 < block.x + 50
            && playerArrowY + 10 > block.y && playerArrowY - 10 < block.y + 50) {
            this.player.jump();
          }
        }
      });
    });
  }

  public trackCamera() {
    this.camera.x = this.player.dx;
    this.field.moveStage(this.camera.x);
  }
}


const sketch = (p: p5) => {
  let player: Player;
  let field: Field;
  let game: Game;
  let camera: Camera;

  p.setup = () => {
    p.createCanvas(600, 400);
    player = new Player();
    field = new Field(200);
    camera = new Camera(300);
    game = new Game(player, field, camera);
  };

  p.draw = () => {
    p.background(0);
    field.draw(p);
    player.operate(p);
    player.update(p);
    game.detectCollision();
    game.trackCamera();
  };
}

new p5(sketch);