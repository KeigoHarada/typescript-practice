enum MinoShape {
  I,
  O,
  S,
  Z,
  J,
  L,
  T
}

class Block {
  static gridSize: number = 30;
  x: number;
  y: number;
  blockSize: number = 30;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(Block.gridSize * this.x, Block.gridSize * this.y, this.blockSize, this.blockSize);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.strokeStyle = "black"; // 枠線の色を黒に設定
    ctx.stroke(); // 枠線を描画
    ctx.closePath();
  }
}

class Mino {
  shape: MinoShape;
  x: number;
  y: number;
  rotate: number;

  constructor(shape: MinoShape, x: number, y: number, rotate: number) {
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.rotate = rotate;
  }

  private getMinoShape(shape: MinoShape): Block[] {
    switch (shape) {
      case MinoShape.I:
        return [
          new Block(0, 0),
          new Block(1, 0),
          new Block(2, 0),
          new Block(3, 0),
        ];
      case MinoShape.O:
        return [
          new Block(0, 0),
          new Block(1, 0),
          new Block(0, 1),
          new Block(1, 1),
        ];
      case MinoShape.S:
        return [
          new Block(1, 0),
          new Block(2, 0),
          new Block(0, 1),
          new Block(1, 1),
        ];
      case MinoShape.Z:
        return [
          new Block(0, 0),
          new Block(1, 0),
          new Block(1, 1),
          new Block(2, 1),
        ];
      case MinoShape.J:
        return [
          new Block(0, 0),
          new Block(0, 1),
          new Block(1, 1),
          new Block(2, 1),
        ];
      case MinoShape.L:
        return [
          new Block(2, 0),
          new Block(0, 1),
          new Block(1, 1),
          new Block(2, 1),
        ];
      case MinoShape.T:
        return [
          new Block(1, 0),
          new Block(0, 1),
          new Block(1, 1),
          new Block(2, 1),
        ];
    }
  }

  private calcBlock(): Block[] {
    let blocks = this.getMinoShape(this.shape);
    let rotatedBlock = this.rotateBlock(blocks);
    return rotatedBlock;
  }

  private rotateBlock(blocks: Block[]): Block[] {
    let rotBlocks = blocks;
    let rot = (40000000 + this.rotate) % 4;
    for (let r = 0; r < rot; r++) {
      rotBlocks = blocks.map(block => new Block(-block.y, block.x));
    }
    return rotBlocks;
  }

  public getMinoPosition(): number[][] {
    return this.calcBlock().map(block => [this.x + block.x, this.y + block.y]);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    let blocks = this.calcBlock();
    blocks.map(block => (block.x += this.x, block.y += this.y));
    blocks.forEach(block => block.draw(ctx));
  }

  public clone(): Mino {
    return new Mino(this.shape, this.x, this.y, this.rotate);
  }
}

class Field {
  private width: number = 12;
  public height: number = 22;
  private field: number[][] = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0));
  private initialTiles: number[][] = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  constructor() {
    this.field = this.initialTiles;
  }

  public resetField() {
    this.field = this.initialTiles;
  }

  public clearLine(y: number) {
    this.field.splice(y, 1);
    this.field.unshift(new Array(this.width).fill(0))
    this.field[0][0] = 1;
    this.field[0][this.width - 1] = 1;
  }

  public isFilledLine(y: number): boolean {
    return this.field[y].every(cell => cell === 1);
  }

  public addMino(mino: Mino): void {
    mino.getMinoPosition().map(([x, y]) => {
      this.field[y][x] = 1;
    });
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.isFilledAt(x, y)) {
          new Block(x, y).draw(ctx);
        }
      }
    }
  }

  public isFilledAt(x: number, y: number): boolean {
    return this.field[y][x] === 1;
  }

}

class Tetoris {
  private field: Field;
  private currentMino: Mino;
  private ctx: CanvasRenderingContext2D;
  private interval: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.field = new Field();
    this.currentMino = this.generateRandomMino();
    this.interval = 500;
  }

  public start() {
    this.field.draw(this.ctx);
    this.currentMino.draw(this.ctx);
    this.interval = setInterval(() => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      this.currentMino.y += 1;
      let mino: Mino = this.currentMino.clone();
      mino.y += 1;
      this.field.draw(this.ctx);
      this.currentMino.draw(this.ctx);
      if (this.isCollided(mino)) {
        this.field.addMino(this.currentMino);
        this.currentMino = this.generateRandomMino();
        if (this.isCollided(this.currentMino)) {
          this.stop();
          alert("Game Over");
        }
      }
      for (let y = 0; y < this.field.height - 1; y++) {
        if (this.field.isFilledLine(y)) {
          this.field.clearLine(y);
        }
      }
    }, this.interval);
  }

  private generateRandomMinoShape(): MinoShape {
    const randomNumber: number = Math.floor(Math.random() * 7); // 0 ~ 6
    return randomNumber as MinoShape;
  }

  private generateRandomMino(): Mino {
    return new Mino(this.generateRandomMinoShape(), 4, 0, 0);
  }

  public isCollided(mino: Mino): boolean {
    return mino.getMinoPosition().some(([x, y]) => this.field.isFilledAt(x, y));
  }

  public stop() {
    clearInterval(this.interval);
  }

  public moveLeft() {
    let mino: Mino = this.currentMino.clone();
    mino.x -= 1;
    if (this.isCollided(mino)) {
      return;
    }
    this.currentMino.x -= 1;
  }

  public moveRight() {
    let mino: Mino = this.currentMino.clone();
    mino.x += 1;
    if (this.isCollided(mino)) {
      return;
    }
    this.currentMino.x += 1;
  }

  public rotate() {
    let mino: Mino = this.currentMino.clone();
    mino.rotate += 1;
    if (this.isCollided(mino)) {
      return;
    }
    this.currentMino.rotate += 1;
  }
}

const canvas = document.getElementById("tetoris") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error("cannot get canvas context");
}
const tetoris = new Tetoris(ctx);
tetoris.start();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      tetoris.moveLeft();
      break;
    case "ArrowRight":
      tetoris.moveRight();
      break;
    case "ArrowUp":
      tetoris.rotate();
      break;
  }
});
